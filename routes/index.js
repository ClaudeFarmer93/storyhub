const router = require("express").Router(),
  userRoutes = require("./userRoutes"),
  storyRoutes = require("./storyRoute"),
  homeRoutes = require("./homeRoute"),
  errorRoutes = require("./errorRoute");

router.use("/users", userRoutes);
router.use("/stories", storyRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;
