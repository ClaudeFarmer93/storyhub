const mongoose = require("mongoose");

const storySchema = mongoose.Schema({
  title: {
    // metadaten noch als ein wert zsm fassen
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User"
  // }
});

module.exports = mongoose.model("Story", storySchema);
