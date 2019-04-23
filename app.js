//#region imports
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
// Upload file imports
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
//#endregion end of imports

const app = express();

// Passport Config
require("./config/passport")(passport);

//#region Connecting to database (MongoDB Atlas)
// Grabbing key
const db = require("./config/keys").mongoURI;

// Setting the refference to the connection
const conn = mongoose.connection;

// Rerouting the database so that we can access MongoFB to user instead admin
// "mongodb+srv" protocol the default to admin and Admin is not allowed in MongoDB Atlas
conn.on("connected", function() {
  if (conn.client.s.url.startsWith("mongodb+srv")) {
    conn.db = conn.client.db("bibimbox");
  }
  console.log("Rerouting Atlas collection: Complete.");
});

// Connect to MongoDB using mongoose
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Atlas: Connected"))
  .catch(err => console.log(err));

//#endregion end of Connecting database

//#region Middleware config
// EJS (handles the front end)
app.use(express.static("./public"));
app.set("view engine", "ejs");

// Express body parser (parses json body)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

//gridfs stream middleware (to retreave file from DB)
app.use(methodOverride("_method"));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
//#endregion end of Middleware config

//#region Connect flash
app.use(flash());
//#endregion end of Connection flesh

//#region Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
//#endregion end of Global variables

//#region File Uploading Config
// Init gfs
let gfs;

conn.once("open", () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Create storage engine
const storage = new GridFsStorage({
  url: db,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// @route POST /upload
// @desc  Uploads file to DB
app.post("/uploads", upload.single("file"), (req, res) => {
  //res.json({ file: req.file });
  //res.redirect("/main");
  res.send({ file: req.file });
});
//#endregion

//#region Routes
app.use("/", require("./routes/dashboard.js"));
app.use("/users", require("./routes/users.js"));
app.use("/courses", require("./routes/courseRouter.js"));
app.use("/my-projects", require("./routes/projectRouter"));
app.use("/sections", require("./routes/sectionRouter.js"));
app.use("/my-projects/folders", require("./routes/folderRouter.js"));
app.use("/materials", require("./routes/materialRouter.js"));
//app.use("/uploads", require("./routes/uploadRouter"));
//#endregion end of routes

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
