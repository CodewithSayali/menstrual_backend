/*const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  cycleLength: Number, // User's average cycle length
});

module.exports = mongoose.model("User", UserSchema);
*/
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }  // ✅ Ensure password is stored
});

module.exports = mongoose.model("User", UserSchema);
