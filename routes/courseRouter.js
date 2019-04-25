const express = require("express");
const router = express.Router();
const Course = require("../models/course");
const User = require("../models/User");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// User my course page
router.get("/", ensureAuthenticated, function(req, res) {
  User.findOne(req.user._id)
    .populate({ path: "courses", model: "Course" })
    .exec(function(err, user) {
      if (err) {
        res.status(500).send("Could not fetch user data");
      } else {
        curUser = user;
        res.render("course-courses", {
          user: user
        });
      }
    });
});

// Renders course sections (where all the sections are)
router.get("/:courseId", ensureAuthenticated, function(req, res) {
  Course.findOne({ _id: req.params.courseId })
    .populate({ path: "sections", model: "Section" })
    .exec(function(err, foundCourse) {
      if (err) {
        res.status(500).send("Could not find your section" + err);
      } else {
        res.render("course-sections", {
          course: foundCourse,
          user: req.user
        });
      }
    });
});

//add Courses to the user
router.post("/new-course/:userId", function(req, res) {
  let courseBody = new Course();
  (courseBody.courseName = req.body.cTitle),
    (courseBody.description = req.body.cDescription);
  courseBody.save(function(err, savedCourse) {
    if (err) {
      res.status(500).send({ error: "Could not save Course" + err });
    } else {
      User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { courses: savedCourse._id } },
        function(err, user) {
          if (err) {
            res.status(500).send({ error: "Could Not Add The Course" + err });
          } else {
            //res.send(user);
            res.redirect("/my-courses");
          }
        }
      );
    }
  });
});

module.exports = router;
