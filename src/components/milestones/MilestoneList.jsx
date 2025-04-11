import Navigation from "../Navigation/Navigation";
import MilestoneCard from "./partials/MilestoneCard";
import "./milestone.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MilestoneList = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `https://ftmwsamij8.execute-api.us-east-1.amazonaws.com/SNS/auth/check`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }
  return (
    <div className="milestone-container">
      <div className="milestone-header">
        <h2>
          Your Milestones,
          <br />
          Your Story
        </h2>
        <p>
          Track and celebrate milestones—personal achievements, baby moments, or
          life events—all in one place.
        </p>
      </div>

      <MilestoneCard
        title="My Improvement"
        date="03/07/2025"
        image="image-url.jpg"
      />
      <MilestoneCard
        title="Kid Timeline"
        date="02/20/2025"
        image="image-url.jpg"
      />

      <button className="milestone-add">+</button>
      <Navigation />
    </div>
  );
};

export default MilestoneList;
