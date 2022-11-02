import express from "express";
import {
  fetchPosts,
  fetchThemes,
  fetchCategories,
  fetchPostById,
} from "./api/wp-api.js";
import cors from "cors";
import bodyParser from "body-parser";
import usersDB from "./db/usersDB.js";

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

app.get("/posts", async function (_, res) {
  const posts = await fetchPosts();
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
