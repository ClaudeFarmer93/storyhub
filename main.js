const MongoDB = require("mongodb").MongoClient; // Fürs erste nicht mehr benötigt
const dbURL = "mongodb://localhost:27017";
const dbName = "storyhub_db";
const mongoose = require("mongoose");
const layouts = require("express-ejs-layouts");
const port = 3000;
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
const passport = require("passport");
const User = require("./models/user");
const router = require("./routes/index");
mongoose.connect("mongodb://127.0.0.1:27017/storyhub_db", {
  useNewUrlParser: true,
});

app.set("view engine", "ejs");
app.use(layouts);
app.use(cookieParser("secret_passcode"));
app.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(connectFlash());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

app.set("port", process.env.PORT || 3000);
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

app.use("/", router);
app
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

app
  .get("port", () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
  })
  .listen(port);
