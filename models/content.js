const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
  url: {
    type: String,
    default: "No URL"
  },
  text: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Content", ContentSchema);
