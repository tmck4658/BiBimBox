const mongoose = require("mongoose");
const ObjId = mongoose.Schema.Types.ObjectId;

//creating schema for the mongo database
const UserSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true
  },
  lName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  courses: [
    {
      type: ObjId,
      ref: "Course"
    }
  ],
  projects: [
    {
      type: ObjId,
      ref: "Project"
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);
