const router = require("express").Router();
const storyController = require("../controllers/storyController");

router
  .get("/uploadStory", storyController.getStoryUploadForm)
  .post("/uploadStory", storyController.saveStory)
  .delete("/id:/delete", storyController.deleteStory, storyController.redirectView)
  .get("/id:", storyController.showStory)
  .get("/", storyController.getAllStorys, (req, res, next) => {
    console.log(req.data);
    res.send(req.data);
  });
module.exports = router;
