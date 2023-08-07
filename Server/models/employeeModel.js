const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema(
    {
      employeeName:String,
      officeWorker:Boolean,
      officeWorkerHours:Number,
      timeCards: [{ type: mongoose.Schema.Types.ObjectId, ref: "TimeCard" }]
    }
  
  );
  module.exports = mongoose.model("Employee", employeeSchema);