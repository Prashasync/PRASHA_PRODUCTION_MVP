import React from 'react';
import './SplashScreen2.css';
import splash2Animation from '../../assets/videos/splash2-animation.mp4'; // ✅ Imported properly

const SplashScreen2 = () => {
  return (
    <div className="splash2-container">
      {/* Top text */}
      <div className="text-section">
        <h1>Smart Tracking & Insights</h1>
      </div>

      {/* Video Section */}
      <div className="video-section">
        <video
          className="splash2-video"
          src={splash2Animation}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Description */}
      <div className="description-section">
        <p>
          Answer quick questionnaires and use our symptom tracker to gain deeper
          mental health insights — all in a way that works best for you.
        </p>
      </div>

      {/* Buttons */}
      <div className="button-section">
        <button className="skip-btn">Skip</button>
        <button className="next-btn">Next</button>
      </div>
    </div>
  );
};

export default SplashScreen2;
