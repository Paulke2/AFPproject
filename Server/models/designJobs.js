const mongoose = require("mongoose");
const designJobSchema = new mongoose.Schema(
    {
      projectName:String,
      dueDate:String,
      estimatedTime:String,
      priority:Number,
      assignedTo:String,
      currentContainer:String,
      comments:[String]
      
    }
  
  );
  module.exports = mongoose.model("designJob", designJobSchema);