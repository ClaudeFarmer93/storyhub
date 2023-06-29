const router = require("express").Router(),
 userController = require("../controllers/homeController");

router
    .get("/", homeController.getHomePage)
    .get("/contact", homeController.getContactInfo)
    .get("/about", homeController.getAbout)
    .get("/search/:genre", homeController.sendReqParam)
    
module.exports = router;