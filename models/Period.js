const mongoose = require("mongoose");

const PeriodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  lastPeriodDate: { type: Date, required: true },
  flowType: { type: String, enum: ["Light", "Medium", "Heavy"], required: true },
  symptoms: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model("Period", PeriodSchema);
