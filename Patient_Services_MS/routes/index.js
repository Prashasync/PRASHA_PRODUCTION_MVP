const express = require('express');
const router = express.Router();
const patientRoutes = require('./patient.routes');

router.use('/patient', patientRoutes);

module.exports = router;
