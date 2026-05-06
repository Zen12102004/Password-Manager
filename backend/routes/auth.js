const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", async (req, res) => {
  console.log("--- REACHED REGISTER ROUTE ---")
  try {
    
    const { username, masterPassword } = req.body;
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({ 
      username, 
      masterPassword 
    });

    await user.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message); // This will help you see future errors!
    res.status(500).send("Server Error");
  }
});


router.post("/login", async (req, res) => {
  try {
    const { username, masterPassword } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

    // Compare Hashed Password
    const isMatch = await user.comparePassword(masterPassword);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });


    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});
router.post("/revalidate", authMiddleware, async (req, res) => {
  try {
    const { masterPassword } = req.body;
    const user = await User.findById(req.user.id);

    const isMatch = await user.comparePassword(masterPassword);
    if (!isMatch) return res.status(400).json({ msg: "Revalidation failed" });

    res.json({ msg: "Validated" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});
module.exports = router;