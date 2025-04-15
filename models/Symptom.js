const mongoose = require("mongoose");

const SymptomSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now }, // Date of symptom entry
  symptoms: [String], // List of symptoms (e.g., ["Cramps", "Headache"])
});

module.exports = mongoose.model("Symptom", SymptomSchema);
