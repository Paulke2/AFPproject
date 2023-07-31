const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    scope: String,
    projectID: { type: String, required: true },
    TurnoverDate:String,
    location: String,
    ContractWith:String,
    Amount:String,
    comments:[String]
  }
);

module.exports = mongoose.model("Project", projectSchema);