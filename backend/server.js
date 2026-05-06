require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");
const passwordRoutes = require("./routes/password");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// REMOVED THE LOGGING MIDDLEWARE COMPLETELY

app.use("/api/auth", authRoutes);
app.use("/api/passwords", passwordRoutes);

app.get("/api/dashboard", (req, res) => {
  res.json({ msg: "Dashboard temporary bypass" });
});

app.listen(5000, () => console.log("Server running on port 5000"));