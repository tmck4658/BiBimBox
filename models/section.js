const mongoose = require("mongoose");
const MaterialId = mongoose.Schema.Types.ObjectId;

const SectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
    required: true
  },
  materials: [
    {
      type: MaterialId,
      ref: "Material"
    }
  ]
});

module.exports = mongoose.model("Section", SectionSchema);
