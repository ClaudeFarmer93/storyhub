const router = require("express").Router(),
  userController = require("../controllers/userController");

router
  .get("/signup", userController.new)
  .post(
    "/signup",
    // userController.validate,
    userController.create,
    userController.redirectView
  )
  .get("/login", userController.login)
  .post("/login", userController.authenticate)
  .get("/logout", userController.logout, userController.redirectView)
  .get("/:id/update", userController.getUserUpdateForm)
  .put("/:id/update", userController.updateUser, userController.redirectView)
  .get("/:id", userController.showUser)
  .delete("/:id/delete", userController.deleteUser, userController.redirectView)
  .get("/", userController.userIndex);

module.exports = router;
