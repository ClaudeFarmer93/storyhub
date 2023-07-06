const router = require("express").Router(),
  homeController = require("../controllers/homeController");

router
  .get("/search/:genre", homeController.sendReqParam)
  .get("/contact", homeController.getContactInfo)
  .get("/about", homeController.getAbout)
  .get("/", homeController.getHomePage);

module.exports = router;
