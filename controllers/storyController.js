const mongoose = require("mongoose");
const Story = require("../models/story");

module.exports = {
  getAllStorys: (req, res, next) => {
    Story.find({})
      .then((storys) => {
        req.data = storys;
        next();
      })
      .catch((error) => {
        next(error);
      });
  },

  getStoryUploadForm: (req, res) => {
    res.render("uploadStory");
  },

  saveStory: async (req, res) => {
    let newStory = new Story({
      title: req.body.title,
      author: req.body.author,
      publishedDate: new Date(),
      content: req.body.content,
    });

    try {
      await newStory.save();

      let username = req.data.author;
      console.log(username);
      res.render("storyUploadSucces"); // TODO: View
    } catch (error) {
      res.send(error);
    }
  },
};
