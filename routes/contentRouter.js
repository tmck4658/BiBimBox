const express = require("express");
const router = express.Router();
const Content = require("../models/content");
const Section = require("../models/section");

//#region post requests
router.post("/add/:sectionId", function(req, res) {
  let contentBody = new Content();
  (contentBody.contentName = req.body.cName),
    (contentBody.url = req.body.cUrl),
    (contentBody.text = req.body.cText);
  contentBody.save(function(err, savedContent) {
    if (err) {
      res.status(500).send({ error: "Could not save content" + err });
    } else {
      Section.findByIdAndUpdate(
        { _id: req.params.sectionId },
        { $addToSet: { contents: savedContent._id } },
        function(err, UpdatedSection) {
          if (err) {
            res.status(500).send({ error: "Could Not Add The Project" + err });
          } else {
            res.status(200).send(UpdatedSection);
          }
        }
      );
    }
  });
});
//#endregion end of post

module.exports = router;
