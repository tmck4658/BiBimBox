const mongoose = require("mongoose");
const SectionId = mongoose.Schema.Types.ObjectId;

const CourseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true
  },
  sections: [
    {
      type: SectionId,
      ref: "Section"
    }
  ],
  description: {
    type: String,
    default: "No description"
  }
});

module.exports = mongoose.model("Course", CourseSchema);
