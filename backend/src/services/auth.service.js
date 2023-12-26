const User = require("../models/User");

const authService = {
  addUser: async (user) => {
    const newUser = new User(user);
    await newUser.save();
    return newUser;
  },

  getUser: async (user) => {
    const searchUser = User.findOne({ email: user.email });
    if (searchUser) {
      return searchUser;
    } else {
      return null;
    }
  },

  getUserById: async (userId) => {
    const searchUser = User.findOne({ _id: userId });
    if (searchUser) {
      return searchUser;
    } else {
      return null;
    }
  },
};

module.exports = authService;
