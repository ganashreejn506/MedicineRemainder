const express = require("express");

const {
  createFamily,
  getFamily,
  addMember
} = require("../controllers/familyController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createFamily);
router.get("/", protect, getFamily);
router.post("/members", protect, addMember);

module.exports = router;