const mongoose = require("mongoose");

const passwordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  siteName: { type: String, required: true },
  siteUsername: { type: String, required: true },
  encryptedPassword: { type: String, required: true },
  iv: { type: String, required: true }, // Initialization vector for AES encryption
});

module.exports = mongoose.model("Password", passwordSchema);