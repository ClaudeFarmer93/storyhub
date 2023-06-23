const mongoose = require("mongoose");
const User = require("../models/user");
const getUserParams = (body) => {
  return {
    username: body.username,
    firstname: body.firstname,
    lastname: body.lastname,
    email: body.email,
    moderatorStatus: false, // hier nimmt er noch die angabe aus dem req bdy, das macht aber keinen sinn. überlegen wie man das abändert.
    password: body.password,
  };
};
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
  login: (req, res) => {
    res.render("users/login");
  },
  authenticate: (req, res, next) => {
    User.findOne({
      email: req.body.email,
    })
      .then((user) => {
        if (user && user.password === req.body.password) {
          res.locals.redirect = `/users/${user._id}`;
          res.flash(
            "success",
            `${user.username}'s logged in successfully! wooop`
          );
          res.locals.user = user;
          next();
        } else {
          req.flash(
            "error",
            " Your account or passoword is incorrect. Please try again"
          );
          res.locals.redirect = "users/login";
          next();
        }
      })
      .catch((error) => {
        console.log(`Error logging in user: ${error.message}`);
        next(error);
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
      .then((user) => {
        res.render("users/showUser", { user });
      })
      .catch((error) => {
        next(error);
      });
  },

  // Überlegen welche seite sich da am bsten anbietet, zur zeit contacts aus dem buch aber eine dedizierte registrierungs page würde sinn machen.
  getSubscriptionPage: (req, res) => {
    res.render("contact");
  },

  new: (req, res) => {
    res.render("users/signup");
  },

  create: (req, res, next) => {
    let userParams = getUserParams(req.body);
    User.create(userParams)
      .then((user) => {
        // res.flash("success", `${user.username}'s successfully created`);
        res.locals.redirect = "/users";
        res.locals.user = user;
        next();
      })
      .catch((error) => {
        console.log(`Error saving user: ${error.message}`);
        next(error);
      });
  },

  getUserUpdateForm: (req, res, next) => {
    let userID = req.params.id;
    User.findById(userID)
      .then((user) => {
        res.render("users/update", { user: user });
      })
      .catch((error) => {
        console.log(`erro fetching user by ID: ${error.message}`);
        next(error);
      });
  },

  // WIP
  updateUser: (req, res, next) => {
    let userId = req.params.id;
    console.log(userId);
    let updatedUserParams = getUserParams(req.body);
    User.findByIdAndUpdate(userId, {
      $set: updatedUserParams,
    })
      .then((user) => {
        res.locals.redirect = `/users/${user._id}`;
        console.log(user._id);
        res.locals.user = user;
        next();
      })
      .catch((error) => {
        console.log(`Error updating subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  // WIP
  deleteUser: async (req, res) => {
    let userId = req.params.id;
    User.findByIdAndRemove(userId)
      .then(() => {
        res.redirect("/users");
      })
      .catch((error) => {
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
};
