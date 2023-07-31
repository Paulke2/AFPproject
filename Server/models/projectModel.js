const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    scope: String,
    projectID: { type: String, required: true },
    turnoverDate:String,
    location: String,
    contractWith:String,
    amount:String,
    comments:[String]
  }
);

module.exports = mongoose.model("Project", projectSchema);