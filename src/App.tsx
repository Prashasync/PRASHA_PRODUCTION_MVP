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
import OnboardingQuestion from "./components/onboarding/Onboarding";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Otp from "./components/otp/Otp";
import SymptomTracker from "./components/symptomTracker/SymptomTracker";
import EmotionQuestionare from "./components/symptomTracker/partials/EmotionQuestionare";
import CauseOfFeeling from "./components/symptomTracker/partials/CauseOfEmotions";
import NotesForEmotions from "./components/symptomTracker/partials/NotesForEmotions";
import RecordAVoiceNote from "./components/symptomTracker/partials/RecordAVoiceNote";
import Messages from "./components/messages/Messages";
import MessageModal from "./components/messages/partials/ChatScreen";
import MilestoneList from "./components/milestones/MilestoneList";
import KidTimeline from "./components/milestones/partials/KidTimeLine";
import ForgotPassword from "./components/passwordReset/ForgotPassword";

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
          
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<OnboardingQuestion />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/symptom-tracker" element={<SymptomTracker />} />
          <Route
            path="/symptom-tracker/questionare/1"
            element={<EmotionQuestionare />}
          />
          <Route
            path="/symptom-tracker/questionare/2"
            element={<CauseOfFeeling />}
          />
          <Route
            path="/symptom-tracker/questionare/3"
            element={<NotesForEmotions />}
          />
          <Route
            path="/symptom-tracker/questionare/4"
            element={<RecordAVoiceNote />}
          />
          <Route path="password-reset" element={<ForgotPassword />}></Route>
          <Route path="/messages" element={<Messages />} />
          <Route path="/messages/:id" element={<MessageModal />} />
          <Route path="/milestones" element={<MilestoneList />} />
          <Route path="/milestones/:title" element={<KidTimeline />} />
          <Route
            path="*"
            element={<h1 style={{ textAlign: "center" }}>404 Not Found</h1>}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
