const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendOTP, sendOTPSMS } = require("../services/otp.service");

exports.register = async (req, res) => {
  const { email, password, phone } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 mins

  try {
    const user = await db.User.create({
      email,
      phone,
      password: hashedPassword,
      otp,
      otpExpiresAt,
      otpRequestedAt: new Date(),
      otpattempts: 0,
    });

    await sendOTP(email, otp);
    if (phone) await sendOTPSMS(phone, otp);
    res
      .status(200)
      .json({ message: "User registered, OTP sent", otpId: user.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await db.User.findOne({ where: { email } });

  if (!user) return res.status(400).json({ message: "User not found" });

  // Check if user is blocked
  if (user.blockeduntil && new Date() < new Date(user.blockeduntil)) {
    return res
      .status(403)
      .json({ message: "Too many failed attempts. Try again later." });
  }

  // Invalid or expired OTP
  if (!user.otp || user.otp !== otp || new Date() > user.otpExpiresAt) {
    user.otpattempts += 1; // Increase OTP attempts
    await user.save(); 
    if (user.otpattempts >= 5) {
      const blockTime = new Date(Date.now() + 15 * 60 * 1000); // Block for 15 mins
      user.blockeduntil = blockTime;
      user.otpblockeduntil = blockTime;
      await user.save(); // Save block time
      return res
        .status(403)
        .json({ message: "Too many failed attempts. Try after 15 mins." });
    }
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  // Successful OTP verification
  user.isVerified = true;
  user.otp = null;
  user.otpattempts = 0; // Reset attempts
  user.otpRequestedAt = null;
  await user.save();

  // Generate JWT Token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(200).json({ message: "OTP verified successfully", token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await db.User.findOne({ where: { email } });

  if (!user || !user.isVerified) {
    return res.status(400).json({ message: "User not found or not verified" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Wrong password" });

  // Prevent multiple OTP requests within 1 minute

  if (user.otpRequestedAt && user.otpExpiresAt && new Date() < new Date(user.otpExpiresAt)) {
    const timeDiff =
      new Date().getTime() - new Date(user.otpRequestedAt).getTime();

    if (timeDiff < 60000) {
      return res
        .status(429)
        .json({ message: "OTP request limit exceeded. Try after 1 min." });
    }
  }

  // Generate and send new OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
  user.otpRequestedAt = new Date();
  await user.save();

  await sendOTP(email, otp);
  if (user.phone) await sendOTPSMS(user.phone, otp);

  res.status(200).json({ message: "User logged in, OTP sent", otpId: user.id });
};

