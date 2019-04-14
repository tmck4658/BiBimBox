const mongoose = require("mongoose");
const MaterialId = mongoose.Schema.Types.ObjectId;

const FolderSchema = new mongoose.Schema({
  folderName: {
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

module.exports = mongoose.model("Folder", FolderSchema);
