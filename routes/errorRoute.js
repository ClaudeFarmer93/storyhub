const router = require("express").Router();
const errorController = require("../controllers/errorController");

router.use(errorController.notFoundError).use(errorController.internalError);

module.exports = router;
