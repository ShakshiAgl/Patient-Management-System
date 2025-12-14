const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true,
      min: 0
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"]
    },
    medicalHistory: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
