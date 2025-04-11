import { Route, Routes } from "react-router-dom";
import "./App.css";
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

function App() {
  return (
    <div className="App">
      <Routes>
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
    </div>
  );
}

export default App;
