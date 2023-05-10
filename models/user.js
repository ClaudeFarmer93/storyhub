const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    moderatorStatus: Boolean,
    password: String
  });

  module.exports = mongoose.model("User", userSchema);