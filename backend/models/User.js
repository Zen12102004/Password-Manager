const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  masterPassword: {
    type: String,
    required: true,
  },
});

// "Step 3" Logic: Hash password before saving to MongoDB
userSchema.pre("save", async function () {
  if (!this.isModified("masterPassword")) return;
  const salt = await bcrypt.genSalt(10);
  this.masterPassword = await bcrypt.hash(this.masterPassword, salt);
});

// "Step 4" Logic: Method to compare hashed passwords during login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.masterPassword);
};

module.exports = mongoose.model("User", userSchema);