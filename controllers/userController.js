const mongoose = require("mongoose");
const User = require("../models/user");
exports.getAllUsers = (req, res, next) => {
 User.find({})
 .then((users) => {
   req.data = users;
   next();
 })
 .catch((error) => {
   next(error);
 });
};