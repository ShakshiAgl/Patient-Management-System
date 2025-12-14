const Patient = require("../models/Patient");

// CREATE
exports.addPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch patients" });
  }
};

// READ ONE
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Patient can only see their own record
    if (
      req.user.role === "patient" &&
      req.user.id !== req.params.id
    ) {
      return res.status(403).json({ error: "Access denied" });
    }

    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: "Invalid patient ID" });
  }
};

// UPDATE
exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.json({ message: "Patient deleted" });
  } catch (err) {
    res.status(400).json({ error: "Invalid patient ID" });
  }
};
