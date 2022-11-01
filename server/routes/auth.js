import express from "express";
import authController from "../controllers/authController.js";

const loginRouter = express.Router();

loginRouter.post("/", authController.handleLogin);

export default loginRouter;
