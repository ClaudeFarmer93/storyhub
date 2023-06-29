const mongoose = require("mongoose");
const Story = require("../models/story");

module.exports = {
  getAllStorys: (req, res, next) => {
    Story.find({})
    .then((stories) => {
      res.render("stories/storyIndex", { stories: stories });
    })
    .catch((error) => {
      res.redirect("/");
    });
  },

  showStory: (req, res, next) => {
    let storyID = req.params.id;
    Story.findById(storyID)
      .then((story) => {
        res.render("stories/showStory", { story });
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

  deleteStory: async (req, res) => {
    let storyId = req.params.id;
    Story.findByIdAndRemove(storyId)
      .then(() => {
        res.locals.redirect = "/";
      })
      .catch((error) => {
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  }
};
