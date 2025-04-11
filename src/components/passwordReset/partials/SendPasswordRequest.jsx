import React, { useState } from "react";
import axios from "axios";

const SendPasswordRequest = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("");

  const requestOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/users/password-recovery",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        console.log(response);
        return;
      }
      setStep(2);
      setStatus("OTP sent to your email.");
    } catch (error) {
      setStatus(error.response?.data?.message || "An error occurred.");
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users/verify-otp", { email, otp });
      setStep(3);
      setStatus("Reset link has been sent to your email.");
    } catch (error) {
      setStatus(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="forgot-password">
      <h2>Password Reset</h2>

      {step === 1 && (
        <form onSubmit={requestOtp}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Send OTP</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={verifyOtp}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            required
            onChange={(e) => setOtp(e.target.value)}
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}

      {step === 3 && <p>Please check your email for the reset link.</p>}

      {status && <p>{status}</p>}
    </div>
  );
};

export default SendPasswordRequest;
