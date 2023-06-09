const mongoose = require("mongoose");
const User = require("../models/user");

module.exports = {
  userIndex: (req, res) => {
    User.find({})
      .then((users) => {
        res.render("users/index", { users: users });
      })
      .catch((error) => {
        res.redirect("/");
      });
  },

  getAllUsers: (req, res, next) => {
    User.find({})
      .then((users) => {
        req.data = users;
        res.render("users", {
          users,
        });
      })
      .catch((error) => {
        next(error);
      });
  },

  getOneUser: (req, res) => {
    User.findOne(_id);
  },

  showUser: (req, res, next) => {
    let userID = req.params.id;
    User.findById(userID)
        .then(user => {
          res.render("users/showUser", {user});
        })
        .catch((error) => {
          next(error);
        });
  },

  // Überlegen welche seite sich da am bsten anbietet, zur zeit contacts aus dem buch aber eine dedizierte registrierungs page würde sinn machen.
  getSubscriptionPage: (req, res) => {
    res.render("contact");
  },

  getSignUpForm: (req, res) => {
    res.render("signup");
  },

  saveUser: async (req, res) => {
    let newUser = new User({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      moderatorStatus: false, // hier nimmt er noch die angabe aus dem req bdy, das macht aber keinen sinn. überlegen wie man das abändert.
      password: req.body.password,
    });

    try {
      await newUser.save();
      res.render("thanks");
    } catch (error) {
      res.send(error);
    }
  },

  getUserUpdateForm: (req, res) => {
    let userID = req.params.id;
    User.findById(userID)
        .then(user => {
          res.render("users/update", {user: user});
        })
        .catch((error) => {
          next(error);
        });
  },

  // WIP
  updateUser: async (req, res) => {
    let userId = req.params.id;
    let updatedUser = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      moderatorStatus: false,
      password: req.body.password,
    };

    try {
      await User.findByIdAndUpdate(userId, {$set: updatedUser}, {
        new: true,
        runValidators: true,
      });
      res.render("thanks");
    } catch (error) {
      res.send(error);
    }
  },

  // WIP
  deleteUser: async (req, res) => {
    let userId = req.params.id;
      User.findByIdAndRemove(userId)
        .then(() => {
          res.redirect("/users");
          next();
        })
        .catch((error) => {
          next(error);
        });
  },
};
