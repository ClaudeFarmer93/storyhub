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
