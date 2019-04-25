const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
  contentName: {
    type: String,
    required: true
  },
  url: {
    type: String,
    default: "No URL"
  },
  text: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model("Content", ContentSchema);
