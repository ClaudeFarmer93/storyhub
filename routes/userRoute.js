const router = require("express").Router(),
 userController = require("../controllers/userController");

router.get("/", userController.userIndex, userController.indexView)
    .get("/signup", userController.new)
    .post("/signup", userController.validate, userController.create, userController.redirectView)
    .get("/login", userController.login)
    .post("/login", userController.authenticate)
    .get("/logout", userController.logout, userController.redirectView)
    .get("/:id/update", userController.getUserUpdateForm)
    .put("/:id/update", userController.update, userController.redirectView)
    .get("/:id", userController.showUser, userController.showView)
    //.get("/profile/:username", homeController.respondWithName)
    .delete("/:id/delete", userController.deleteUser, userController.redirectView)

module.exports = router;
