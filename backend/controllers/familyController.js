const Family = require("../models/Family");
const Member = require("../models/Member");

const createFamily = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Family name is required"
      });
    }

    const existingFamily = await Family.findOne({
      createdBy: req.user.userId
    });

    if (existingFamily) {
      return res.status(400).json({
        message: "You already have a family"
      });
    }

    const family = await Family.create({
      name,
      createdBy: req.user.userId
    });

    res.status(201).json({
      message: "Family created successfully",
      family
    });
  } catch (error) {
    console.error("Create family error:", error.message);

    res.status(500).json({
      message: "Server error"
    });
  }
};

const getFamily = async (req, res) => {
  try {
    const family = await Family.findOne({
      createdBy: req.user.userId
    });

    if (!family) {
      return res.status(404).json({
        message: "Family not found"
      });
    }

    const members = await Member.find({
      familyId: family._id
    });

    res.status(200).json({
      family,
      members
    });
  } catch (error) {
    console.error("Get family error:", error.message);

    res.status(500).json({
      message: "Server error"
    });
  }
};

const addMember = async (req, res) => {
  try {
    const { name, relationship } = req.body;

    if (!name || !relationship) {
      return res.status(400).json({
        message: "Name and relationship are required"
      });
    }

    const family = await Family.findOne({
      createdBy: req.user.userId
    });

    if (!family) {
      return res.status(404).json({
        message: "Please create a family first"
      });
    }

    const member = await Member.create({
      name,
      relationship,
      familyId: family._id
    });

    res.status(201).json({
      message: "Member added successfully",
      member
    });
  } catch (error) {
    console.error("Add member error:", error.message);

    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  createFamily,
  getFamily,
  addMember
};