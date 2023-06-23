const MongoDB = require("mongodb").MongoClient; // Fürs erste nicht mehr benötigt
const dbURL = "mongodb://localhost:27017";
const dbName = "storyhub_db";
const mongoose = require("mongoose");
const user = require("./models/user");
const story = require("./models/story");

const layouts = require("express-ejs-layouts");
const port = 3000;
const express = require("express");
const app = express();
const router = express.Router();

const methodOverride = require("method-override");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");

const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const userController = require("./controllers/userController");
const storyController = require("./controllers/storyController");

mongoose.connect("mongodb://127.0.0.1:27017/storyhub_db", {
  useNewUrlParser: true,
});

app.set("view engine", "ejs");
app.use(layouts);
router.use(cookieParser("secret_passcode"));
router.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
router.use(connectFlash());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method", { methods: ["POST", "GET"] }));
router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.set("port", process.env.PORT || 3000);
app.use("/", router);
router
  .get("/contact", homeController.getContactInfo)
  .get("/about", homeController.getAbout)
  .get("/users/login", userController.login)
  .post(
    "/users/login",
    userController.authenticate,
    userController.redirectView
  )
  .get("/uploadStory", storyController.getStoryUploadForm)
  .post("/uploadStory", storyController.saveStory)
  .get("/profile/:username", homeController.respondWithName) // Make responsive with userController
  .get("/signup", userController.new)
  .post("/signup", userController.create, userController.redirectView)
  .get("/users/login", userController.login)
  .post(
    "/users/login",
    userController.authenticate
    // userController.redirectView
  )
  .get("/users/:id/update", userController.getUserUpdateForm)
  .post(
    "/users/:id/update",
    userController.updateUser,
    userController.redirectView
  ) // Add userCon.redirectView
  .get("/users/:id", userController.showUser)
  .delete(
    "/users/:id/deleteUser",
    userController.deleteUser,
    userController.redirectView
  ) // Add userCon.redirectView
  .get("/search/:genre", homeController.sendReqParam) // Make responsive with storyController
  .get("/", homeController.getHomePage)
  .get("/users", userController.userIndex)
  .get("/stories", storyController.getAllStorys, (req, res, next) => {
    console.log(req.data);
    res.send(req.data);
  })
  .use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    console.log(req.query);
    next();
  })
  .post("/", (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.send("POST Successful");
  })
  .get("view engine");
router.use(errorController.notFoundError).use(errorController.internalError);
app
  .get("port", () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
  })
  .listen(port);
