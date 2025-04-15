const express = require("express");
const Symptom = require("../models/Symptom");
const auth = require("../middleware/auth");

const router = express.Router();

// ✅ Log New Symptoms
router.post("/log", auth, async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({ message: "Please provide symptoms" });
    }

    const newSymptom = new Symptom({
      userId: req.user._id,
      symptoms,
      date: new Date(),
    });

    await newSymptom.save();
    res.status(201).json({ message: "Symptoms logged successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ Get Past Symptom Records
router.get("/history", auth, async (req, res) => {
  try {
    const symptoms = await Symptom.find({ userId: req.user._id }).sort({ date: -1 });

    if (!symptoms.length) {
      return res.status(404).json({ message: "No symptom data found" });
    }

    res.json(symptoms);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
