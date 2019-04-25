const mongoose = require("mongoose");
const ContentId = mongoose.Schema.Types.ObjectId;

const SectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
    required: true
  },
  contents: [
    {
      type: ContentId,
      ref: "Content"
    }
  ]
});

module.exports = mongoose.model("Section", SectionSchema);
