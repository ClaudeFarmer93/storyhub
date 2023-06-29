const router = require("express").Router(),
  userRouter = require("./userRoute"),
  storyRouter = require("./storyRoute"),
  homeRouter = require("./homeRoute"),
  errorRouter = require("./errorRoute");

router.use("/users", userRouter);
router.use("/stories", storyRouter);
router.use("/", homeRouter);
router.use("/", errorRouter);

module.exports = router;
