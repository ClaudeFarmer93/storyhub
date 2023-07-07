const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    trim: true,
    required: true,
  },
  lastname: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  apiToken: {
    type: String,
    required: true,
  },

  moderatorStatus: Boolean,
});
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});
userSchema.pre("save", function(next) {
  let user = this;
  if (!user.apiToken) user.apiToken =
  randToken.generate(16);
  next();
 });

module.exports = mongoose.model("User", userSchema);
