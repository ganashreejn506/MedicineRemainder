const mongoose = require("mongoose");

const medicationLogSchema = new mongoose.Schema(
  {
    medicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medication",
      required: true
    },

    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    scheduledTime: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["taken", "missed", "pending"],
      default: "pending"
    },

    markedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("MedicationLog", medicationLogSchema);
