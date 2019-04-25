const express = require("express");
const router = express.Router();
const Content = require("../models/content");

//#region post requests
router.post("/add/:sectionId", function(req, res) {
  let contentBody = new Content();
  (contentBody.url = req.body.cUrl), (contentBody.text = req.body.cText);
  contentBody.save(function(err, savedContent) {
    if (err) {
      res.status(500).send({ error: "Could not save content" + err });
    } else {
      res.status(200).send(savedContent);
    }
  });
});
//#endregion end of post

module.exports = router;
