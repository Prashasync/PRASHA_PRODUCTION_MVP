import React from 'react';
import './SplashScreen.css';
import logo from '../../assets/icons/prasha-logo.svg'; // Ensure correct logo path

const SplashScreen = () => {
  return (
    <div className="splash-container bg-primary">
      <img src={logo} alt="Prasha Sync Logo" className="logo" />
    </div>
  );
};

export default SplashScreen;
