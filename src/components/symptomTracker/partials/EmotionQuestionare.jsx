import axios from "axios";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const EmotionQuestionare = () => {
  const navigate = useNavigate();

  const handleClick = async (emotion) => {
    try {
      const response = await axios.post(
        "https://ftmwsamij8.execute-api.us-east-1.amazonaws.com/SNS/symptoms/log/emotions",
        emotion,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        navigate("/symptom-tracker/questionare/2");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      console.error("There was a problem adding your symptom:", error);
    }
  };

  return (
    <div className="emotion-questionare">
      <div className="emotion-questionare-container">
        <IoMdClose size={30} className="exit-btn" />
        <>
          <h1 className="title">How are you feeling today?</h1>
        </>
        <div className="emotions-list">
          {[
            { feeling: "Happy", icon: "😊" },
            { feeling: "Sad", icon: "😢" },
            { feeling: "Angry", icon: "😡" },
            { feeling: "Surprised", icon: "😲" },
            { feeling: "Neutral", icon: "😐" },
            { feeling: "Anxious", icon: "😟" },
            { feeling: "Excited", icon: "😄" },
            { feeling: "Tired", icon: "😴" },
            { feeling: "Confused", icon: "😕" },
            { feeling: "Grateful", icon: "🙏" },
            { feeling: "Loved", icon: "❤️" },
            { feeling: "Frustrated", icon: "😤" },
            { feeling: "Hopeful", icon: "🤞" },
            { feeling: "Lonely", icon: "🥺" },
            { feeling: "Proud", icon: "😌" },
          ].map((emotion, index) => (
            <li onClick={() => handleClick(emotion)} key={index}>
              <span className="emotion-background">{emotion.icon}</span>
              <span>{emotion.feeling}</span>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmotionQuestionare;