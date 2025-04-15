/*const express = require("express");
const Cycle = require("../models/Cycle");
const auth = require("../middleware/auth");

const router = express.Router();

// ✅ Log New Cycle Entry
router.post("/log", auth, async (req, res) => {
  try {
    const { startDate, cycleLength } = req.body;

    if (!startDate || !cycleLength) {
      return res.status(400).json({ message: "Please provide all details" });
    }

    const newCycle = new Cycle({
      userId: req.user._id,
      startDate,
      cycleLength,
    });

    await newCycle.save();
    res.status(201).json({ message: "Cycle data saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ Get Past Cycle Records
router.get("/history", auth, async (req, res) => {
  try {
    const cycles = await Cycle.find({ userId: req.user._id }).sort({ startDate: -1 });

    if (!cycles.length) {
      return res.status(404).json({ message: "No cycle data found" });
    }

    res.json(cycles);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ Predict Next Period Start Date
router.get("/predict", auth, async (req, res) => {
  try {
    const lastCycle = await Cycle.findOne({ userId: req.user._id }).sort({ startDate: -1 });

    if (!lastCycle) {
      return res.status(404).json({ message: "No past cycles found" });
    }

    const lastStartDate = new Date(lastCycle.startDate);
    const predictedNextStart = new Date(lastStartDate);
    predictedNextStart.setDate(lastStartDate.getDate() + lastCycle.cycleLength);

    res.json({ nextPeriodStart: predictedNextStart.toISOString().split("T")[0] });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
*/




/*
const express = require("express");
const Cycle = require("../models/Cycle");
const Period = require("../models/Period");  // Added Period model for flow data
const auth = require("../middleware/auth");

const router = express.Router();

// ✅ Log New Cycle Entry
router.post("/log", auth, async (req, res) => {
  try {
    const { startDate, cycleLength } = req.body;

    if (!startDate || !cycleLength) {
      return res.status(400).json({ message: "Please provide all details" });
    }

    const newCycle = new Cycle({
      userId: req.user._id,
      startDate,
      cycleLength,
    });

    await newCycle.save();
    res.status(201).json({ message: "Cycle data saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Get Past Cycle Records
router.get("/history", auth, async (req, res) => {
  try {
    const cycles = await Cycle.find({ userId: req.user._id }).sort({ startDate: -1 });

    if (!cycles.length) {
      return res.status(404).json({ message: "No cycle data found" });
    }

    res.json(cycles);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Predict Next Period Start Date
router.get("/predict", auth, async (req, res) => {
  try {
    const lastCycle = await Cycle.findOne({ userId: req.user._id }).sort({ startDate: -1 });

    if (!lastCycle) {
      return res.status(404).json({ message: "No past cycles found" });
    }

    const lastStartDate = new Date(lastCycle.startDate);
    const predictedNextStart = new Date(lastStartDate);
    predictedNextStart.setDate(lastStartDate.getDate() + lastCycle.cycleLength);

    res.json({ nextPeriodStart: predictedNextStart.toISOString().split("T")[0] });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ New Route: Get Cycle Data for Dashboard
router.get("/cycle-data", auth, async (req, res) => {
  try {
    const lastCycle = await Cycle.findOne({ userId: req.user._id }).sort({ startDate: -1 });

    if (!lastCycle) {
      return res.json({ nextPeriod: "Unknown", currentPhase: "Unknown" });
    }

    const cycleLength = lastCycle.cycleLength || 28;
    const lastDate = new Date(lastCycle.startDate);
    const nextDate = new Date(lastDate);
    nextDate.setDate(lastDate.getDate() + cycleLength);

    const today = new Date();
    const daysSinceLastPeriod = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
    let currentPhase = "Unknown";

    if (daysSinceLastPeriod <= 5) currentPhase = "Menstrual Phase";
    else if (daysSinceLastPeriod <= 14) currentPhase = "Follicular Phase";
    else if (daysSinceLastPeriod <= 21) currentPhase = "Ovulation";
    else currentPhase = "Luteal Phase";

    res.json({
      nextPeriod: nextDate.toISOString().split("T")[0],
      currentPhase,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ New Route: Get Flow Data for Chart
router.get("/flow-data", auth, async (req, res) => {
  try {
    const latestPeriod = await Period.findOne({ userId: req.user._id }).sort({ createdAt: -1 });

    if (!latestPeriod) {
      return res.json([]);
    }

    const flowValues = { Light: [2, 3, 1, 1, 0], Medium: [3, 4, 3, 2, 1], Heavy: [5, 6, 4, 3, 2] };
    const flowData = flowValues[latestPeriod.flowType].map((flow, index) => ({
      day: `Day ${index + 1}`,
      flow,
    }));

    res.json(flowData);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
*/


