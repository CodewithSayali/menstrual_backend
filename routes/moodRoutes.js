/*const express = require("express");
const Mood = require("../models/Mood");
const auth = require("../middleware/auth");

const router = express.Router();

// ✅ Add Mood Entry
router.post("/log", auth, async (req, res) => {
  try {
    const { mood, date } = req.body;

    if (!mood || !date) {
      return res.status(400).json({ message: "Please provide mood and date" });
    }

    const newMood = new Mood({ userId: req.user._id, mood, date });
    await newMood.save();
    res.status(201).json({ message: "Mood logged successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ Get User Mood Logs
router.get("/", auth, async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.user._id });

    if (!moods.length) {
      return res.status(404).json({ message: "No mood logs found" });
    }

    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
*/

/*
const express = require("express");
const Mood = require("../models/Mood");
const auth = require("../middleware/auth");

const router = express.Router();

// ✅ Add Mood Entry
router.post("/log", auth, async (req, res) => {
  try {
    const { mood, date } = req.body;

    if (!mood) {
      return res.status(400).json({ message: "Mood is required" });
    }

    const newMood = new Mood({
      userId: req.user._id,
      mood,
      date: date || new Date(), // Use provided date or default to today
    });

    await newMood.save();
    res.status(201).json({ message: "Mood logged successfully", mood: newMood });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ Get All User Mood Logs (Sorted by Date)
router.get("/", auth, async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.user._id }).sort({ date: -1 }); // Newest first

    if (!moods.length) {
      return res.status(404).json({ message: "No mood logs found" });
    }

    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ Get Mood History (Last 7 Days)
router.get("/history", auth, async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7); // 7 days back

    const moods = await Mood.find({
      userId: req.user._id,
      date: { $gte: sevenDaysAgo }, // Get moods from last 7 days
    }).sort({ date: -1 });

    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
*/

/*
const express = require("express");
const Mood = require("../models/Mood");
const auth = require("../middleware/auth");

const router = express.Router();

// ✅ Add Mood Entry
router.post("/log", auth, async (req, res) => {
  try {
    const { mood, date } = req.body;

    if (!mood) {
      return res.status(400).json({ message: "Mood is required" });
    }

    const newMood = new Mood({
      userId: req.user._id,
      mood,
      date: date ? new Date(date).toISOString() : new Date().toISOString(), // Ensure proper date format
    });

    await newMood.save();
    res.status(201).json({ message: "Mood logged successfully", mood: newMood });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message }); // Fix error handling
  }
});

// ✅ Get All User Mood Logs (Sorted by Date)
router.get("/", auth, async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.user._id }).sort({ date: -1 });

    if (!moods.length) {
      return res.status(404).json({ message: "No mood logs found" });
    }

    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message }); // Fix error handling
  }
});

// ✅ Get Mood History (Last 7 Days)
router.get("/history", auth, async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const moods = await Mood.find({
      userId: req.user._id,
      date: { $gte: sevenDaysAgo.toISOString() }, // Ensure proper date filtering
    }).sort({ date: -1 });

    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message }); // Fix error handling
  }
});

module.exports = router;
*/
/*
const express = require("express");
const Mood = require("../models/Mood");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

// Log Mood
router.post("/log", authMiddleware, async (req, res) => {
  console.log("➡️ Mood Log Request Received:", req.body); // Debugging

  const { mood, journal } = req.body;
  if (!mood) return res.status(400).json({ message: "Mood is required" });

  try {
    const newMood = new Mood({ mood, journal, date: new Date() });
    await newMood.save();
    res.json({ message: "Mood logged successfully!", mood: newMood });
  } catch (error) {
    console.error("❌ Database Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch Mood History
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const moods = await Mood.find().sort({ date: -1 }).limit(7);
    res.json(moods);
  } catch (error) {
    console.error("❌ Error fetching mood history:", error);
    res.status(500).json({ message: "Error fetching mood history" });
  }
});

module.exports = router;
*/
/*
const express = require("express");
const Mood = require("../models/Mood");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

// Log Mood
router.post("/log", authMiddleware, async (req, res) => {
  console.log("➡️ Mood Log Request Received:", req.body); // Debugging

  const { mood, journal } = req.body;
  console.log("➡️ Extracted UserId:", req.user?.userId);
  const userId = req.user?.userId;  // Get userId from authenticated request

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  if (!mood) {
    return res.status(400).json({ message: "Mood is required" });
  }

  try {
    const newMood = new Mood({ userId, mood, journal, date: new Date() });
    await newMood.save();
    res.json({ message: "Mood logged successfully!", mood: newMood });
  } catch (error) {
    console.error("❌ Database Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Fetch Mood History
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId; // Ensure user-specific history
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const moods = await Mood.find({ userId }).sort({ date: -1 }).limit(7);
    res.json(moods);
  } catch (error) {
    console.error("❌ Error fetching mood history:", error);
    res.status(500).json({ message: "Error fetching mood history" });
  }
});

module.exports = router;
*/

const express = require("express");
const Mood = require("../models/Mood");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

// Log Mood
router.post("/log", authMiddleware, async (req, res) => {
  console.log("➡️ Mood Log Request Received:", req.body);

  const { mood, journal } = req.body;
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: User ID is missing" });
  }
  if (!mood) {
    return res.status(400).json({ message: "Mood is required" });
  }

  try {
    const newMood = new Mood({ userId, mood, journal, date: new Date() });
    await newMood.save();
    res.status(201).json({ message: "Mood logged successfully!", mood: newMood });
  } catch (error) {
    console.error("❌ Database Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// Fetch Mood History
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID is missing" });
    }

    const moods = await Mood.find({ userId }).sort({ date: -1 }).limit(7);
    if (!moods.length) {
      return res.status(404).json({ message: "No mood history found" });
    }
    res.json(moods);
  } catch (error) {
    console.error("❌ Error fetching mood history:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// Delete Mood
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.userId;
    const moodId = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID is missing" });
    }

    const deletedMood = await Mood.findOneAndDelete({ _id: moodId, userId });
    if (!deletedMood) {
      return res.status(404).json({ message: "Mood not found or you don't have permission to delete it" });
    }

    res.json({ message: "Mood deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting mood:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
