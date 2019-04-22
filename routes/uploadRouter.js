//#region imports
const express = require("express");
const router = express.Router();

const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

//#endregion end of the import

module.exports = router;
