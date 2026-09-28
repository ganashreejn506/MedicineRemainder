const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    relationship: {
      type: String,
      required: true,
      trim: true
    },

    familyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Family",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Member", memberSchema);