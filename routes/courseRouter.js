const express = require("express");
const router = express.Router();
const course = require("../models/course");

router.get("/", function(req, res) {
  course.find({}, function(err, courses) {
    if (err) {
      res.status(500).send("Could not fetch course data");
    } else {
      res.send(courses);
    }
  });
});

//#region post requests
router.post("/", function(req, res) {
  let coursesBody = new course();
  (coursesBody.title = req.body.title),
    (coursesBody.sections = req.body.sections),
    (coursesBody.description = req.body.description);
  coursesBody.save(function(err, savedCourse) {
    if (err) {
      res.status(500).send({ error: "Could not save Course" });
    } else {
      res.status(200).send(savedCourse);
    }
  });
});
//#endregion end of post

module.exports = router;
