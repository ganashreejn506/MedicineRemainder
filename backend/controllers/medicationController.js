const Medication = require("../models/Medication");
const Member = require("../models/Member");

const createMedication = async (req, res) => {
  try {
    const {
      memberId,
      name,
      times,
      frequency,
      startDate,
      endDate
    } = req.body;

    // Check required fields
    if (!memberId || !name || !times || !frequency || !startDate) {
      return res.status(400).json({
        message: "Required medication fields are missing"
      });
    }

    // Check that member exists
    const member = await Member.findById(memberId);

    if (!member) {
      return res.status(404).json({
        message: "Family member not found"
      });
    }

    // Create medication
    const medication = await Medication.create({
      memberId,
      name,
      times,
      frequency,
      startDate,
      endDate: endDate || null
    });

    res.status(201).json({
      message: "Medication created successfully",
      medication
    });

  } catch (error) {
    console.error("Create medication error:", error.message);

    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  createMedication
};