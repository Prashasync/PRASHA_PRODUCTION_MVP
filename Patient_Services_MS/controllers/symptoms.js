const pool = require("../configs/database");
const CryptoJS = require("crypto-js");
const secretKey = process.env.ENCRYPTION_KEY;

const logVoiceNote = async (req, res) => {
  try {
    const allowedTypes = ["audio/mpeg", "audio/wav", "audio/webm"];

    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    const { user } = req;
    const filePath = `/uploads/${req.file.filename}`;

    const result = await pool.query(
      `INSERT INTO SymptomLogs (user_id, symptom_date, voice_note_path)
       VALUES ($1, CURRENT_DATE, $2)
       RETURNING *`,
      [user.id, filePath]
    );

    res.status(200).json({
      message: "Voice note uploaded and saved to log",
      log: result.rows[0],
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Failed to upload and save voice note" });
  }
};

const logEmotions = async (req, res) => {
  try {
    const { feeling, icon } = req.body;
    const user_id = req.user.id;

    const encryptedFeeling = CryptoJS.AES.encrypt(
      feeling,
      secretKey
    ).toString();
    const encryptedIcon = CryptoJS.AES.encrypt(icon, secretKey).toString();

    const emotions = await pool.query(
      `INSERT INTO SymptomLogs (user_id, feelings, emoji_icon, symptom_date) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [user_id, encryptedFeeling, encryptedIcon, new Date()]
    );

    res.status(201).json({
      message: "Emotion logged successfully",
      data: emotions.rows[0],
    });
  } catch (error) {
    console.error("Error logging emotion:", error);
    res.status(500).json({ error: "There was a server error." });
  }
};

const logCauseOfEmotion = async (req, res) => {
  try {
    const { cause } = req.body;
    const user_id = req.user.id;

    const encryptedCause = CryptoJS.AES.encrypt(cause, secretKey).toString();

    await pool.query(
      "UPDATE SymptomLogs SET emotion_cause = $1 WHERE user_id = $2",
      [encryptedCause, user_id]
    );

    res.status(201).json({ message: "Cause of emotion logged" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "There was an error logging the cause" });
  }
};

const logEmotionsNotes = async (req, res) => {
  try {
    const { formData } = req.body;
    const user_id = req.user.id;

    const encryptedNotes = CryptoJS.AES.encrypt(
      formData.notes,
      secretKey
    ).toString();

    await pool.query(
      `UPDATE SymptomLogs 
       SET notes = $1, updated_at = NOW() 
       WHERE user_id = $2 AND symptom_date = CURRENT_DATE`,
      [encryptedNotes, user_id]
    );
    res.status(200).json({ message: "Notes updated successfully" });
  } catch (error) {
    console.error("Error logging emotion and cause:", error);
    res.status(500).json({ error: "There was a server error." });
  }
};

const getHistory = async (req, res) => {
  try {
    const user_id = req.user.id;

    const history = await pool.query(
      `SELECT * FROM SymptomLogs 
       WHERE user_id = $1 
       ORDER BY symptom_date DESC`,
      [user_id]
    );

    if (history.rows.length === 0) {
      return res.status(404).json({ message: "No history found" });
    }

    const decryptedHistory = history.rows.map((row) => ({
      ...row,
      feelings: row.feelings
        ? CryptoJS.AES.decrypt(row.feelings, secretKey).toString(
            CryptoJS.enc.Utf8
          )
        : null,
      emoji_icon: row.emoji_icon
        ? CryptoJS.AES.decrypt(row.emoji_icon, secretKey).toString(
            CryptoJS.enc.Utf8
          )
        : null,
    }));

    res.status(200).json({
      history: decryptedHistory,
    });
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ message: "There was a server error", error });
  }
};

module.exports = {
  logEmotions,
  logCauseOfEmotion,
  logEmotionsNotes,
  getHistory,
  logVoiceNote,
};
