const mongoose = require("mongoose");
const User = require("../models/user");
exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      req.data = users;
      res.render("users", {
        users,
      });
      // next();
    })
    .catch((error) => {
      next(error);
    });
};

// Überlegen welche seite sich da am bsten anbietet, zur zeit contacts aus dem buch aber eine dedizierte registrierungs page würde sinn machen.
exports.getSubscriptionPage = (req, res) => {
  res.render("contact");
};

exports.saveUser = async (req, res) => {
  let newUser = new User({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    moderatorStatus: req.body.moderatorStatus, // hier nimmt er noch die angabe aus dem req bdy, das macht aber keinen sinn. überlegen wie man das abändert.
    password: req.body.password,
    zipCode: req.body.zipCode, //Bin mir nicht sicher ob der hier benötigt wird.
  });

  try {
    await newUser.save();
    res.render("thanks");
  } catch (error) {
    res.send(error);
  }

  /* // Das hier sollte bereits als promise funktionieren anstatt try catch von oben
    newSubscriber.save()
    .then((result) => {
      res.render("thanks");
    })
    .catch((error) => {
      res.send(error);
    });
    */
};
