const mongoose = require("mongoose");
const Story = require("../models/story");
const user = require("../models/user");
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

exports.getStoryUploadForm = (req, res) => {
  res.render("uploadStory");
};

exports.saveStory = async (req, res) => {
  let newStory = new Story({
    title: req.body.title,
    author: req.body.author,
    publishedDate: new Date(),
    content: req.body.content,
    //user:
  });

  try {
    await newUser.save();

    let username = req.data.author;
    console.log(username);
    res.render("storyUploadSucces"); // noch kein view vorhanden.
  } catch (error) {
    res.send(error);
  }
};
