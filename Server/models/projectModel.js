const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    projectID: { type: Number, required: true },
    location: String
  }
);

module.exports = mongoose.model("Project", projectSchema);