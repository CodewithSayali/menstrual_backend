/*const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reminderDate: Date,
  message: String,
});

module.exports = mongoose.model("Reminder", ReminderSchema);
*/
/*
const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
  dateTime: { type: Date, required: true },
  note: { type: String, required: true },
  //notified: { type: Boolean, default: false }
});

module.exports = mongoose.model("Reminder", ReminderSchema);
*/
const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
  dateTime: { type: Date, required: true },
  note: { type: String, required: true },
  userId: { type: String, required: true }, // ✅ Associate reminder with user
});

module.exports = mongoose.model("Reminder", ReminderSchema);
