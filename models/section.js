const mongoose = require("mongoose");
const MaterialId = mongoose.Schema.Types.ObjectId;

const SectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  materials: [
    {
      type: MaterialId,
      ref: "Material"
    }
  ],
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Section", SectionSchema);
