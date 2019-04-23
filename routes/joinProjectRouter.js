const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
//return all projects in database
router.get("/", function(req, res) {
  Project.find({}, function(err, foundProjects) {
    if (err) {
      res.status(500).send("Could not fetch project data");
    } else {
      res.render("project-join", {
        project: foundProjects,
        user: req.user
      });
    }
  });
});

module.exports = router;
