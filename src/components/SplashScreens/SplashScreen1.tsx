import React from 'react';
import './SplashScreen1.css';
import { useNavigate } from 'react-router-dom';
import splashVideo from '../../assets/videos/splash1-animation.mp4';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="splash-container1">
      {/* Video Background */}
      <div className="video-wrapper">
        <video autoPlay loop muted playsInline className="splash-video">
          <source src={splashVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Text Section */}
      <div className="text-section">
        <h1>Welcome to Prasha sync</h1>
        <h2>Your Mental Wellness, Simplified</h2>
        <p>
          Track your mood, monitor symptoms, and get personalized insights to improve your well-being.
        </p>
      </div>

      {/* Get Started Button */}
      <button className="get-started-btn" onClick={() => navigate('/home')}>
        Get Started
      </button>

      {/* Login Link */}
      <p className="login-link">
        Already have an account? <span onClick={() => navigate('/login')}>Login</span>
      </p>
    </div>
  );
};

export default SplashScreen;

