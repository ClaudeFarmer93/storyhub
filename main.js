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
  .use(errorController.notFoundError)
  .use(errorController.internalError);
app
  //.get("/", (req, res) => {
  //res.send("Hello, Universe!");

  //   console.log(req.params);
  //   console.log(req.body);
  //   console.log(req.url);
  //   console.log(req.query);
  // })
  .get("/contact", homeController.getContactInfo)
  .get("/login", (req, res) => {
    res.send("Hello, Welcome back!");
  })
  .get("/signup", (req, res) => {
    res.send("Hello, Nice that you'd like to join!");
  })
  .get("/search/:genre", homeController.sendReqParam)
  // .get("/profile/:username", (req, res) => {
  //   let user = req.params.username;
  //   res.send(`Hello there, ${user}`);
  // })
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
//     console.log(`The Express.js server has started and is listening
// ➥ on port number: ${port}`);
//   });
app
  .get("port", () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
  })
  .listen(port);
