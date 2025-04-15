const express = require("express");
const authenticateUser = require("../middleware/auth");
const Period = require("../models/Period");
const router = express.Router();

// ✅ Log Period Data (Protected Route)
router.post("/log", authenticateUser, async (req, res) => {
  try {
    console.log("🔹 req.user in Log Route:", req.user); // Debugging

    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized: User ID not found" });
    }

    const { lastPeriodDate, flowType, symptoms } = req.body;
    if (!lastPeriodDate || !flowType) {
      return res.status(400).json({ message: "Please provide lastPeriodDate and flowType" });
    }

    const newEntry = new Period({
      userId: req.user.userId,
      lastPeriodDate,
      flowType,
      symptoms: symptoms || [],
    });

    await newEntry.save();
    res.status(201).json({ message: "Period data saved successfully", period: newEntry });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Fetch User's Period History (Protected Route)
router.get("/", authenticateUser, async (req, res) => {
  try {
    console.log("🔹 req.user in History Route:", req.user); // Debugging

    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized: User ID not found" });
    }

    const history = await Period.find({ userId: req.user.userId });

    if (!history.length) {
      return res.status(404).json({ message: "No period history found" });
    }

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
