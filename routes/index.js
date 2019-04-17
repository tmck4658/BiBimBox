const express = require("express");
const router = express.Router();
const courses = require("../models/course");
const projects = require("../models/project");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Promises

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("home"));

// User home page
router.get("/main", ensureAuthenticated, (req, res) =>
  projects.find({}, function(err, projectData) {
    if (err) {
      res.status(500).send("Could not fetch data for this page");
    } else {
      res.render("main", {
        user: req.user,
        project: projectData
      });
    }
  })
);

module.exports = router;
