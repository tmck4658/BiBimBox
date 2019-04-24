const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const Folder = require("../models/folder");
const Material = require("../models/material");
const User = require("../models/User");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// User my project page
router.get("/", ensureAuthenticated, function(req, res) {
  User.findOne(req.user._id)
    .populate({ path: "projects", model: "Project" })
    .exec(function(err, user) {
      if (err) {
        res.status(500).send("Could not fetch user data");
      } else {
        curUser = user;
        res.render("project-projects", {
          user: user
        });
      }
    });
});

// Renders Project files (where all the folders are)
router.get("/:projectId", ensureAuthenticated, function(req, res) {
  Project.findOne({ _id: req.params.projectId })
    .populate({ path: "folders", model: "Folder" })
    .exec(function(err, foundProject) {
      if (err) {
        res.status(500).send("Could not find your project" + err);
      } else {
        res.render("project-folders", {
          project: foundProject,
          user: req.user
        });
      }
    });
});

//create folders
router.post("/new-folder/:projectId", function(req, res) {
  let folderBody = new Folder();
  (folderBody.parentProject = req.params.projectId),
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

//#region Project Delete Requests
//Delete Project
router.delete("/delete/:projectId", function(req, res) {
  Project.deleteOne({ _id: req.params.projectId }, function(
    err,
    deletedProject
  ) {
    if (err) {
      res.status(500).send("Could not remove project: " + err);
    } else {
      //when project is deleted, delete all folders inside the projects
      deleteFolder(req.params.projectId);
      res.send(req.params.projectId);
    }
  });
});

//Delete Folders
function deleteFolder(projectId) {
  //When each folder is deleted, delete all materials inside
  Folder.deleteMany({ parentProject: projectId }).then(
    deleteMaterial(projectId)
  );
}

//Delete Materials
function deleteMaterial(projectId) {
  //Console Log that the process is done
  Material.deleteMany({ parentProject: projectId }).then(console.log("Done"));
}
//#endregion End of the Project Delete Request

module.exports = router;
