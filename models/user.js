const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    firstname: {
      type: String,
      trim: true,
      required: true
    },
    lastname: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    }, 
    password: {
      type: String,
      trim: true,
      required: true,
    },
    moderatorStatus: Boolean 
  });

  module.exports = mongoose.model("User", userSchema);