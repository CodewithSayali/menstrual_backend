/*const express = require("express");
const Reminder = require("../models/Reminder");
const auth = require("../middleware/auth");

const router = express.Router();

// ✅ Create a Reminder
router.post("/set", auth, async (req, res) => {
  try {
    const { reminderDate, message } = req.body;

    if (!reminderDate || !message) {
      return res.status(400).json({ message: "Please provide reminder date and message" });
    }

    const newReminder = new Reminder({
      userId: req.user._id,
      reminderDate: new Date(reminderDate),  // Ensure it's stored as a Date
      message,
    });

    await newReminder.save();
    res.status(201).json({ message: "Reminder set successfully!", reminder: newReminder });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Get All Reminders for the User
router.get("/", auth, async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.user._id }).sort({ reminderDate: 1 });

    if (!reminders.length) {
      return res.status(404).json({ message: "No reminders found" });
    }

    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Get a Specific Reminder by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const reminder = await Reminder.findOne({ _id: req.params.id, userId: req.user._id });

    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    res.json(reminder);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Update a Reminder
router.put("/update/:id", auth, async (req, res) => {
  try {
    const { reminderDate, message } = req.body;

    const updatedReminder = await Reminder.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { reminderDate: new Date(reminderDate), message },
      { new: true, runValidators: true }
    );

    if (!updatedReminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    res.json({ message: "Reminder updated successfully!", reminder: updatedReminder });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Delete a Reminder
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const deletedReminder = await Reminder.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if (!deletedReminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    res.json({ message: "Reminder deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
module.exports = router;
*/



/*
const express = require("express");
const Reminder = require("../models/Reminder");

const router = express.Router();

// ✅ Add a New Reminder
router.post("/add", async (req, res) => {
  try {
    const { dateTime, note } = req.body;
    const reminder = new Reminder({ dateTime, note });
    await reminder.save();
    res.status(201).json({ message: "Reminder added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error adding reminder" });
  }
});

// ✅ Get All Reminders
router.get("/all", async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching reminders" });
  }
});

module.exports = router;
*/

/*
const mongoose = require("mongoose");
const express = require("express");
const Reminder = require("../models/Reminder");

const router = express.Router();

// ✅ Add a New Reminder
router.post("/add", async (req, res) => {
  try {
    const { dateTime, note } = req.body;
    const reminder = new Reminder({ dateTime, note });
    await reminder.save();
    res.status(201).json({ message: "Reminder added successfully!", reminder });
  } catch (error) {
    res.status(500).json({ error: "Error adding reminder", details: error.message });
  }
});

// ✅ Get All Reminders
router.get("/all", async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching reminders", details: error.message });
  }
});

// ✅ Update a Reminder (PUT)
/*
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { dateTime, note } = req.body;

    const updatedReminder = await Reminder.findByIdAndUpdate(
      id,
      { dateTime, note },
      { new: true, runValidators: true }
    );

    if (!updatedReminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    res.json({ message: "Reminder updated successfully!", reminder: updatedReminder });
  } catch (error) {
    res.status(500).json({ error: "Error updating reminder", details: error.message });
  }
});

//router.put("/update/:id", async (req, res) => {
  //try {
    //const { id } = req.params;
    //const { dateTime, note } = req.body;

    //console.log("🔹 Received PUT request for ID:", id);
    //console.log("🔹 Received Body:", req.body);

    //if (!mongoose.Types.ObjectId.isValid(id)) {
      //console.log("❌ Invalid ID format");
      //return res.status(400).json({ message: "Invalid reminder ID format" });
    //}

    //const updatedReminder = await Reminder.findByIdAndUpdate(
      //id,
     // new mongoose.Types.ObjectId(id),
      //{ dateTime, note },
      //{ new: true, runValidators: true }
    //);

    //if (!updatedReminder) {
      //console.log("❌ Reminder Not Found");
     // return res.status(404).json({ message: "Reminder not found" });
    //}

    //console.log("✅ Reminder Updated:", updatedReminder);
    //res.json({ message: "Reminder updated successfully!", reminder: updatedReminder });
  //} catch (error) {
  //  console.error("❌ Error updating reminder:", error.message);
    //res.status(500).json({ error: "Error updating reminder", details: error.message });
  //}
//});


// ✅ Delete a Reminder (DELETE)
//router.delete("/delete/:id", async (req, res) => {
  //try {
    //const { id } = req.params;

    //const deletedReminder = await Reminder.findByIdAndDelete(id);
    //if (!deletedReminder) {
      //return res.status(404).json({ message: "Reminder not found" });
    //}

    //res.json({ message: "Reminder deleted successfully!" });
  //} catch (error) {
    //res.status(500).json({ error: "Error deleting reminder", details: error.message });
  //}
//});

//module.exports = router;
*/



