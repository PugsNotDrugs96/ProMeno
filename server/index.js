import * as dotenv from 'dotenv';
dotenv.config();

import express from "express";
import {
  fetchThemes,
  fetchCategories,
  fetchPostById,
  fetchPostsByCategory,
} from "./api/wp-api.js";
import cors from "cors";
import bodyParser from "body-parser";
import {usersDB, registerUser} from "./db/usersDB.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

//cors options is to allow our client to make requests
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.post("/auth", async function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const isValidLogin = usersDB.validateLogin(email, password);

  if (!isValidLogin) {
    return res.sendStatus(400);
  }
  res.json({ success: `User ${email} is logged in!` });
});

app.post("/register", async function(req, res) {
  const {key, name, email, password} = req.body;
  if(!key || !name || !email || !password){
    return res.sendStatus(400).json({message: "Key, name, email and password are required"});
  }

  if(key !== process.env.PROMENO_KEY){
    res.sendStatus(401).json({message: "Unauthorized"})
  }

  const status = registerUser(name, email, password);
  if(!status){
    res.json({message: "Unable to register"})
  } else{
    res.json({success: `${name} has been successfully been registered`});
  }
})

app.post("/password/change", async function (req, res) {
  const { email, currentPassword, newPassword } = req.body;
  if (!email || !currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Email and passwords are required" });
  }
  const success = usersDB.changePassword(email, currentPassword, newPassword);
  if (!success) {
    return res.sendStatus(400);
  }
  res.json({ success: `Password for user ${email} is changed!` });
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

app.listen(PORT, function () {
  console.log("Server is now running on port " + PORT);
});
