const express = require('express');
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const patient = require('../controllers/patient.controller');

router.get("/profile", verifyToken, patient.getProfile);
router.get("/overview", verifyToken, patient.getOverview);
router.patch("/mood", verifyToken, patient.updateMood);
router.patch("/health", verifyToken, patient.updateHealth);
router.get("/notifications", verifyToken,patient.getNotifications);
router.get("/appointments", verifyToken,patient.getAppointments);
router.post("/appointments",verifyToken, patient.createAppointment);
router.get("/medications", verifyToken,patient.getMedications);
router.post("/medications",verifyToken, patient.addMedication);

module.exports = router;
