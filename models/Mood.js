/*const mongoose = require("mongoose");

const MoodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: Date,
  mood: String, // Happy, Sad, Anxious, etc.
});

module.exports = mongoose.model("Mood", MoodSchema);
*/
const mongoose = require("mongoose");

const MoodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  mood: {
    type: String,
    required: true
  },
  journal: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Mood", MoodSchema);
