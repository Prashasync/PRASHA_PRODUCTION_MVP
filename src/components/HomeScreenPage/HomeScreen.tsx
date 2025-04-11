import React from "react";
import BottomNavBar from '../common/BottomNavBar';
import '../common/BottomNavBar.css';
import Notifications from "./Notifications";
import MoodHealthOverview from "./MoodHealthOverview";

import gridIcon from "../../assets/icons/grid-line.svg";
import searchIcon from "../../assets/icons/search_line.svg";
import bellIcon from "../../assets/icons/Union.png";
import filterIcon from "../../assets/icons/filter-icon.svg";

const HomeScreen = () => {
  const patientName = "Matt";

  return (
    <div className="relative mx-auto px-4 pt-8 pb-24 max-w-7xl w-full bg-white min-h-screen">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <button>
          <img src={gridIcon} alt="Menu" className="w-5 h-5" />
        </button>
        <div className="flex gap-4">
          <button>
            <img src={searchIcon} alt="Search" className="w-5 h-5" />
          </button>
          <button>
            <img src={bellIcon} alt="Notifications" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="text-3xl md:text-4xl font-semibold leading-snug mb-8">
        Hello, {patientName}. <br /> You’ve taken a step to care for yourself.
      </div>

      {/* Health Overview - ✅ Clean as per Figma */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-100 rounded-xl flex flex-col justify-center items-center p-6">
          <img
            src="/src/assets/icons/youlookHappy.svg"
            alt="Mood"
            className="w-16 h-16" // ✅ Size good, text removed
          />
        </div>

        <div className="bg-purple-100 rounded-xl flex flex-col justify-center items-center p-6">
          <img
            src="/src/assets/icons/heartHealth.svg"
            alt="Heart Health"
            className="w-16 h-16" // ✅ Size good, text removed
          />
        </div>
      </div>

      {/* Notifications */}
      <Notifications />

      {/* Floating Filter Icon */}
      <img
        src={filterIcon}
        alt="Filter"
        className="fixed bottom-20 right-6 z-50 w-20 h-20"
      />

      {/* Bottom Navigation */}
      <BottomNavBar />
    </div>
  );
};

export default HomeScreen;
