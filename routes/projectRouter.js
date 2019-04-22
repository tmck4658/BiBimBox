const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const User = require("../models/User");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

let curUser;

//return all projects in database
router.get("/projects", function(req, res) {
  project.find({}, function(err, projects) {
    if (err) {
      res.status(500).send("Could not fetch project data");
    } else {
      res.send(projects);
    }
  });
});

// User my project page
router.get("/", ensureAuthenticated, function(req, res) {
  User.findOne(req.user._id)
    .populate({ path: "projects", model: "Project" })
    .exec(function(err, user) {
      if (err) {
        res.status(500).send("Could not fetch user data");
      } else {
        curUser = user;
        res.render("project-dashboard", {
          user: user
        });
      }
    });
});

router.get("/:projectId", ensureAuthenticated, function(req, res) {
  Project.findOne({ _id: req.params.projectId }, function(err, foundProject) {
    if (err) {
      res.status(500).send("Could not find your project" + err);
    } else {
      res.render("my-project", {
        project: foundProject,
        user: curUser
      });
    }
  });
});

module.exports = router;
