const express = require("express");
const router = express.Router();
const Folder = require("../models/folder");
const Material = require("../models/material");

const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

router.get("/:folderId", ensureAuthenticated, function(req, res) {
  Folder.findOne({ _id: req.params.folderId })
    .populate({ path: "materials", model: "Material" })
    .exec(function(err, foundFolder) {
      if (err) {
        res.status(500).send("Could not find your folder" + err);
      } else {
        res.render("project-contents", {
          folder: foundFolder,
          user: req.user
        });
      }
    });
});

//add content
router.post("/add/:folderId", function(req, res) {
  let materialBody = new Material();
  (materialBody.title = req.body.mTitle),
    (materialBody.url = req.body.yLink),
    (materialBody.description = req.body.mDescription);
  materialBody.save(function(err, savedMaterial) {
    if (err) {
      res.status(500).send({ error: "Could not save Project" + err });
    } else {
      Folder.findByIdAndUpdate(
        { _id: req.params.folderId },
        { $addToSet: { materials: savedMaterial._id } },
        function(err, UpdatedFolder) {
          if (err) {
            res.status(500).send({ error: "Could Not Add The Project" + err });
          } else {
            //res.send(Updatedproject);
            res.redirect("/my-projects/folders/" + req.params.folderId);
          }
        }
      );
    }
  });
});

module.exports = router;
