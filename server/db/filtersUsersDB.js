import { UserModel } from "./usersDB.js";
import md5 from "md5";

export async function getAllUsersDB() {
  return new Promise((resolve, reject) => {
    UserModel.find((err, data) => {
      if (err) {
        resolve("error");
      } else {
        resolve(data);
      }
    });
  });
}

export async function getUserDB(email) {
  return new Promise((resolve, reject) => {
    const user = UserModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      resolve("Email does not exist");
      return;
    } else if (user.email === email.toLowerCase()) {
      resolve(user);
      return;
    } else {
      resolve("Database error 500");
      return;
    }
  });
}

export async function registerUserDB(name, email, password) {
  return new Promise(async (resolve, reject) => {
    if (await checkIfEmailExist(email)) {
      resolve("409");
      return;
    }
    var userModel = new UserModel();
    userModel.name = name.toLowerCase();
    userModel.email = email.toLowerCase();
    userModel.password = md5(password);
    userModel.isSelected = false;
    userModel.isAdmin = false;

    userModel.save((err) => {
      if (err) {
        resolve("500");
      } else {
        console.log("Successfully added user to DB");
        resolve("200");
      }
    });
  });
}

export async function updateEmailDB(oldEmail, newEmail) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findOneAndUpdate(
      { email: oldEmail },
      { email: newEmail.toLowerCase() }
    );
    if (!user) {
      resolve("Email does not exist");
    } else {
      resolve("200");
    }
  });
}

export async function updatePasswordDB(email, password) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findOneAndUpdate(
      { email: email.toLowerCase() },
      { password: md5(password) }
    );
    if (!user) {
      resolve("Email does not exist");
    } else {
      resolve("200");
    }
  });
}

export async function deleteUserDB(email) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findOneAndDelete({ email: email });
    if (!user) {
      resolve("400");
    } else {
      resolve("200");
    }
  });
}

export async function validateLogin(email, password) {
  const user = await UserModel.findOne({ email: email.toLowerCase() });
  if (!user) {
    return "Email does not exist";
  } else if (user.password !== md5(password)) {
    return "Invalid password";
  } else if (user.password === md5(password)) {
    return "Valid password";
  } else {
    return "Database error";
  }
}

export async function checkIfEmailExist(email) {
  const usersData = await getAllUsersDB();
  if (usersData.find((element) => element.email === email)) {
    return true;
  }
}

async function checkIfSelected(email) {
  const user = await getUserDB(email);
  if (user.isSelected === true) {
    return true;
  }
}

export async function getNameByEmail(email) {
  const usersData = await getAllUsersDB();

  const user = usersData.find((element) => element.email === email);
  if (user) {
    return user.name;
  }
}

export async function getPasswordByEmail(email) {
  const usersData = await getAllUsersDB();

  const user = usersData.find((element) => element.email === email);
  if (user) {
    return user.password;
  }
}
