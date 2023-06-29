const router = require("express").Router();
const storyController = require("../controllers/storyController");

router
  .get("stories/uploadStory", storyController.getStoryUploadForm)
  .post("stories/uploadStory", storyController.saveStory)
  .get("/stories", storyController.getAllStorys, (req, res, next) => {
    console.log(req.data);
    res.send(req.data);
  });
module.exports = router;
