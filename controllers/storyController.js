const mongoose = require("mongoose");
const Story = require("../models/story");
const express = require("express");

module.exports = {
  storyIndex: (req, res, next) => {
    Story.find({})
      .then((stories) => {
        //res.render("stories/storyIndex", { stories: stories });
        if (req.query.format === "json") {
          res.json(stories);
        } else {
          res.render("stories/storyIndex", { stories: stories });
        }
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
  },

  respondJSON: (req, res) => {
    res.json({
      status: httpStatus.OK,
      data: res.locals,
    });
  },

  errorJSON: (error, req, res, next) => {
    let errorObject;
    if (error) {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    } else {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Unknown Error.",
      };
    }
    res.json(errorObject);
  },
};
