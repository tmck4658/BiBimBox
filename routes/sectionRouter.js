const express = require("express");
const router = express.Router();
const Section = require("../models/section");
const Course = require("../models/course");

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
router.post("/new-section/:courseId", function(req, res) {
  let sectionBody = new Section();
  (sectionBody.sectionName = req.body.sTitle),
    sectionBody.save(function(err, savedSection) {
      if (err) {
        res.status(500).send({ error: "Could not save Section" });
      } else {
        Course.findByIdAndUpdate(
          { _id: req.params.courseId },
          { $addToSet: { sections: savedSection._id } },
          function(err, UpdatedCourse) {
            if (err) {
              res
                .status(500)
                .send({ error: "Could Not Add The Project" + err });
            } else {
              //res.send(Updatedproject);
              res.redirect("/my-courses/" + req.params.courseId);
            }
          }
        );
      }
    });
});
//#endregion end of post

module.exports = router;
