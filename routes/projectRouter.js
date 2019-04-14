const express = require("express");
const router = express.Router();
const project = require("../models/project");

router.get("/", function(req, res) {
  project.find({}, function(err, projects) {
    if (err) {
      res.status(500).send("Could not fetch project data");
    } else {
      res.send(projects);
    }
  });
});

module.exports = router;
