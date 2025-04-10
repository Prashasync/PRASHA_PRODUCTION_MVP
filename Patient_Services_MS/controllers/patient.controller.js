const db = require("../models");

exports.getProfile = async (req, res) => {
  const {user_id}=req.query;
  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {

    // Find the patient by user_id (using the correct type)
    const patient = await db.Patient.findOne({ where: { user_id: req.query.user_id } });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Send the patient data back as a response
    res.json(patient);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getOverview = async (req, res) => {
  try {
    // Get the latest mood and health record for the patient
    const mood = await db.Mood.findOne({ where: { user_Id: req.user.id }, order: [["createdAt", "DESC"]] });
    const health = await db.Health.findOne({ where: { user_Id: req.user.id }, order: [["createdAt", "DESC"]] });

    // Return the mood and health data in response
    res.json({ mood, health });
  } catch (error) {
    console.error("Error fetching overview:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateMood = async (req, res) => {
  try {
    const { status, note } = req.body;

    // Create a new mood entry for the patient
    const mood = await db.Mood.create({ user_Id: req.user.id, status, note });

    // Return the newly created mood entry
    res.json(mood);
  } catch (error) {
    console.error("Error updating mood:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateHealth = async (req, res) => {
  try {
    const { sleepHours, energyLevel } = req.body;

    // Create a new health entry for the patient
    const health = await db.Health.create({ user_Id: req.user.id, sleepHours, energyLevel });

    // Return the newly created health entry
    res.json(health);
  } catch (error) {
    console.error("Error updating health:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    // Get all notifications for the patient
    const notifications = await db.Notification.findAll({ where: { user_Id: req.user.id }, order: [["createdAt", "DESC"]] });
    
    // Return the notifications data
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    // Get all appointments for the patient
    const appointments = await db.Appointment.findAll({ where: { user_Id: req.user.id }, order: [["time", "ASC"]] });

    // Return the appointments data
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const { doctorName, time, status } = req.body;

    // Create a new appointment for the patient
    const appointment = await db.Appointment.create({ user_Id: req.user.id, doctorName, time, status });

    // Return the newly created appointment
    res.json(appointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getMedications = async (req, res) => {
  try {
    // Get all medications for the patient
    const meds = await db.Medication.findAll({ where: { user_Id: req.user.id } });

    // Return the medications data
    res.json(meds);
  } catch (error) {
    console.error("Error fetching medications:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.addMedication = async (req, res) => {
  try {
    const { name, dosage, time } = req.body;

    // Create a new medication for the patient
    const med = await db.Medication.create({ user_Id: req.user.id, name, dosage, time });

    // Return the newly created medication entry
    res.json(med);
  } catch (error) {
    console.error("Error adding medication:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
