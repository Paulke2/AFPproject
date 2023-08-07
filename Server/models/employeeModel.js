const mongoose = require("mongoose");
const TimeCardSchema = require("./timeCardModel.js"); // Assuming the TimeCardSchema is in a separate file

const employeeSchema = new mongoose.Schema({
  employeeName: String,
  officeWorker: Boolean,
  officeWorkerHours: Number,
  timeCards: [{ type: mongoose.Schema.Types.ObjectId, ref: "TimeCard" }],
  currentTimeCard: { type: mongoose.Schema.Types.ObjectId, ref: "TimeCard" }
});

module.exports = mongoose.model("Employee", employeeSchema);