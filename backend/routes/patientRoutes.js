const express = require("express");
const router = express.Router();
const {
  addPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient
} = require("../controllers/patientController");

const { protect } = require("../middleware/authMiddleware");

// Only admin and doctor can create, update, delete patients
router.post("/", protect(["admin", "doctor"]), addPatient);
router.put("/:id", protect(["admin", "doctor"]), updatePatient);
router.delete("/:id", protect(["admin", "doctor"]), deletePatient);

// GET routes can be open or restricted depending on your design
// For example, only admin & doctor can see all patients
router.get("/", protect(["admin", "doctor"]), getPatients);

// Patient can see their own details
router.get("/:id", protect(["admin", "doctor", "patient"]), getPatientById);

module.exports = router;
