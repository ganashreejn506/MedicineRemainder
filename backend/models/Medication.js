const mongoose = require("mongoose");

const medicationSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    times: {
      type: [String],
      required: true
    },

    frequency: {
      type: String,
      required: true,
      enum: ["daily", "weekly"]
    },

    startDate: {
      type: Date,
      required: true
    },

    endDate: {
      type: Date,
      default: null
    },

    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Medication", medicationSchema);