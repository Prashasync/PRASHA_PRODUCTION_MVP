const express = require("express");
const { authenticateUser } = require("../controllers/auth");
const {
  logEmotions,
  logCauseOfEmotion,
  logEmotionsNotes,
  getHistory,
  logVoiceNote,
} = require("../controllers/symptoms");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `voicenote-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

router.get("/history", authenticateUser, getHistory);
router.post("/log/emotions", authenticateUser, logEmotions);
router.post("/log/notes", authenticateUser, logEmotionsNotes);

router.post(
  "/log/voicenote",
  authenticateUser,
  upload.single("voiceNote"),
  logVoiceNote
);

router.post("/log/cause-of-emotion", authenticateUser, logCauseOfEmotion);

module.exports = router;