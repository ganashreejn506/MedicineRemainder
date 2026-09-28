const familyRoutes = require("./routes/familyRoutes");
const authRoutes = require("./routes/authRoutes");
const medicationRoutes = require("./routes/medicationRoutes");
const logRoutes = require("./routes/logRoutes");

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

const PORT = 5000;

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/family", familyRoutes);
app.use("/api/medications", medicationRoutes);
app.use("/api/logs", logRoutes);

// Test routes
app.get("/", (req, res) => {
  res.send("MedicineReminder Backend is Running!");
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "MedicineReminder API is working!",
    success: true
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});