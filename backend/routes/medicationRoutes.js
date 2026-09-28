const express = require("express");

const {
  createMedication
} = require("../controllers/medicationController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createMedication);

module.exports = router;