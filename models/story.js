const mongoose = require("mongoose");

const storySchema = mongoose.Schema({
    storyID: Number,
    title: String,
    author: String,
    publishedDate: Date,
    body: String
  });

module.exports = mongoose.model("Story", storySchema);