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

const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const userController = require("./controllers/userController");
const storyController = require("./controllers/storyController");

//query einfügen

mongoose.connect("mongodb://127.0.0.1:27017/storyhub_db", {
  useNewUrlParser: true,
});

app.set("view engine", "ejs");
app.use(layouts);

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.set("port", process.env.PORT || 3000);
app
  .get("/contact", homeController.getContactInfo)
  .get("/login", (req, res) => {
    res.send("Hello, Welcome back!");
  })
  .get("/uploadStory", storyController.getStoryUploadForm)
  .post("/uploadStory", storyController.saveStory)
  .get("/profile/:username", homeController.respondWithName) // Make responsive with userController
  .get("/signup", userController.getSignUpForm)
  .post("/signup", userController.saveUser)
  .get("/users/:id", userController.showUser)
  .get("/users/:id/update", userController.getUserUpdateForm)
  .post("/users/:id/update", userController.updateUser) // Add userCon.redirectView
  .delete("/users/:id/deleteUser", userController.deleteUser) // Add userCon.redirectView
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
app.use(errorController.notFoundError).use(errorController.internalError);
app
  .get("port", () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
  })
  .listen(port);