/*
const express = require("express");
const Reminder = require("../models/Reminder");
const router = express.Router();

// ✅ Add Reminder
router.post("/add", async (req, res) => {
  try {
    const { dateTime, note } = req.body;
    const newReminder = new Reminder({ dateTime, note });
    await newReminder.save();
    res.json({ success: true, message: "Reminder added!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
// ✅ Add Reminder
router.post("/api/reminders/add", async (req, res) => {
  try {
    const { dateTime, note, userId } = req.body; // Include userId
    const newReminder = new Reminder({ dateTime, note, userId });
    await newReminder.save();
    res.json({ success: true, message: "Reminder added!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/*
// ✅ Fetch All Reminders
router.get("/", async (req, res) => {
  try {
    const reminders = await Reminder.find().sort({ dateTime: 1 });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
// ✅ Fetch All Reminders for a User
router.get("/api/reminders/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const reminders = await Reminder.find({ userId }).sort({ dateTime: 1 });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/*
// ✅ DELETE Reminder by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    console.log("🛠️ Received delete request for ID:", req.params.id);

    //const { id } = req.params;
    /*const deletedReminder = await Reminder.findByIdAndDelete(id);
    const reminder = await Reminder.findByIdAndDelete(req.params.id);

    if (!reminder) {
      return res.status(404).json({ success: false, message: "Reminder not found!" });
    }

    res.json({ success: true, message: "Reminder deleted!" });
  } catch (error) {
    console.error("❌ Error deleting reminder:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ DELETE Reminder by ID
router.delete("/api/reminders/delete/:userId/:id", async (req, res) => {
  try {
    const { userId, id } = req.params;
    const reminder = await Reminder.findOneAndDelete({ _id: id, userId });

    if (!reminder) {
      return res.status(404).json({ success: false, message: "Reminder not found!" });
    }

    res.json({ success: true, message: "Reminder deleted!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


module.exports = router;
*/
const express = require("express");
const Reminder = require("../models/Reminder");
const router = express.Router();

// Add Reminder Route
router.post("/add", async (req, res) => {
  
  try {
    console.log("Add Reminder API Hit");
    
    const { dateTime, note, userId } = req.body;
    console.log("Request Body:", req.body);

    if (!dateTime || !note || !userId) {
      return res.status(400).json({ success: false, message: "Missing required fields!" });
    }
    
    const newReminder = new Reminder({ dateTime: new Date(dateTime), note, userId });
    await newReminder.save();
    res.json({ success: true, message: "Reminder added!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get Reminders Route
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const reminders = await Reminder.find({ userId }).sort({ dateTime: 1 });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete Reminder Route
router.delete("/delete/:userId/:id", async (req, res) => {
  try {
    const { userId, id } = req.params;
    const reminder = await Reminder.findOneAndDelete({ _id: id, userId });
    if (!reminder) {
      return res.status(404).json({ success: false, message: "Reminder not found!" });
    }
    res.json({ success: true, message: "Reminder deleted!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;