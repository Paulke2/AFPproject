const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema(
    {
      employeeName:String,
      officeWorker:Boolean,
      officeWorkerHours:Number,
      timeCards: [String]
    }
  
  );
  module.exports = mongoose.model("Employee", employeeSchema);