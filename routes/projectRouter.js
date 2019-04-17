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

//#region post requests
router.post("/newProjects", function(req, res) {
  let projectBody = new project();
  (projectBody.projectName = req.body.pTitle),
    (projectBody.description = req.body.pDescription);
  projectBody.save(function(err, savedProject) {
    if (err) {
      res.status(500).send({ error: "Could not save Project" + err });
    } else {
      console.log("project created");
      res.redirect("/main");
    }
  });
});
//#endregion end of post

module.exports = router;