/*
const express = require("express");
const Cycle = require("../models/Cycle");
const Period = require("../models/Period");  
const auth = require("../middleware/auth");

const router = express.Router();

// ✅ Log New Cycle Entry
router.post("/log", auth, async (req, res) => {
  try {
    const { startDate, cycleLength } = req.body;

    if (!startDate || !cycleLength) {
      return res.status(400).json({ message: "Please provide all details" });
    }

    const newCycle = new Cycle({
      userId: req.user._id,
      startDate,
      cycleLength,
    });

    await newCycle.save();
    res.status(201).json({ message: "Cycle data saved successfully!" });
  } catch (error) {
    console.error("Error in /log API:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Get Past Cycle Records
router.get("/history", auth, async (req, res) => {
  try {
    const cycles = await Cycle.find({ userId: req.user._id }).sort({ startDate: -1 });

    if (!cycles || cycles.length === 0) {
      return res.status(404).json({ message: "No cycle data found" });
    }

    res.json(cycles);
  } catch (error) {
    console.error("Error in /history API:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Predict Next Period Start Date
router.get("/predict", auth, async (req, res) => {
  try {
    const lastCycle = await Cycle.findOne({ userId: req.user._id }).sort({ startDate: -1 });

    if (!lastCycle) {
      return res.status(404).json({ message: "No past cycles found" });
    }

    const lastStartDate = new Date(lastCycle.startDate);
    const predictedNextStart = new Date(lastStartDate);
    predictedNextStart.setDate(lastStartDate.getDate() + lastCycle.cycleLength);

    res.json({ nextPeriodStart: predictedNextStart.toISOString().split("T")[0] });
  } catch (error) {
    console.error("Error in /predict API:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Get Cycle Data for Dashboard
router.get("/cycle-data", auth, async (req, res) => {
  try {
    const lastCycle = await Cycle.findOne({ userId: req.user._id }).sort({ startDate: -1 });

    if (!lastCycle) {
      return res.json({ nextPeriod: "Unknown", currentPhase: "Unknown" });
    }

    const cycleLength = lastCycle.cycleLength || 28;
    const lastDate = new Date(lastCycle.startDate);
    const nextDate = new Date(lastDate);
    nextDate.setDate(lastDate.getDate() + cycleLength);

    const today = new Date();
    const daysSinceLastPeriod = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
    let currentPhase = "Unknown";

    if (daysSinceLastPeriod <= 5) currentPhase = "Menstrual Phase";
    else if (daysSinceLastPeriod <= 14) currentPhase = "Follicular Phase";
    else if (daysSinceLastPeriod <= 21) currentPhase = "Ovulation";
    else currentPhase = "Luteal Phase";

    res.json({
      nextPeriod: nextDate.toISOString().split("T")[0],
      currentPhase,
    });
  } catch (error) {
    console.error("Error in /cycle-data API:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Get Flow Data for Chart
router.get("/flow-data", auth, async (req, res) => {
  try {
    const latestPeriod = await Period.findOne({ userId: req.user._id }).sort({ createdAt: -1 });

    if (!latestPeriod || !latestPeriod.flowType) {
      return res.json([]);  // Return empty array if no period data found
    }

    const flowValues = { Light: [2, 3, 1, 1, 0], Medium: [3, 4, 3, 2, 1], Heavy: [5, 6, 4, 3, 2] };

    // Ensure latestPeriod.flowType is valid
    if (!flowValues[latestPeriod.flowType]) {
      return res.status(400).json({ message: "Invalid flow type" });
    }

    const flowData = flowValues[latestPeriod.flowType].map((flow, index) => ({
      day: `Day ${index + 1}`,
      flow,
    }));

    res.json(flowData);
  } catch (error) {
    console.error("Error in /flow-data API:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }

  
});

module.exports = router;
*/
/*// ✅ Delete a Period Log
router.delete("/delete/:date", auth, async (req, res) => {
  try {
    const dateToDelete = new Date(req.params.date);
    await Cycle.deleteOne({ userId: req.user._id, startDate: dateToDelete });

    res.json({ message: "Cycle entry deleted successfully!" });
  } catch (error) {
    console.error("Error in deleting cycle data:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
*/


