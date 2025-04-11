import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Splash Screens
import SplashScreen from './components/SplashScreens/SplashScreen';
import SplashScreen1 from './components/SplashScreens/SplashScreen1';
import SplashScreen2 from './components/SplashScreens/SplashScreen2';
import SplashScreen3 from './components/SplashScreens/SplashScreen3'; 

// Main Screens
import HomeScreen from './components/HomeScreenPage/HomeScreen';
import Dashboard from './components/DashboardScreen/dashboard';
import AppointmentPage from './components/AppointmentsPage/AppointmentPage';

const App: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <Router>
        <Routes>
          {/* Splash Screens */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/splashscreen1" element={<SplashScreen1 />} />
          <Route path="/splashscreen2" element={<SplashScreen2 />} />
          <Route path="/splashscreen3" element={<SplashScreen3 />} />

          {/* Main Screens */}
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<AppointmentPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
