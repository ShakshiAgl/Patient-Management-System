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
  const patients = await Patient.find();
  res.json(patients);
};

// READ ONE
exports.getPatientById = async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  res.json(patient);
};

// UPDATE
exports.updatePatient = async (req, res) => {
  const patient = await Patient.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(patient);
};

// DELETE
exports.deletePatient = async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.json({ message: "Patient deleted" });
};
