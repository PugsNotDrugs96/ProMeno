import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isSelected: {
    type: Boolean,
  },
  isAdmin: {
    type: Boolean,
  },
});

const codeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "Code is required"],
  },
});

const UserModel = mongoose.model("Users", userSchema);
const CodeModel = mongoose.model("Code", codeSchema);

export { UserModel, CodeModel };
