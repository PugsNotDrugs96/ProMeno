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
  validateLogin: (email, password) => {
    return users[email] === password;
  },
  changePassword: (email, currentPassword, newPassword) => {
    if (!usersDB.validateLogin(email, currentPassword)) return false;
    users[email] = newPassword;
    return true;
  },
};

export default usersDB;
