const MedicationLog = require("../models/MedicationLog");
const Medication = require("../models/Medication");

const createLog = async (req, res) => {
  try {
    const {
      medicationId,
      memberId,
      date,
      scheduledTime,
      status
    } = req.body;

    if (!medicationId || !memberId || !date || !scheduledTime || !status) {
      return res.status(400).json({
        message: "Required log fields are missing"
      });
    }

    if (!["taken", "missed", "pending"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status"
      });
    }

    const medication = await Medication.findById(medicationId);

    if (!medication) {
      return res.status(404).json({
        message: "Medication not found"
      });
    }

    const log = await MedicationLog.create({
      medicationId,
      memberId,
      date,
      scheduledTime,
      status,
      markedAt: status === "pending" ? null : new Date()
    });

    res.status(201).json({
      message: "Medication log created successfully",
      log
    });

  } catch (error) {
    console.error("Create log error:", error.message);

    res.status(500).json({
      message: "Server error"
    });
  }
};

const getLogs = async (req, res) => {
  try {
    const logs = await MedicationLog.find()
      .populate("medicationId")
      .populate("memberId");

    res.status(200).json({
      logs
    });

  } catch (error) {
    console.error("Get logs error:", error.message);

    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  createLog,
  getLogs
};