// import React from 'react';
// import Calendar from './Calendar';
// import AppointmentCard from './AppointmentCard';
// import './AppointmentsPage.css';

// const AppointmentPage = () => {
//   return (
//     <div className="appointments-page">
//       <header className="appointments-header">
//         <h1>Appointments</h1>
//         <button className="add-appointment">+</button>
//       </header>

//       <div className="calendar-header">
//         <span>June 2020</span>
//         <div className="calendar-controls">
//           <button>&lt;</button>
//           <button>&gt;</button>
//         </div>
//       </div>

//       <Calendar />

//       <div className="upcoming-appointments">
//         <h3>Upcoming</h3>
//         <AppointmentCard 
//           title="Appointment with Theresa Webb"
//           time="March 6th at 12am to 1pm"
//         />
//         <AppointmentCard 
//           title="Appointment with Octavia"
//           time="March 10th at 1pm to 1:45pm"
//         />
//       </div>

//       <footer className="bottom-nav">
//         <button>Home</button>
//         <button>Stats</button>
//         <button>Appointments</button>
//         <button>MTracker</button>
//         <button>Chat</button>
//       </footer>
//     </div>
//   );
// };

// export default AppointmentPage;



import React, { useState } from 'react';
import Calendar from './Calendar';
import AppointmentCard from './AppointmentCard';
import BottomNavBar from '../common/BottomNavBar';
import '../common/BottomNavBar.css';
import './AppointmentsPage.css';

import PlusIcon from '../../assets/icons/plus.svg';

const AppointmentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className="min-h-screen bg-white text-black font-poppins">
      {/* Header */}
      <header className="flex items-center justify-between p-4">
        <h1 className="text-xl font-semibold">Appointments</h1>
        <img src={PlusIcon} alt="Add" className="w-6 h-6 cursor-pointer" />
      </header>

      {/* Calendar */}
      <section className="px-4 mb-4">
        <Calendar />
      </section>

      {/* Tabs */}
      <div className="flex justify-around mb-4 px-4">
        <button
          className={`flex-1 py-2 rounded-full mx-1 transition-all duration-300 ${
            activeTab === 'upcoming'
              ? 'bg-[#7C3AED] text-white font-semibold shadow-md'
              : 'bg-gray-100 text-black'
          }`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`flex-1 py-2 rounded-full mx-1 transition-all duration-300 ${
            activeTab === 'previous'
              ? 'bg-[#7C3AED] text-white font-semibold shadow-md'
              : 'bg-gray-100 text-black'
          }`}
          onClick={() => setActiveTab('previous')}
        >
          Previous
        </button>
      </div>

      {/* Appointments List */}
      <section className="px-4 mb-20">
        <AppointmentCard
          status="Your appointment is confirmed"
          name="Appointment with Theresa Webb"
          time="March 6th at 12:00am to 1:00pm"
        />
        <AppointmentCard
          status="Your appointment is confirmed"
          name="Appointment with Octavia"
          time="March 10th at 1:00pm to 1:45pm"
        />
      </section>

      {/* Bottom Navigation */}
      <BottomNavBar />
    </div>
  );
};

export default AppointmentPage;
