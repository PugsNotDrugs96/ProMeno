const users = {
  "felicia@gmail.com": "test",
  "julia@gmail.com": "test",
  "qassem@gmail.com": "test",
  "nima@gmail.com": "test",
  "alex@gmail.com": "test",
  "frida@gmail.com": "test",
};

const usersDB = {
  users: users,
  getPassword: (email) => {
    return users[email];
  },
  validateLogin: (email, password) => {
    return users[email] === password;
  },
  changePassword: (email, newPassword) => {
    users[email] = newPassword;
    return true;
  },
  findUser: (email) => {
    if (email in users) return true;

    return false;
  },
};

export default usersDB;
