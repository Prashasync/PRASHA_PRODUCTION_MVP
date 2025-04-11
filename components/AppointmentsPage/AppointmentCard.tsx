// import React from 'react';

// interface AppointmentCardProps {
//   title: string;
//   time: string;
// }

// const AppointmentCard: React.FC<AppointmentCardProps> = ({ title, time }) => {
//   return (
//     <div className="appointment-card">
//       <h4>{title}</h4>
//       <p>{time}</p>
//     </div>
//   );
// };

// export default AppointmentCard;

import React from 'react';
import './AppointmentsPage.css';
import CheckIcon from '../../assets/icons/check.svg'; // Use your existing icons

interface AppointmentCardProps {
  status: string;
  name: string;
  time: string;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ status, name, time }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4">
      {/* Status */}
      <div className="flex items-center mb-2 text-green-600 text-sm font-medium">
        <img src={CheckIcon} alt="Confirmed" className="w-4 h-4 mr-2" />
        {status}
      </div>

      {/* Appointment Name */}
      <div className="text-base font-semibold text-black mb-1">{name}</div>

      {/* Time */}
      <div className="text-sm text-gray-500">{time}</div>
    </div>
  );
};

export default AppointmentCard;
