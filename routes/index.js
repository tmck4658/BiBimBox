const express = require("express");
const router = express.Router();
const courses = require("../models/course");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("home"));

// Dashboard
router.get("/main", ensureAuthenticated, (req, res) =>
  courses.find({}, function(err, courseData) {
    if (err) {
      res.status(500).send("Could not fetch data for this page");
    } else {
      res.render("main", {
        user: req.user,
        course: courseData
      });
    }
  })
);

module.exports = router;
