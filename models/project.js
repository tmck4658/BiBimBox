const mongoose = require("mongoose");
const FolderId = mongoose.Schema.Types.ObjectId;

const ProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true
  },
  folders: [
    {
      type: FolderId,
      ref: "Folder"
    }
  ],
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Project", ProjectSchema);
