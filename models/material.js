const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, default: "No URL" },
  description: { type: String, default: "No description" }
});

module.exports = mongoose.model("Material", MaterialSchema);
