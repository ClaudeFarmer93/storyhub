exports.sendReqParam = (req, res) => {
  let genre = req.params.genre;
  res.send(`This is the page for ${genre}`);
  console.log(req.query);
  console.log(req.body);
};

exports.respondWithName = (req, res) => {
  let paramsName = req.params.username;
  res.render("profile", { username: paramsName });
};

exports.getHomePage = (req, res) => {
  const story = {
    author: "Jon Wexler",
    title: "Get Programming with Node.js",
  };
  res.render("home", { story });
};

exports.getContactInfo = (req, res) => {
  const contactInfo = {
    founder: "Claude Alex and Lucas ",
    address: "Wilhelminenhof Campus",
    company: "HTW",
    email: "info@mystoryhub.com",
  };
  res.render("contact", { contactInfo });
};
// exports.respondWithName = (req, res) => {
//   let paramsName = req.params.myName;
//   res.render("index", { name: paramsName });
//  };
