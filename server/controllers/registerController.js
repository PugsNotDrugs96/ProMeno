import { promises as fsPromises } from "fs";
import path from "path";
import { hash } from "bcrypt";
import users from "../model/users.json" assert { type: "json" };

const usersDB = {
  users: users,
  setUsers: function (data) {
    this.users = data;
  },
};

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  const duplicate = usersDB.users.find((person) => person.username === user);
  if (duplicate) return res.sendStatus(409);
  try {
    const hashedPwd = await hash(pwd, 10);
    const newUser = { username: user, password: hashedPwd };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.js"),
      JSON.stringify(usersDB.users)
    );
    console.log(usersDB);
    res.status(200).json({ message: "New user registered" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default { handleNewUser };
