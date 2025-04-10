const express = require("express");
const { authenticateUser } = require("../controllers/auth");
const {getPatients, getOnboardingStatus, postOnboardingStatus} = require("../controllers/patients")
const router = express.Router();


router.get("/profile", authenticateUser, getPatients);
router.get("/onboarding-status", authenticateUser, getOnboardingStatus);
router.post("/onboarding-status", authenticateUser, postOnboardingStatus);

module.exports = router;