const mongoose = require("mongoose");
const ObjId = mongoose.Schema.Types.ObjectId;

//creating schema for the mongo database
//privileges 0 = admin, 1 = staff, 2 = "", 3 = public
const UserSchema = new mongoose.Schema({
  privileges: {
    type: Number,
    required: true,
    default: 3
  },
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
