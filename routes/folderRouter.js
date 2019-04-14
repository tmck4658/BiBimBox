const express = require("express");
const router = express.Router();
const folder = require("../models/folder");

router.get("/", function(req, res) {
  folder.find({}, function(err, folders) {
    if (err) {
      res.status(500).send("Could not fetch folder data");
    } else {
      res.send(folders);
    }
  });
});

module.exports = router;
