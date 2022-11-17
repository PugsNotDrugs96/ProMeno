import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";

const uri = process.env.DATABASE_URI;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose
  .connect(uri, connectionParams)
  .then(() => {
    console.log("Successful connection to the database");
  })
  .catch((err) => {
    console.log("Error: " + err);
  })

  const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Name is required"]
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: password,
      required: true
    },
    isSelected: {
      type: Boolean
    },
    isAdmin: {
      type: Boolean
    }
  });

  const User = mongoose.model("Users", userSchema);


const registerUser = function(name, email, password){
  const user = new User({
    name: `${name}`,
    email: `${email}`,
    password: `${password}`,
    isSelected: false,
    isAdmin: false
  });

  user.save((err) => {
    if(err) return false
    else {
      mongoose.connection.close();
      return true
    }
  });
}

export {registerUser};
