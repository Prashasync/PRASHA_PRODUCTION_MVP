const express = require("express");
const router = express.Router();
const { registerUser, createGoogleUser, loginUser } = require("../controllers/users");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/create-google-account", createGoogleUser);
router.post("/verify", createGoogleUser);

module.exports = router;