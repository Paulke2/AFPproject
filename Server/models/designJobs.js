const mongoose = require("mongoose");
const designJobSchema = new mongoose.Schema(
    {
      projectName:String,
      dueDate:String,
      estimatedTime:String,
      priority:Number,
      assignedTo:String,
      comments:[String]
      
    }
  
  );
  module.exports = mongoose.model("designJob", designJobSchema);