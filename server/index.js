import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import {
  fetchCategories,
  fetchPost,
  fetchPostsByCategory,
  fetchCategoryIdBySlug,
  fetchCategoryBySlug,
} from "./api/wp-api.js";
import { validateToken, getEmailFromToken } from "./tokenHandler.js";
import * as usersFilters from "./db/filtersUsersDB.js";
import * as codeFilters from "./db/filtersCodeDB.js";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import NodeCache from "node-cache";
import schema from "./passwordValidator.js";

//import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(bodyParser.json());

//cors options is to allow our client to make requests
const corsOptions = {
  origin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
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

  const isValidLogin = await usersFilters.validateLogin(email, password);

  if (isValidLogin === "Email does not exist") {
    res.status(401).send("Email not found");
  } else if (isValidLogin === "Invalid password") {
    res.status(401).send("Invalid password");
  } else if (isValidLogin === "Database error") {
    res.status(500).send("Database connection failed");
  } else {
    const token = jwt.sign({ email: email }, JWT_SECRET);
    res.status(200).send(token);
  }
});

app.post("/auth-token", async function (req, res) {
  const isTokenValid = validateToken(req.headers.auth);
  if (!isTokenValid) return res.status(401).json("Unauthorized");
  res.status(200).json({ success: `Token is valid` });
});

app.post("/register", async function (req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .send({ message: "Name, email and password are required" });
  }

  if (!schema.validate(password)) {
    return res
      .status(403)
      .send({ message: "Password did not meet the specified requirements" });
  }

  await usersFilters
    .registerUserDB(name, email, password)
    .then((result) => {
      if (result === "500") {
        res.status(500).send("Unable to register user to database");
      } else if (result === "409") {
        res.status(409).send("Email already registered");
      } else {
        const token = jwt.sign({ email: email }, JWT_SECRET);
        res.status(200).send(token);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(406).send({ statusCode: err });
    });
});

app.get("/get-all-users-db", async function (_, res) {
  const data = await usersFilters.getAllUsersDB();
  if (data === "error") {
    res.status(500).send("Database error");
  } else if (data === "Email already exist") {
    res.status(406).send("Email already registered");
  } else {
    res.send(data);
  }
});

app.get("/get-user-by-email-db", async function (req, res) {
  const { email } = req.body;
  const user = await usersFilters.getUserDB(email);

  if (user === "Email does not exist") {
    res.status(406).send("Email does not exist");
  } else {
    res.status(200).send(user);
  }
});

app.post("/update-email-db", async function (req, res) {
  const { oldEmail, newEmail } = req.body;
  const status = await usersFilters.updateEmailDB(oldEmail, newEmail);

  if (status === "Email does not exist") {
    res.status(406).send("Email does not exist");
  } else {
    res.status(200).send(status);
  }
});

app.post("/update-password-db", async function (req, res) {
  const { email, password } = req.body;

  if (!schema.validate(password)) {
    return res
      .status(403)
      .send({ message: "Password did not meet the specified requirements" });
  }

  const status = await usersFilters.updatePasswordDB(email, password);

  if (status === "Email does not exist") {
    res.status(406).send("Email does not exist");
  } else {
    res.status(200).send(status);
  }
});

app.post("/delete-account", async function (req, res) {
  const token = req.headers.auth;
  const isTokenValid = validateToken(token);
  if (!isTokenValid) return res.status(401).json("Unauthorized");

  const email = getEmailFromToken(token);

  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  const isValidLogin = await usersFilters.validateLogin(email, password);

  if (isValidLogin === "Email does not exist") {
    res.status(404).send("Email not found");
  } else if (isValidLogin === "Invalid password") {
    res.status(401).send("Invalid password");
  } else if (isValidLogin === "Database error") {
    res.status(500).send("Database connection failed");
  } else if (isValidLogin === "Valid password") {
    const status = await usersFilters.deleteUserDB(email);
    if (status === "400") {
      res.status(406).send("Email does not exist");
    } else {
      res.status(200).send(status);
    }
  }
});

