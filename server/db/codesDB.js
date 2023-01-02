import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "Code is required"],
  },
});

const CodeModel = mongoose.model("Code", codeSchema);

export { CodeModel };
