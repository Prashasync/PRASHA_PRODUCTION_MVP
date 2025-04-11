import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Background from "./partials/Background";
import Navigation from "../Navigation/Navigation";
import AddSymptom from "./partials/AddSymptom";
import EmotionHistory from "./partials/EmotionsHistory";
import { useNavigate } from "react-router-dom";
import Emoji from "./partials/Emotion";
import "./symptoms.css";
import axios from "axios";

const SymptomTracker = () => {
  const navigate = useNavigate();
  const [symptomTrackerHistory, setSymptomTrackerHistory] = useState("");

  const handleClick = () => {
    navigate("/symptom-tracker/questionare/1");
  };

  const retreiveSymptomTrackerHistory = async () => {
    try {
      const response = await axios.get(
        `https://ftmwsamij8.execute-api.us-east-1.amazonaws.com/SNS/symptoms/history`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setSymptomTrackerHistory(response.data.history);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        console.error("Error fetching symptom tracker history:", error);
      }
    }
  };

  useEffect(() => {
    retreiveSymptomTrackerHistory();
  }, [navigate]);

  return (
    <div className="symptom-tracker">
      <Header />
      <h1>Symptom Tracking</h1>
      <Background />
      <Emoji symptomTrackerHistory={symptomTrackerHistory} />
      <AddSymptom handleClick={handleClick} />
      <EmotionHistory symptomTrackerHistory={symptomTrackerHistory} />
      <Navigation />
    </div>
  );
};

export default SymptomTracker;
