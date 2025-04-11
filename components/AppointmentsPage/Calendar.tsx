// import React, { useState } from 'react';
// import './AppointmentsPage.css';

// const Calendar: React.FC = () => {
//   const [currentMonth] = useState('Mar 2025');
//   const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//   const dates = Array.from({ length: 30 }, (_, i) => i + 1);
//   const activeDate = 4;

//   return (
//     <div className="bg-white rounded-xl p-4 shadow-md">
//       {/* Month and Arrows */}
//       <div className="flex justify-between items-center mb-4">
//         <span className="font-semibold">{currentMonth}</span>
//         <div className="flex space-x-2">
//           <button className="text-xl">&lt;</button>
//           <button className="text-xl">&gt;</button>
//         </div>
//       </div>

//       {/* Week Days */}
//       <div className="grid grid-cols-7 text-center text-sm mb-2">
//         {days.map((day) => (
//           <div key={day} className="font-medium text-gray-600">
//             {day}
//           </div>
//         ))}
//       </div>

//       {/* Dates */}
//       <div className="grid grid-cols-7 text-center text-sm gap-y-2">
//         {dates.map((date) => (
//           <div
//             key={date}
//             className={`flex items-center justify-center w-8 h-8 rounded-full mx-auto ${
//               date === activeDate ? 'bg-gray-200 font-bold' : ''
//             }`}
//           >
//             {date}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Calendar;

import React, { useState } from "react";
import LeftArrow from "../../assets/icons/left-arrow.svg";
import RightArrow from "../../assets/icons/right-arrow.svg";

const Calendar: React.FC = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get number of days in a month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get the day the month starts on
  const getStartDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const startDay = getStartDayOfMonth(currentMonth, currentYear);

  const daysArray = Array.from({ length: startDay }, () => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const months = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec",
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-semibold text-lg">Appointments</h2>
          <p className="text-sm text-gray-600">
            {months[currentMonth]} {currentYear}
          </p>
        </div>
        <div className="flex space-x-2">
          <button onClick={goToPreviousMonth}>
            <img src={LeftArrow} alt="Previous" className="w-5 h-5" />
          </button>
          <button onClick={goToNextMonth}>
            <img src={RightArrow} alt="Next" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 text-center text-sm gap-y-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-gray-700 font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* Days in Month */}
      <div className="grid grid-cols-7 text-center text-sm gap-y-2 mt-2">
        {daysArray.map((day, index) =>
          day ? (
            <div
              key={index}
              className={`w-8 h-8 flex items-center justify-center mx-auto rounded-full ${
                day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear()
                  ? "bg-gray-300 text-black"
                  : "text-gray-700"
              }`}
            >
              {day}
            </div>
          ) : (
            <div key={index}></div>
          )
        )}
      </div>
    </div>
  );
};

export default Calendar;
