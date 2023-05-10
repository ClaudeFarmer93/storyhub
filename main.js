const MongoDB = require("mongodb").MongoClient;
const dbURL = "mongodb://localhost:27017";
const dbName = "storyhub_db";

MongoDB.connect(dbURL, (error, client) => {
  if (error) throw error;
  let db = client.db(dbName);
  db.collection("users")
    .find()
    .toArray((error, data) => {
      if (error) throw error;
      console.log(data);
    }); /*
  db.collection("users")
    //  UserID, Username, name, lastname, email, password, modarator
    .insert(
      {
        UserId: 1,
        username: "ClaudeFarmer93",
        firstName: "Claude",
        lastName: "Farmer",
        email: "claude@wtat.de",
        password: password,
        moderator: true,
      },
      (error, db) => {
        if (error) throw error;
        console.log(db);
      }
    )
    .insert(
      {
        UserId: 2,
        username: "AlexanderStae",
        firstName: "Alexander",
        lastName: "Staemmler",
        email: "alex@wtat.de",
        password: password,
        moderator: true,
      },
      (error, db) => {
        if (error) throw error;
        console.log(db);
      }
    )
    .insert(
      {
        UserId: 3,
        username: "BeBaxxter",
        firstName: "Lucas",
        lastName: "Winter",
        email: "lucas@wtat.de",
        password: password,
        moderator: true,
      },
      (error, db) => {
        if (error) throw error;
        console.log(db);
      }
    );*/
});

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/storyhub_db",
  {useNewUrlParser: true}
);
/*
db.once("open", () => {
  console.log("Sucessfully connected to DB.");
});
*/
const layouts = require("express-ejs-layouts");
const port = 3000,
  express = require("express"),
  app = express();

const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");

app.set("view engine", "ejs");
app.use(layouts);

app.set("port", process.env.PORT || 3000);
app
  .get("/contact", homeController.getContactInfo)
  .get("/login", (req, res) => {
    res.send("Hello, Welcome back!");
  })
  .get("/signup", (req, res) => {
    res.send("Hello, Nice that you'd like to join!");
  })
  .get("/search/:genre", homeController.sendReqParam)

  .get("/profile/:username", homeController.respondWithName)
  .get("/", homeController.getHomePage)
  .use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    console.log(req.query);
    next();
  })
  .use(
    express.urlencoded({
      extended: false,
    })
  )
  .use(express.json())
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
