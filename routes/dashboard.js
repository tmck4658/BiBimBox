const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
// Promises

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("home"));

module.exports = router;
