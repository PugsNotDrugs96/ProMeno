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
  res.status(200).send(`Test user is logged in`);
});

app.post("/register", async function (req, res) {
  res.status(200).send("Test user registered");
});

app.get("/get-all-users-db", async function (req, res) {
  const users = [{ email: "test user" }];
  res.status(200).send(users);
});

app.get("/get-user-by-email-db", async function (req, res) {
  const user = { email: "test user" };
  res.status(200).send(user);
});

app.post("/update-email-db", async function (req, res) {
  res.status(200).send(status);
});

app.post("/update-password-db", async function (req, res) {
  res.status(200).send(status);
});

app.post("/delete-account", async function (req, res) {
  res.status(200).send(status);
});

app.post("/change-password", async function (req, res) {
  return res.status(200).json("Password updated");
});

app.get("/posts-by-category/:slug", async function (req, res) {
  let rawdata = fs.readFileSync("postsByCategory.json");
  let posts = JSON.parse(rawdata);
  res.status(200).json(posts);
});

app.get("/posts/:slug", async function (req, res) {
  let rawdata = fs.readFileSync("post.json");
  let post = JSON.parse(rawdata);
  res.status(200).json(post);
});

app.get("/categories", async function (_, res) {
  let rawdata = fs.readFileSync("categories.json");
  let categories = JSON.parse(rawdata);
  res.status(200).json(categories);
});

app.get("/categories/:slug", async function (req, res) {
  let rawdata = fs.readFileSync("category.json");
  let categories = JSON.parse(rawdata);
  res.status(200).json(categories);
});

app.post("/reset-password-link", async function (req, res) {
  console.log("Link should be sent");
  res
    .status(201)
    .json({ success: `Password reset link has been sent to email` });
});

app.post("/validate-link", async function (req, res) {
  res.status(200).json({ success: `Link is valid` });
});

app.post("/validate-code", async function (req, res) {
  return res.status(200).json({ success: `Code is valid!` });
});

app.post("/reset-password", async function (req, res) {
  res.status(200).json({ success: `Password for user test has changed!` });
});

app.post("/profile", async function (req, res) {
  const user = { email: "test user" };
  res.status(200).json(user);
});

app.listen(PORT, function () {
  console.log("Server is now running on port " + PORT);
});
