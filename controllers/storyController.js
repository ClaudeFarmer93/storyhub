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

exports.saveStory = async (req, res) => {
  let newStory = new Story({
    title: req.body.title,
    author: req.body.author,
    publishedDate: new Date(),
    content: req.body.body
    //user: id
  });

  try {
    await newUser.save();
    res.render("UploadSucces"); // noch kein view vorhanden.
  } catch (error) {
    res.send(error);
  }
};
