const pool = require("../configs/database");

const getPatients = async (req, res) => {
  try {
    const patient = await pool.query(
      "SELECT * FROM Patients WHERE user_id = $1",
      [req.user.id]
    );
    if (patient.rows.length === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.status(200).json({
      user_id: patient.rows[0].user_id,
      patient_id: patient[0].patient_id,
      email: patient.rows[0].email,
      first_name: patient.rows[0].first_name,
      last_name: patient.rows[0].last_name,
      title: patient.rows[0].title,
      middle_name: patient.rows[0].middle_name,
      dob: patient.rows[0].dob,
      gender: patient.rows[0].gender,
      language: patient.rows[0].language,
      religion: patient.rows[0].religion,
      address: patient.rows[0].address,
      phone: patient.rows[0].phone,
      interests: patient.rows[0].interests,
      treatment: patient.rows[0].treatment,
      health_score: patient.rows[0].health_score,
      under_medications: patient.rows[0].under_medications,
      created_at: patient.rows[0].created_at,
      updated_at: patient.rows[0].updated_at,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const getOnboardingStatus = async (req, res) => {
  try {
    const user_id = req.user.id;
    const onboardingStatus = await pool.query(
      `SELECT * FROM onboardingStatus WHERE user_id = $1`,
      [user_id]
    );
    if (!onboardingStatus) {
      return res.status(400).json({ message: "No user found" });
    }
    res.status(200).json({
      onboardingStatus: onboardingStatus.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "There was server side error", error });
  }
};

const postOnboardingStatus = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { question_number, selectedOptions } = req.body;

    const userFound = await pool.query(
      `SELECT * FROM Users WHERE user_id = $1`,
      [user_id]
    );
    if (userFound.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    await pool.query(
      `INSERT INTO OnboardingStatus (user_id, question_number, selected_options)
       VALUES ($1, $2, $3::jsonb)
       ON CONFLICT (user_id, question_number)
       DO UPDATE SET selected_options = EXCLUDED.selected_options, updated_at = NOW()`,
      [user_id, question_number, JSON.stringify(selectedOptions)]
    );

    res.status(200).json({
      message: "Question saved",
      data: { question_number, selectedOptions },
    });
  } catch (error) {
    console.error("Error saving onboarding status:", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getPatients, getOnboardingStatus, postOnboardingStatus };
