import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";

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
  res.json({ success: `User test is logged in!` });
});

app.post("/password/change", async function (req, res) {
  res.json({ success: `Password for user test is changed!` });
});

app.get("/posts-by-category/:id", async function (req, res) {
  let rawdata = fs.readFileSync("posts.json");
  let posts = JSON.parse(rawdata);
  res.status(201).json(posts);
});

app.get("/posts/:id", async function (req, res) {
  let rawdata = fs.readFileSync("post.json");
  let post = JSON.parse(rawdata);
  res.status(201).json(post);
});

app.get("/categories", async function (_, res) {
  let rawdata = fs.readFileSync("categories.json");
  let categories = JSON.parse(rawdata);
  res.status(201).json(categories);
});

app.listen(PORT, function () {
  console.log("Server is now running on port " + PORT);
});
