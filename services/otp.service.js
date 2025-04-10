// const nodemailer = require("nodemailer");
// const twilio = require("twilio");
// require("dotenv").config();
// const logger = require("../utils/logger");

// // Twilio Setup
// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_FROM,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// exports.sendOTP = async (to, otp, method = "email") => {
//   try {
//     const otpId = Math.random().toString(36).substr(2, 9);

//     if (method === "email") {
//       await transporter.sendMail({
//         from: process.env.EMAIL_FROM,
//         to,
//         subject: "Your OTP Code",
//         html: `<h3>Your OTP is: <strong>${otp}</strong></h3><p>It is valid for 5 minutes.</p>`,
//       });
//       logger.info(`OTP sent to email: ${to}, OTP ID: ${otpId}`);
//     } else if (method === "sms") {
//       await twilioClient.messages.create({
//         body: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
//         from: process.env.TWILIO_PHONE_NUMBER,
//         to,
//       });
//       logger.info(`OTP sent via SMS to: ${to}, OTP ID: ${otpId}`);
//     }

//     return otpId;
//   } catch (error) {
//     logger.error(`Failed to send OTP: ${error.message}`);
//     throw new Error("OTP delivery failed");
//   }
// };