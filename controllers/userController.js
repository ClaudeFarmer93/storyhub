const mongoose = require("mongoose");
const User = require("../models/user");
const passport = require("passport");
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
  authenticate: passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: "Failed to login.",
    successRedirect: "/",
    successFlash: "Logged in!",
  }),

  logout: (req, res, next) => {
    req.logout((error) => {
      if (error) {
        return next(error);
      }
      req.flash("success", "You have been logged out!");
      res.locals.redirect = "/";
      next();
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
    if (req.skip) next();
    let newUser = new User(getUserParams(req.body));
    User.register(newUser, req.body.password, (error, user) => {
      if (user) {
        req.flash("success", `${user.username}'s successfully created`);
        res.locals.redirect = "/users";
        next();
      } else {
        req.flash(
          "error",
          `Failed to create user account because: ${error.message}`
        );
        res.locals.redirect = "/users/signup";
        next();
      }
    });
  },

  getUserUpdateForm: (req, res, next) => {
    let userID = req.params.id;
    User.findById(userID)
      .then((user) => {
        res.render("users/update", { user: user });
      })
      .catch((error) => {
        main;
        next(error);
      });
  },

  // WIP
  updateUser: (req, res, next) => {
    let userId = req.params.id;
    main;
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
