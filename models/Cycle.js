/*const mongoose = require("mongoose");

const CycleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  startDate: { type: Date, required: true }, // Start of the period
  cycleLength: { type: Number, required: true }, // User's cycle length (in days)
});

module.exports = mongoose.model("Cycle", CycleSchema);
*/

/*
const mongoose = require("mongoose");

const CycleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  periods: { type: [Date], default: [] }, // Store multiple period dates
  cycleLength: { type: Number, required: true, default: 28 },
});

module.exports = mongoose.model("Cycle", CycleSchema);
*/

const mongoose = require("mongoose");

const CycleSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // To associate periods with users
  periods: [{ type: Date, required: true }], // List of logged period dates
  cycleLength: { type: Number, default: 28 }, // Menstrual cycle length
});

module.exports = mongoose.model("Cycle", CycleSchema);
