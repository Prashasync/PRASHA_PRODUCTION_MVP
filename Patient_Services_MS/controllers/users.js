const pool = require("../configs/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const JWT_SECRET = process.env.JWT_SECRET;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const registerUser = async (req, res) => {
  try {
    const { email, first_name, last_name, password, title, gender } = req.body;
    const userCheck = await pool.query("SELECT * FROM Users WHERE email = $1", [
      email,
    ]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (email, first_name, last_name, password_hash, title, gender) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [email, first_name, last_name, hashedPassword, title, gender]
    );

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign({ id: newUser.rows[0].id }, JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV,
      maxAge: 3600000,
      sameSite: "strict",
    });

    const patientCheck = await pool.query(
      ` SELECT * FROM patients WHERE user_id = $1`,
      [newUser.rows[0].id]
    );

    if (patientCheck.rows.length > 0) {
      return res.status(400).json({ message: "Patient already created" });
    }

    await pool.query(
      "INSERT INTO Patients (user_id, first_name, last_name, gender, email) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [newUser.rows[0].user_id, first_name, last_name, gender, email]
    );

    res.status(201).json({
      message: "Account created successfully!",
      user: {
        user_id: newUser.rows[0].user_id,
        email: newUser.rows[0].email,
        first_name: newUser.rows[0].first_name,
        last_name: newUser.rows[0].last_name,
        roles: newUser.rows[0].roles,
        gender: newUser.rows[0].gender,
        title: newUser.rows[0].title,
        is_active: newUser.rows[0].is_active,
        is_deleted: newUser.rows[0].is_deleted,
        updated_at: newUser.rows[0].updated_at,
        created_at: newUser.rows[0].created_at,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const user = await pool.query("SELECT * FROM Users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    if (!user.rows[0].password_hash) {
      return res
        .status(400)
        .json({
          error:
            "This account was created with Google. Please use 'Sign in with Google'.",
        });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password_hash
    );
  
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.rows[0].user_id }, JWT_SECRET, {
      expiresIn: "15m",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Login successful!",
      user: {
        user_id: user.rows[0].user_id,
        email: user.rows[0].email,
        first_name: user.rows[0].first_name,
        last_name: user.rows[0].last_name,
        roles: user.rows[0].roles,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const createGoogleUser = async (req, res) => {
  const { credential, clientId } = req.body;
  if (!credential)
    return res.status(400).json({ message: "No token provided" });

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    const { email, given_name, family_name, sub } = payload;

    const normalizedEmail = email.toLowerCase();

    let user = await pool.query("SELECT * FROM users WHERE email = $1", [
      normalizedEmail,
    ]);

    if (user.rows.length === 0) {
      const newUser = await pool.query(
        `INSERT INTO users (email, first_name, last_name, provider, google_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
        [normalizedEmail, given_name, family_name, "google", sub]
      );
      user = newUser;

      await pool.query(
        "INSERT INTO Patients (user_id, first_name, last_name, email) VALUES ($1, $2, $3, $4) RETURNING *",
        [user.rows[0].user_id, given_name, family_name, normalizedEmail]
      );
    }

    const jwtToken = jwt.sign(
      { id: user.rows[0].user_id, email: user.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
      sameSite: "lax",
    });

    res.status(200).json({ user: user.rows[0] });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({ message: "Token verification failed" });
  }
};

const passwordReset = async (req, res) => {
  try {
    const {email} = req.body;
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}

module.exports = { registerUser, loginUser, createGoogleUser, passwordReset };
