const express = require('express');
const router = express.Router();
const Password = require('../models/Password');
const authMiddleware = require('../middleware/authMiddleware');
const { encrypt, decrypt } = require('../utils/encryption');

// Action: Add new password
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { siteName, siteUsername, password } = req.body;
    const { iv, encryptedPassword } = encrypt(password);

    const newPassword = new Password({
      user: req.user.id,
      siteName,
      siteUsername,
      encryptedPassword,
      iv
    });

    await newPassword.save();
    res.json({ msg: "Password saved successfully" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Action: View passwords
router.get('/', authMiddleware, async (req, res) => {
  try {
    const passwords = await Password.find({ user: req.user.id });
    
    // Decrypt passwords before sending to frontend
    const decryptedList = passwords.map(p => ({
      id: p._id,
      siteName: p.siteName,
      siteUsername: p.siteUsername,
      password: decrypt(p.encryptedPassword, p.iv)
    }));

    res.json(decryptedList);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;