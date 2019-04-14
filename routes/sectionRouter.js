const express = require("express");
const router = express.Router();
const section = require("../models/section");

//#region get requests
router.get("/", function(req, res) {
  section.find({}, function(err, sections) {
    if (err) {
      res.status(500).send({ error: "Could not fetch data" });
    } else {
      res.send(sections);
    }
  });
});
//#endregion end of get

//#region post requests
router.post("/", function(req, res) {
  let sectionBody = new section();
  (sectionBody.title = req.body.title),
    (sectionBody.materials = req.body.materials),
    (sectionBody.description = req.body.description);
  sectionBody.save(function(err, savedSection) {
    if (err) {
      res.status(500).send({ error: "Could not save Section" });
    } else {
      res.status(200).send(savedSection);
    }
  });
});
//#endregion end of post

module.exports = router;