app.post("/change-password", async function (req, res) {
  const token = req.headers.auth;
  const isTokenValid = validateToken(token);
  if (!isTokenValid) return res.status(401).json("Unauthorized");

  const email = getEmailFromToken(token);

  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "Passwords are required" });
  }

  if (!schema.validate(newPassword)) {
    return res.status(403).send({
      message: "New password did not meet the specified requirements",
    });
  }

  const isValidLogin = await usersFilters.validateLogin(email, currentPassword);

  if (isValidLogin === "Valid password") {
    const changePasswordStatus = await usersFilters.updatePasswordDB(
      email,
      newPassword
    );
    if (changePasswordStatus === "200") {
      return res.status(200).json("Password updated");
    } else {
      return res.status(500).json("Database error");
    }
  } else if (isValidLogin === "Email does not exist") {
    return res.status(406).json("Email does not exist");
  } else if (isValidLogin === "Invalid password") {
    return res.status(401).json("Invalid current password");
  } else if (isValidLogin === "Database error") {
    return res.status(500).json("Database error");
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
  const isTokenValid = validateToken(req.headers.auth);
  if (!isTokenValid) return res.status(401).json("Unauthorized");

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

app.get("/categories", async function (req, res) {
  const isTokenValid = validateToken(req.headers.auth);
  if (!isTokenValid) return res.status(401).json("Unauthorized");

  let categories = cache.get("categories");
  if (categories) return res.status(201).json(categories);

  categories = await fetchCategories();
  cache.set("categories", categories);
  res.status(201).json(categories);
});

app.get("/categories/:slug", async function (req, res) {
  const isTokenValid = validateToken(req.headers.auth);
  if (!isTokenValid) return res.status(401).json("Unauthorized");

  const slug = req.params.slug;
  let category = cache.get(`category-${slug}`);
  if (category) return res.status(201).json(category);

  category = await fetchCategoryBySlug(slug);
  cache.set(`category-${slug}`, category);
  res.status(201).json(category);
});

app.post("/reset-password-link", async function (req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const userExists = await usersFilters.checkIfEmailExist(email);

  if (!userExists) {
    return res.status(401).json({ message: "User doesn't exist" });
  }
  const secret = JWT_SECRET + (await usersFilters.getPasswordByEmail(email));

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
  const userExists = await usersFilters.checkIfEmailExist(email);

  if (!userExists) {
    return res.status(401).json({ message: "Invalid link" });
  }
  const secret = JWT_SECRET + (await usersFilters.getPasswordByEmail(email));
  try {
    jwt.verify(token, secret);
    res.status(200).json({ success: `Link is valid` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/validate-code", async function (req, res) {
  const { code } = req.body;
  if (!code) {
    return res.status(401).json({ message: "Invalid code" });
  }

  const validCode = await codeFilters.validateCode(code);

  if (!validCode) {
    return res.status(401).json({ message: "Invalid code" });
  } else {
    return res.status(200).json({ success: `Code is valid!` });
  }
});

app.post("/reset-password", async function (req, res) {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (!schema.validate(newPassword)) {
    return res.status(403).send({
      message: "New password did not meet the specified requirements",
    });
  }

  const userExists = await usersFilters.checkIfEmailExist(email);

  if (!userExists) {
    return res.status(401).json({ message: "User doesn't exist" });
  }

  const isPasswordChanged = await usersFilters.updatePasswordDB(
    email,
    newPassword
  );

  if (isPasswordChanged == "200") {
    res
      .status(200)
      .json({ success: `Password for user ${email} has changed!` });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/profile", async function (req, res) {
  const token = req.headers.auth;
  const isTokenValid = validateToken(token);
  if (!isTokenValid) return res.status(401).json("Unauthorized");

  const email = getEmailFromToken(token);
  const user = await usersFilters.getNameByEmail(email);

  if (!user) {
    res.status(500);
  } else if (user) {
    res.status(200).json(user);
  } else {
    res.status(520);
  }
});

app.listen(PORT, function () {
  console.log("Server is now running on port " + PORT);
});
