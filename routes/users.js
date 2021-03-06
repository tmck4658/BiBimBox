const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
// Load User model
const projects = require("../models/project");
const User = require("../models/User");
const { forwardAuthenticated } = require("../config/auth");

//add project to the user
router.post("/new-project/:userId", function(req, res) {
  let projectBody = new projects();
  (projectBody.projectName = req.body.pTitle),
    (projectBody.description = req.body.pDescription);
  projectBody.save(function(err, savedProject) {
    if (err) {
      res.status(500).send({ error: "Could not save Project" + err });
    } else {
      User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { projects: savedProject._id } },
        function(err, user) {
          if (err) {
            res.status(500).send({ error: "Could Not Add The Project" + err });
          } else {
            //res.send(user);
            res.redirect("/my-projects");
          }
        }
      );
    }
  });
});

// Login Page
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// Register Page
router.get("/register", forwardAuthenticated, (req, res) =>
  res.render("register")
);

// Register
router.post("/register", (req, res) => {
  const { fName, lName, email, password, password2 } = req.body;
  let errors = [];

  if (!fName || !lName || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      fName,
      lName,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("register", {
          errors,
          fName,
          lName,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          fName,
          lName,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/login");
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/my-projects",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;
