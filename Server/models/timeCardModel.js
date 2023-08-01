const mongoose = require("mongoose");
const TimeCardSchema = new mongoose.Schema(
  {
    startOfWeek:String,
    Sunday:String,
    Monday:String,
    Tuesday:String,
    Wednesday:String,
    Thursday:String,
    Friday:String,
    Saturday:String,
    employeeName:String,
    totalHours:Number

  }

);
module.exports = mongoose.model("TimeCard", TimeCardSchema);