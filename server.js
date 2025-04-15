/*const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error(err));

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to Menstrual Health Tracker API");
});
const moodRoutes = require("./routes/moodRoutes");
app.use("/api/moods", moodRoutes);

const reminderRoutes = require("./routes/reminderRoutes");
app.use("/api/reminders", reminderRoutes);

const cycleRoutes = require("./routes/cycleRoutes");
app.use("/api/cycles", cycleRoutes);

const symptomRoutes = require("./routes/symptomRoutes");
app.use("/api/symptoms", symptomRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const periodRoutes = require("./routes/periodRoutes"); 
app.use("/api/periods", periodRoutes);

mongoose.set("strictQuery", false);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
*/


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
/*app.use(cors({ origin: "http://localhost:3001" }));  // Adjust as needed*/
const dotenv = require("dotenv");
const http = require("http");
//const socketIo = require("socket.io");
const { Server } = require("socket.io");
const cron = require("node-cron");
//const Reminder = require("./models/Reminder");
const bodyParser = require("body-parser");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3001" }, // Allow frontend connections
});

const PORT = process.env.PORT || 3000;
//const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

mongoose.set("strictQuery", false);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to Menstrual Health Tracker API");
});

// Routes
const moodRoutes = require("./routes/moodRoutes");
app.use("/api/moods", moodRoutes);

const reminderRoutes = require("./routes/reminderRoutes");
app.use("/api/reminders", reminderRoutes);

const cycleRoutes = require("./routes/cycleRoutes");
app.use("/api/cycles", cycleRoutes);

const symptomRoutes = require("./routes/symptomRoutes");
app.use("/api/symptoms", symptomRoutes);

console.log("✅ Loading user routes...");
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);
console.log("✅ User routes loaded successfully...");

const periodRoutes = require("./routes/periodRoutes"); 
app.use("/api/periods", periodRoutes);

// ✅ WebSocket Connection
io.on("connection", (socket) => {
  console.log("✅ Client connected");

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});
/*
// ✅ Scheduled Job: Check Reminders Every Minute
cron.schedule("* * * * *", async () => {
  try {
    console.log("🔎 Checking reminders...");

    const now = new Date();
    const reminders = await Reminder.find({ dateTime: { $lte: now }, notified: false });

    for (const reminder of reminders) {
      // ✅ Send Notification via WebSockets
      io.emit("reminderNotification", { 
        message: `📢 Reminder: ${reminder.note} (Scheduled at ${reminder.dateTime})` 
      });

      // ✅ Mark as Notified
      await Reminder.findByIdAndUpdate(reminder._id, { notified: true });
      console.log(`✅ Reminder sent: ${reminder.note}`);
    }
  } catch (error) {
    console.error("❌ Error checking reminders:", error);
  }
});
*/
app.use((err, req, res, next) => {
  console.error("❌ Unhandled Server Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = io; // Export socket instance
