import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import {
  fetchThemes,
  fetchCategories,
  fetchPostById,
  fetchPostsByCategory,
} from "./api/wp-api.js";
import cors from "cors";
import bodyParser from "body-parser";
import {usersDB, UserModel} from "./db/usersDB.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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

app.post("/auth", async function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const isValidLogin = usersDB.validateLogin(email, password);

  if (!isValidLogin) {
    return res.sendStatus(400);
  }
  res.json({ success: `User ${email} is logged in` });
});

app.post("/register", async function (req, res) {
  const {name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .sendStatus(400)
      .json({ message: "name, email and password are required" });
  }

  var userModel = new UserModel();
  userModel.name = name;
  userModel.email = email;
  userModel.password = password;
  userModel.isSelected = false;
  userModel.isAdmin = false;

  userModel.save((err) => {
    if (err) {
      return res.json({ message: "Unable to register" });;
    }
    else {
      console.log("Successfully added user to DB");
      return res.sendStatus(200);
    }
  });
});

app.get("/get-all-users-db", async function(req, res){
  UserModel.find((err, data) =>{
    if (err){
      res.sendStatus(500).send(err);
    } else {
      res.sendStatus(200).send(data);
    }
  })
});

app.get("get-user-by-email-db", async function(req, res){
  UserModel.findOne({email: req.email}, (err, data) =>{
    if (err){
      res.sendStatus(500).send(err);
    } else {
      res.sendStatus(200).send(data);
    }
  })
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
    return res.sendStatus(400);
  }
  const isPasswordChanged = usersDB.changePassword(email, newPassword);
  if (isPasswordChanged) {
    res
      .status(200)
      .json({ success: `Password for user ${email} has changed!` });
  } else {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

app.get("/posts-by-category/:id", async function (req, res) {
  const id = req.params.id;
  const posts = await fetchPostsByCategory(id);
  res.status(201).json(posts);
});

app.get("/posts/:id", async function (req, res) {
  const id = req.params.id;
  const post = await fetchPostById(id);
  res.status(201).json(post);
});

app.get("/themes", async function (_, res) {
  const themes = await fetchThemes();
  res.status(201).json(themes);
});

app.get("/categories", async function (_, res) {
  const categories = await fetchCategories();
  res.status(201).json(categories);
});

app.post("/reset-password-link", async function (req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const userExists = usersDB.findUser(email);

  if (!userExists) {
    return res.status(400).json({ message: "User doesn't" });
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
    .status(200)
    .json({ success: `Password reset link has been sent to email` });
});

app.post("/validate-link", async function (req, res) {
  const { email, token } = req.body;
  if (!email | !token) {
    return res.status(400).json({ message: "Invalid link" });
  }
  const userExists = usersDB.findUser(email);

  if (!userExists) {
    return res.status(400).json({ message: "Invalid link" });
  }
  const secret = JWT_SECRET + usersDB.getPassword(email);
  try {
    const verify = jwt.verify(token, secret);
    res.status(200).json({ success: `Link is verified` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/reset-password", async function (req, res) {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const userExists = usersDB.findUser(email);

  if (!userExists) {
    return res.status(400).json({ message: "User not found" });
  }

  const isPasswordChanged = usersDB.changePassword(email, newPassword);

  if (isPasswordChanged) {
    res
      .status(200)
      .json({ success: `Password for user ${email} has changed!` });
  } else {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

app.listen(PORT, function () {
  console.log("Server is now running on port " + PORT);
});
