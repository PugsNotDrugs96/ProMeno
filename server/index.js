import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import {
  fetchCategories,
  fetchPost,
  fetchPostsByCategory,
  fetchCategoryIdBySlug,
} from "./api/wp-api.js";
import * as usersFilters from "./db/filtersUsersDB.js";
import cors from "cors";
import bodyParser from "body-parser";
import {usersDB, UserModel} from "./db/usersDB.js";
import jwt from "jsonwebtoken";
import NodeCache from "node-cache";
//import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

//cors options is to allow our client to make requests
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ exteded: false }));

//Database URI key
const uri = process.env.DATABASE_URI;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
//connection to DB
mongoose
  .connect(uri, connectionParams)
  .then(() => {
    console.log("Successful connection to the database");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

const JWT_SECRET = process.env.JWT_SECRET;

//"Time to live" --> How long we should save cache
const TTL = 3600;

const cache = new NodeCache({ stdTTL: TTL, checkperiod: TTL });

app.post("/auth", async function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const isValidLogin = usersDB.validateLogin(email, password);

  if (!isValidLogin) {
    return res.status(401).json("Not a valid login");
  }
  res.status(200).json({ success: `User ${email} is logged in` });
});

app.post("/register", async function (req, res) {
  const {name, email, password } = req.body;
  if (!name || !email || !password) {
    console.log("1");
    return res
      .status(400)
      .send({ message: "name, email and password are required" });
  }

 await usersFilters.registerUserDB(name, email, password).then(result =>{
  if (result === "500"){
    res.status(500).send("Unable to register user to database");
  }else if (result === "406"){
    res.status(406).send("Email already registered");
  } else {
    res.status(200).send("User registered");
  }
 }).catch(err => {
  console.log(err);
  res.status(406).send({statusCode: err});
 });
});

app.get("/get-all-users-db", async function(req, res){
    const data = await usersFilters.getAllUsersDB();
    if(data === "error"){
      res.status(500).send("Database error");
    } else if(data === "Email already exist") {
      res.status(406).send("Email already registered")
    } else {
      res.send(data);
    }

});

app.get("/get-user-by-email-db", async function(req, res){
  const {email} = req.body;
  const user = await usersFilters.getUserDB(email);

    if(user === "Email does not exist"){
      res.status(406).send("Email does not exist")
    } else {
      res.status(200).send(user);
    }
});

app.post("/update-email-db", async function (req, res){
  const {oldEmail, newEmail} = req.body;
  console.log("test");
  const status = await usersFilters.updateEmailDB(oldEmail, newEmail);

  if(status === "Email does not exist"){
    res.status(406).send("Email does not exist");
  } else {
    res.status(200).send(status);
  }
});

app.post("/update-password-db", async function (req, res){
  const {email, password} = req.body;
  const status = await usersFilters.updatePasswordDB(email, password);

  if(status === "Email does not exist"){
    res.status(406).send("Email does not exist");
  } else {
    res.status(200).send(status);
  }
});

app.delete("/delete-user-db", async function (req, res){
  const {email} = req.body;
  const status = await usersFilters.deleteUserDB(email);

  if(status === "400"){
    res.status(406).send("Email does not exist");
  } else {
    res.status(200).send(status);
  }
});


app.post("/change-password", async function (req, res) {
  const { email, currentPassword, newPassword } = req.body;
  if (!email || !currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Email and passwords are required" });
  }

  const isValidLogin = usersDB.validateLogin(email, currentPassword);
  if (!isValidLogin) {
    return res.status(403).json("Not a valid login");
  }
  const isPasswordChanged = usersDB.changePassword(email, newPassword);
  if (isPasswordChanged) {
    res
      .status(200)
      .json({ success: `Password for user ${email} has changed!` });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/posts-by-category/:slug", async function (req, res) {
  const slug = req.params.slug;

  let id = cache.get(`category-id${slug}`);
  if (!id) {
    id = await fetchCategoryIdBySlug(slug);
    cache.set(`category-id-${slug}`, id);
  }

  let posts = cache.get(`posts-by-category${id}`);
  if (posts) return res.status(201).json(posts);

  posts = await fetchPostsByCategory(id);
  cache.set(`posts-by-category${id}`, posts);
  res.status(201).json(posts);
});

app.get("/posts/:slug", async function (req, res) {
  const slug = req.params.slug;
  let post = cache.get(`posts-${slug}`);
  if (post) return res.status(201).json(post[0]);

  post = await fetchPost(slug);
  cache.set(`posts-${slug}`, post);
  res.status(200).json(post[0]);
});

app.get("/categories", async function (_, res) {
  let categories = cache.get("categories");
  if (categories) return res.status(201).json(categories);

  categories = await fetchCategories();
  cache.set("categories", categories);
  res.status(201).json(categories);
});

app.post("/reset-password-link", async function (req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const userExists = usersDB.findUser(email);

  if (!userExists) {
    return res.status(401).json({ message: "User doesn't exist" });
  }
  const secret = JWT_SECRET + usersDB.getPassword(email);

  const token = jwt.sign({ email: email }, secret, { expiresIn: "15m" });
  const link = `http://localhost:3000/reset-password/${email}/${token}`;

  console.log(link);

  /* 
  NOTE: For sending email, use code below when our website is hosted by One.com 

  // create reusable transporter object using the default SMTP transport
  let info;
  try {
    let transporter = nodemailer.createTransport({
      host: "mailout.one.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "info@promeno.se",
        pass: "lösenord****",
      },
    });
    console.log({ transporter });

    // send mail with defined transport object
    info = await transporter.sendMail({
      from: "info@promeno.se", // sender address
      to: { email }, // list of receivers
      subject: "Återställningslänk från Promeno", // Subject line
      text: { link },
    });
  } catch (error) {
    console.log({ error });
  }

  console.log({ info }); */

  res
    .status(201)
    .json({ success: `Password reset link has been sent to email` });
});

app.post("/validate-link", async function (req, res) {
  const { email, token } = req.body;
  if (!email | !token) {
    return res.status(401).json({ message: "Invalid link" });
  }
  const userExists = usersDB.findUser(email);

  if (!userExists) {
    return res.status(401).json({ message: "Invalid link" });
  }
  const secret = JWT_SECRET + usersDB.getPassword(email);
  try {
    const verify = jwt.verify(token, secret);
    res.status(200).json({ success: `Link is valid` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/reset-password", async function (req, res) {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const userExists = usersDB.findUser(email);

  if (!userExists) {
    return res.status(401).json({ message: "User doesn't exist" });
  }

  const isPasswordChanged = usersDB.changePassword(email, newPassword);

  if (isPasswordChanged) {
    res
      .status(200)
      .json({ success: `Password for user ${email} has changed!` });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/delete-account", async function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const isValidLogin = usersDB.validateLogin(email, password);

  if (!isValidLogin) {
    return res.status(400).json({ message: "Not valid email or password" });
  }

  if (usersDB.deleteUser(email)) {
    return res
      .status(200)
      .json({ success: `Account for user ${email} is deleted!` });
  } else {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

app.listen(PORT, function () {
  console.log("Server is now running on port " + PORT);
});
