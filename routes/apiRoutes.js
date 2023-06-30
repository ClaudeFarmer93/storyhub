const router = require("express").Router();
const storyController = require("../controllers/storyController");
router.get("/stories", storyController.storyIndex, storyController.respondJSON);
router.use(storyController.errorJSON);
module.exports = router;