import express from "express";
import { fetchPosts, fetchThemes, fetchCategories } from "./api/wp-api.js";

const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));

app.get("/posts", async function (_, res) {
  const posts = await fetchPosts();
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.status(201).json(posts);
});

app.get("/themes", async function (_, res) {
  const themes = await fetchThemes();
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.status(201).json(themes);
});

app.get("/categories", async function (_, res) {
  const categories = await fetchCategories();
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.status(201).json(categories);
});

app.post("/", function (req, res) {});

app.put("/", function (req, res) {});

app.patch("/", function (req, res) {});

app.delete("/", function (req, res) {});

app.listen(PORT, function () {
  console.log("Server is now running on port " + PORT);
});
