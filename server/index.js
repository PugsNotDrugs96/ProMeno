import * as dotenv from "dotenv";
import express from "express";
import {
  fetchThemes,
  fetchCategories,
  fetchPostById,
  fetchPostsByCategory,
} from "./api/wp-api.js";
import cors from "cors";
import bodyParser from "body-parser";
import usersDB from "./db/usersDB.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import NodeCache from "node-cache";

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

dotenv.config();

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
    return res.sendStatus(400);
  }
  res.json({ success: `User ${email} is logged in` });
});

app.post("/register", async function (req, res) {
  const { key, name, email, password } = req.body;
  if (!key || !name || !email || !password) {
    return res
      .sendStatus(400)
      .json({ message: "Key, name, email and password are required" });
  }

  if (key !== process.env.PROMENO_KEY) {
    res.sendStatus(401).json({ message: "Unauthorized" });
  }

  const status = registerUser(name, email, password);
  if (!status) {
    res.json({ message: "Unable to register" });
  } else {
    res.json({ success: `${name} has been successfully been registered` });
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
  let posts = cache.get(`posts-${id}`);
  if (posts) return res.status(201).json(posts);

  posts = await fetchPostsByCategory(id);
  cache.set(`posts-${id}`, posts);
  res.status(201).json(posts);
});

app.get("/post/:id", async function (req, res) {
  const id = req.params.id;
  let post = cache.get(`post-${id}`);
  if (post) return res.status(201).json(post);

  post = await fetchPostById(id);
  cache.set(`post-${id}`, post);
  res.status(201).json(post);
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
