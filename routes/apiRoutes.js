const router = require("express").Router();
const storyController = require("../controllers/storyController");
const userController = require("../controllers/userController");
router.use(userController.verifyToken);
router.get("/stories", storyController.storyIndex, storyController.respondJSON);
router.use(storyController.errorJSON);
module.exports = router;