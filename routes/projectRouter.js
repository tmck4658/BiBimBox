const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const Folder = require("../models/folder");
const User = require("../models/User");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
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
  Project.findOne({ _id: req.params.projectId })
    .populate({ path: "folders", model: "Folder" })
    .exec(function(err, foundProject) {
      if (err) {
        res.status(500).send("Could not find your project" + err);
      } else {
        res.render("my-project", {
          project: foundProject,
          user: req.user
        });
      }
    });
});

//create folders
router.post("/new-folder/:projectId", function(req, res) {
  let folderBody = new Folder();
  (folderBody.folderName = req.body.fTitle),
    (folderBody.description = req.body.fDescription);
  folderBody.save(function(err, savedFolder) {
    if (err) {
      res.status(500).send({ error: "Could not save Project" + err });
    } else {
      Project.findByIdAndUpdate(
        { _id: req.params.projectId },
        { $addToSet: { folders: savedFolder._id } },
        function(err, Updatedproject) {
          if (err) {
            res.status(500).send({ error: "Could Not Add The Project" + err });
          } else {
            //res.send(Updatedproject);
            res.redirect("/my-projects/" + req.params.projectId);
          }
        }
      );
    }
  });
});

module.exports = router;