/*const express = require("express");
const Cycle = require("../models/Cycle");
const auth = require("../middleware/auth");

const router = express.Router();

// ✅ Log New Cycle Entry
router.post("/log", auth, async (req, res) => {
  try {
    const { startDate, cycleLength } = req.body;

    if (!startDate || !cycleLength) {
      return res.status(400).json({ message: "Please provide all details" });
    }

    const newCycle = new Cycle({
      userId: req.user._id,
      startDate,
      cycleLength,
    });

    await newCycle.save();
    res.status(201).json({ message: "Cycle data saved successfully!" });
  } catch (error) {
    console.error("Error in /log API:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Get Past Cycle Records
router.get("/history", auth, async (req, res) => {
  try {
    const cycles = await Cycle.find({ userId: req.user._id }).sort({ startDate: -1 });

    if (!cycles.length) {
      return res.status(404).json({ message: "No cycle data found" });
    }

    res.json(cycles);
  } catch (error) {
    console.error("Error in /history API:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Predict Next Period Start Date
router.get("/predict", auth, async (req, res) => {
  try {
    const lastCycle = await Cycle.findOne({ userId: req.user._id }).sort({ startDate: -1 });

    if (!lastCycle) {
      return res.status(404).json({ message: "No past cycles found" });
    }

    const predictedNextStart = new Date(lastCycle.startDate);
    predictedNextStart.setDate(predictedNextStart.getDate() + lastCycle.cycleLength);

    res.json({ nextPeriodStart: predictedNextStart.toISOString().split("T")[0] });
  } catch (error) {
    console.error("Error in /predict API:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Get Cycle Data for Dashboard
router.get("/cycle-data", auth, async (req, res) => {
  try {
    const lastCycle = await Cycle.findOne({ userId: req.user._id }).sort({ startDate: -1 });

    if (!lastCycle) {
      return res.json({ nextPeriod: "Unknown", currentPhase: "Unknown" });
    }

    const cycleLength = lastCycle.cycleLength || 28;
    const lastDate = new Date(lastCycle.startDate);
    const nextDate = new Date(lastDate);
    nextDate.setDate(lastDate.getDate() + cycleLength);

    const today = new Date();
    const daysSinceLastPeriod = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

    let currentPhase = "Unknown";
    if (daysSinceLastPeriod <= 5) currentPhase = "Menstrual Phase";
    else if (daysSinceLastPeriod <= 14) currentPhase = "Follicular Phase";
    else if (daysSinceLastPeriod <= 21) currentPhase = "Ovulation";
    else currentPhase = "Luteal Phase";

    res.json({ nextPeriod: nextDate.toISOString().split("T")[0], currentPhase });
  } catch (error) {
    console.error("Error in /cycle-data API:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
*/
/*
const express = require("express");
const router = express.Router();
const Cycle = require("../models/Cycle"); // Import Cycle model
const authMiddleware = require("../middleware/auth");


// 📌 GET Period History
router.get("/history", authMiddleware, async (req, res) => {
  const cycles = await Cycle.findOne({ userId: req.user.id });
  res.json(cycles || { periods: [], cycleLength: 28 });
});

// 📌 Log New Cycle Date
router.post("/log", authMiddleware, async (req, res) => {
  console.log("🔹 Received request to log cycle:", req.body);
  console.log("🔹 User ID:", req.user?.id); // Check if user ID exists

  const { startDate, cycleLength } = req.body;
  let cycle = await Cycle.findOne({ userId: req.user.id });

  if (!cycle) cycle = new Cycle({ userId: req.user.id, periods: [], cycleLength });

  cycle.periods.push(startDate);
  await cycle.save();
  res.json(cycle);
});

// 📌 Delete a Period Date
router.delete("/delete", authMiddleware, async (req, res) => {
  const { date } = req.body;
  const cycle = await Cycle.findOne({ userId: req.user.id });

  /*cycle.periods = cycle.periods.filter((d) => d !== date);
  cycle.periods = cycle.periods.filter((d) => d.toISOString() !== date);

  await cycle.save();
  res.json(cycle);
});

// 📌 Update Cycle Length
router.put("/update-cycle-length", authMiddleware, async (req, res) => {
  const { cycleLength } = req.body;
  const cycle = await Cycle.findOneAndUpdate(
    { userId: req.user.id },
    { cycleLength },
    { new: true }
  );
  res.json(cycle);
});

module.exports = router;
*/


const express = require("express");
const router = express.Router();
const Cycle = require("../models/Cycle");
const authenticateUser = require("../middleware/auth");
const { getNextPeriodAndPhase } = require("../controllers/cycleController");


// Fetch period history
/*router.get("/history", authenticateUser, async (req, res) => {
  try {
    const cycle = await Cycle.findOne({ userId: req.user.userId });
    if (!cycle) return res.status(200).json({ periods: [], cycleLength: 28 });
    res.json(cycle);
  } catch (error) {
    res.status(500).json({ error: "Error fetching cycle history" });
  }
});*/

