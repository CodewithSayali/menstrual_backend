const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const SECRET_KEY = process.env.SECRET_KEY || "mystrongsecretkey123"; // Ensure correct env variable

if (!SECRET_KEY) {
  console.error("❌ SECRET_KEY is missing from .env");
  process.exit(1);
}

const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ message: "Access Denied: No or Invalid Token Provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);

    console.log("🔹 Decoded Token:", decoded); // Debugging log

    // Ensure userId is included in decoded token
    if (!decoded.userId) {
      return res.status(401).json({ message: "Invalid token: User ID missing" });
    }

    req.user = { userId: decoded.userId, email: decoded.email }; // Attach user details to req
    console.log("🔹 Authenticated User Data:", req.user); // Debugging

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or Expired Token", error: error.message });
  }
};

module.exports = authenticateUser;
