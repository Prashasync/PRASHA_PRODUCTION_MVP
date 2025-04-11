import React, { useState, useEffect } from "react";
import QuestionOne from "./partials/QuestionOne";
import QuestionTwo from "./partials/QuestionTwo";
import QuestionThree from "./partials/QuestionThree";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./onboarding.css";

const Onboarding = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserProgress = async () => {
    try {
      const response = await axios.get(
        `https://ftmwsamij8.execute-api.us-east-1.amazonaws.com/SNS/patients/onboarding-status`,
        { withCredentials: true }
      );

      if (!response.data.onboardingStatus) {
        setCurrentQuestion(1);
        return;
      }

      if (response.data.onboardingStatus.length + 1 === 4) {
        navigate("/symptom-tracker");
      }
      setCurrentQuestion(response.data.onboardingStatus.length + 1);
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.error("Error fetching user progress:", error);
    }
  };

  useEffect(() => {
    const initializeOnboarding = async () => {
      await fetchUserProgress();
      setLoading(false);
    };
    initializeOnboarding();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="onboarding-questions">
      <div className="title">
        <h1>Personalized Wellness Starts Here</h1>
        {currentQuestion === 1 && (
          <QuestionOne setCurrentQuestion={setCurrentQuestion} />
        )}
        {currentQuestion === 2 && (
          <QuestionTwo setCurrentQuestion={setCurrentQuestion} />
        )}
        {currentQuestion === 3 && (
          <QuestionThree setCurrentQuestion={setCurrentQuestion} />
        )}
      </div>
    </div>
  );
};

export default Onboarding;
