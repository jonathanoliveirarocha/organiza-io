const User = require("../models/User");
const bcrypt = require("bcryptjs");

const authService = {
  signup: async (user) => {
    const newUser = new User(user);
    await newUser.save();
  },
  login: async (user) => {
    User.findOne({ email: user.email }).then((searchUser) => {
      if (!searchUser) {
        return 0;
      }
      bcrypt.compare(user.password, searchUser.password, (err, logged) => {
        if (logged) {
          return 1;
        } else {
          return 2;
        }
      });
    });
  },
};

module.exports = authService;
