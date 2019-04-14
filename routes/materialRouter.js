const express = require("express");
const router = express.Router();
const material = require("../models/material");

//#region get requests
router.get("/", function(req, res) {
  material.find({}, function(err, materials) {
    if (err) {
      res.status(500).send({ error: "Could not fetch materials data" });
    } else {
      res.send(materials);
    }
  });
});
//#endregion end of get

//#region post requests
router.post("/", function(req, res) {
  let materialBody = new material();
  (materialBody.title = req.body.title),
    (materialBody.url = req.body.url),
    (materialBody.description = req.body.description);
  materialBody.save(function(err, savedMaterial) {
    if (err) {
      res.status(500).send({ error: "Could not save material" + err });
    } else {
      res.status(200).send(savedMaterial);
    }
  });
});
//#endregion end of post

module.exports = router;
