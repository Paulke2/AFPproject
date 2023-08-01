const mongoose = require("mongoose");
const timeCardSchema = new mongoose.Schema(
  {
    Sunday:String,
    Monday:String,
    Tuesday:String,
    Wednesday:String,
    Thursday:String,
    Friday:String,
    Saturday:String,
    employeeName:String,
    totalHours:number

  }

);
module.exports = mongoose.model("timeCard", timeCardSchema);