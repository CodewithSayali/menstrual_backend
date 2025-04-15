const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config(); // Ensure .env is loaded

const SECRET_KEY = process.env.SECRET_KEY; // ✅ Use the exact variable name from .env

if (!SECRET_KEY) {
  console.error("❌ SECRET_KEY is missing from .env");
  process.exit(1);
}

const router = express.Router();

// ✅ Register User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();
    console.log("🔹 Hashed Password:", hashedPassword);


    // Generate JWT Token
    const tokenPayload = { userId: user._id.toString(), email: user.email };
    const token = jwt.sign(tokenPayload, SECRET_KEY, { expiresIn: "1h" });

    res.status(201).json({ message: "User registered successfully", token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// ✅ Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log("🔹 User Found:", user);
    console.log("🔹 Entered Password:", password);
    console.log("🔹 Stored Hashed Password:", user.password);
    
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔹 Password Match:", isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log("🔹 Password Comparison Result:", isMatch);

    console.log("🔹 Checking password:", password === user.password);


    console.log("🔹 SECRET_KEY from process.env:", SECRET_KEY); // Debugging

    // Ensure userId is included in the token payload
    const tokenPayload = { userId: user._id.toString(), email: user.email };
    console.log("🔹 Token Payload:", tokenPayload); // Debugging

    const token = jwt.sign(tokenPayload, SECRET_KEY, { expiresIn: "1h" });
    console.log("🔹 Generated Token:", token);


    res.status(200).json({ message: "Login successful", token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;

/*const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const dotenv = require("dotenv");
const { getMenstrualPhase, getNutritionRecommendation, updateLastPeriodDate } = require("../controllers/userController");// ✅ Import new controllers
const auth = require("../middleware/auth");


dotenv.config(); // Ensure .env is loaded

const SECRET_KEY = process.env.SECRET_KEY; // ✅ Use the exact variable name from .env

if (!SECRET_KEY) {
  console.error("❌ SECRET_KEY is missing from .env");
  process.exit(1);
}

const router = express.Router();

// ✅ Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("🔹 SECRET_KEY from process.env:", SECRET_KEY); // Debugging

    // Ensure userId is included in the token payload
    const tokenPayload = { userId: user._id.toString(), email: user.email };
    console.log("🔹 Token Payload:", tokenPayload); // Debugging

    const token = jwt.sign(tokenPayload, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Add new routes for menstrual phase & nutrition
router.get("/phase", auth, getMenstrualPhase);
router.get("/nutrition", auth, getNutritionRecommendation); // Returns menstrual phase // Returns diet plan

console.log("Auth Middleware:", auth);
console.log("getMenstrualPhase:", getMenstrualPhase);
console.log("getNutritionRecommendation:", getNutritionRecommendation);
console.log("updateLastPeriodDate:", updateLastPeriodDate);

module.exports = router;
*/
