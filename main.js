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

/*
user.create({
  // test function zum erstellen eines neuen users, lässt app crashen solange wir das verbindungsproblem nicht gelößt haben.
  username: "Neos",
  firstname: "Alex",
  lastname: "S.",
  email: "monkeysort@avadacedavra.com",
  moderator: true,
  password: "totallysavepassword",
});

/*
,
function (error, saveDocument) {
  if (error) console.log(error);
  console.log(saveDocument);
}
*/

app.set("view engine", "ejs");
app.use(layouts);

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.set("port", process.env.PORT || 3000);
app
  .get("/contact", homeController.getContactInfo)
  .get("/login", (req, res) => {
    res.send("Hello, Welcome back!");
  })
  .get("/signup", userController.getSignUpForm)
  .post("/signup", userController.saveUser)
  .get("/search/:genre", homeController.sendReqParam)

  .get("/profile/:username", homeController.respondWithName)
  .get("/", homeController.getHomePage)
  .get("/users", userController.getAllUsers, (req, res, next) => {
    console.log(req.data);
    res.send(req.data);
  })
  .get("/storys", storyController.getAllStorys, (req, res, next) => {
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
