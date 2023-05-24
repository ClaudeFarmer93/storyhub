const mongoose = require("mongoose");
const Story = require("../models/story");
exports.getAllStorys = (req, res, next) => {
 Story.find({})
 .then((storys) => {
   req.data = storys;
   next();
 })
 .catch((error) => {
   next(error);
 });
};