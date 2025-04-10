import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosStats } from "react-icons/io";
import { CiCalendarDate, CiFaceFrown } from "react-icons/ci";
import { IoIosPerson } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./navigation.css";

const Navigation = () => {
  return (
    <div className="nav-bar">
      <ul className="nav-links">
        <Link to="/">
          <li>
            <IoHomeOutline size={30} />
          </li>
        </Link>
        <Link to="/">
          <li>
            <IoIosStats size={30} />
          </li>
        </Link>
        <Link to="/">
          <li>
            <CiCalendarDate size={30} />
          </li>
        </Link>
        <Link to="/milestones">
          <li>
            <IoTimeOutline size={30} />
          </li>
        </Link>
        <Link to="/">
          <li>
            <IoIosPerson size={30} />
          </li>
        </Link>
        <Link to="/symptom-tracker">
          <li>
            <CiFaceFrown size={30} />
          </li>
        </Link>
        <Link to="/messages">
          <li>
            <IoChatbubbleEllipsesOutline size={30} />
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Navigation;