router.get("/", authenticateUser, async (req, res) => {
  console.log("Fetching Data for User:", req.user?.userId);

  try {
    const cycle = await Cycle.findOne({ userId: req.user.userId });

    if (!cycle) {
      console.log("No cycle data found for user.");
      return res.status(404).json({ error: "No data found" });
    }

    console.log("Fetched Data:", cycle);
    res.json(cycle);
  } catch (error) {
    console.error("Database Fetch Error:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

// Log new period date
/*router.post("/log", authenticateUser, async (req, res) => {
  const { startDate, cycleLength } = req.body;
  try {
    let cycle = await Cycle.findOne({ userId: req.user.userId });
    if (!cycle) {
      cycle = new Cycle({ userId: req.user.userId, periods: [startDate], cycleLength });
    } else {
      cycle.periods.push(startDate);
      cycle.cycleLength = cycleLength;
    }
    await cycle.save();
    res.json(cycle);
  } catch (error) {
    res.status(500).json({ error: "Error logging period" });
  }
});*/
router.post("/log", authenticateUser, async (req, res) => {
  const { startDate, cycleLength } = req.body;
  console.log("Received Data:", { startDate, cycleLength, userId: req.user?.userId });

  if (!startDate || !cycleLength) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    let cycle = await Cycle.findOne({ userId: req.user.userId });
    console.log("Existing Cycle Data:", cycle);

    /*if (!cycle) {
      cycle = new Cycle({ userId: req.user.userId, periods: [startDate], cycleLength });
    } else {
      cycle.periods.push(startDate);
      cycle.cycleLength = cycleLength;
    }*/
      const dateObj = new Date(startDate);
      if (isNaN(dateObj.getTime())) {
        console.log("Invalid Date Format:", startDate);
        return res.status(400).json({ error: "Invalid date format" });
      }
  
      if (!cycle) {
        cycle = new Cycle({ userId: req.user.userId, periods: [dateObj], cycleLength });
      } else {
        cycle.periods.push(dateObj);
        cycle.cycleLength = cycleLength;
      }

    await cycle.save();
    console.log("Saved Cycle Data:", cycle);
    res.json(cycle);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Error logging period" });
  }
});


// Delete a period log
router.delete("/delete", authenticateUser, async (req, res) => {
  const { date } = req.body;
  try {
    const cycle = await Cycle.findOne({ userId: req.user.userId });
    if (!cycle) return res.status(404).json({ error: "No data found" });
    cycle.periods = cycle.periods.filter(d => d.toISOString() !== date);
    await cycle.save();
    res.json(cycle);
  } catch (error) {
    res.status(500).json({ error: "Error deleting period log" });
  }
});

// Update cycle length
router.put("/update-cycle-length", authenticateUser, async (req, res) => {
  const { cycleLength } = req.body;
  try {
    const cycle = await Cycle.findOneAndUpdate(
      { userId: req.user.userId },
      { cycleLength },
      { new: true, upsert: true }
    );
    res.json(cycle);
  } catch (error) {
    res.status(500).json({ error: "Error updating cycle length" });
  }
});

// Get predicted next period and current phase
router.get("/cycle-data", authenticateUser, async (req, res) => {
  try {
    const cycle = await Cycle.findOne({ userId: req.user.userId });
    if (!cycle || cycle.periods.length === 0) {
      return res.status(404).json({ error: "No cycle data found" });
    }

    // Get the most recent period date
    const lastPeriodDate = new Date(Math.max(...cycle.periods.map(d => new Date(d))));
    const cycleLength = cycle.cycleLength || 28;
    const currentDate = new Date();
    const diffDays = Math.floor((currentDate - lastPeriodDate) / (1000 * 60 * 60 * 24));

    // Predict next period
    const nextPeriodDate = new Date(lastPeriodDate);
    nextPeriodDate.setDate(lastPeriodDate.getDate() + cycleLength);

    // Determine current phase
    let currentPhase = "";
    if (diffDays <= 5) {
      currentPhase = "Menstrual Phase";
    } else if (diffDays <= 14) {
      currentPhase = "Follicular Phase";
    } else if (diffDays === 14) {
      currentPhase = "Ovulation Phase";
    } else if (diffDays <= 28) {
      currentPhase = "Luteal Phase";
    } else {
      currentPhase = "Cycle Ended";
    }

    res.json({
      nextPeriod: nextPeriodDate.toDateString(),
      currentPhase,
    });
  } catch (error) {
    console.error("Error fetching cycle data:", error);
    res.status(500).json({ error: "Server error" });
  }
});

/*
router.get("/cycle-data", async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you're using authentication middleware
    const data = await getNextPeriodAndPhase(userId);

    if (!data) {
      return res.status(404).json({ message: "Cycle data not found" });
    }

    res.json({
      nextPeriod: data.nextPeriod,
      currentPhase: data.currentPhase,
    });
  } catch (error) {
    console.error("Error fetching cycle data:", error);
    res.status(500).json({ message: "Server error" });
  }
});
*/

module.exports = router;
