// import React from 'react';

// const moods = [
//   { date: 'Mon', mood: '😊' },
//   { date: 'Tue', mood: '😐' },
//   { date: 'Wed', mood: '😢' },
//   { date: 'Thu', mood: '😊' },
//   { date: 'Fri', mood: '😡' },
// ];

// const MoodHistoryCard: React.FC = () => {
//   return (
//     <div className="bg-white rounded-xl p-4 shadow-md">
//       <h2 className="text-lg font-semibold mb-3">Weekly Mood History</h2>
//       <div className="space-y-2">
//         {moods.map((entry, index) => (
//           <div
//             key={index}
//             className="flex justify-between items-center bg-gray-100 p-2 rounded-lg"
//           >
//             <span className="text-sm">{entry.date}</span>
//             <span className="text-2xl">{entry.mood}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MoodHistoryCard;



import React from 'react';
import HappyIcon from '../../assets/icons/happy-face.svg';
import veryHappy from '../../assets/icons/beaming-face-with-smiling-eyes.svg';
import Neutral from '../../assets/icons/neutral-face.svg';
import SadIcon from '../../assets/icons/disappointed-face.svg';
import deepSad from '../../assets/icons/tired-face.svg';

const MoodHistoryCard: React.FC = () => {
  // Dynamic mood history data
  const moodHistory = [
    { day: 'Mon', mood: 'happy' },
    { day: 'Tue', mood: 'neutral' },
    { day: 'Wed', mood: 'veryHappy' },
    { day: 'Thu', mood: 'happy' },
    { day: 'Fri', mood: 'deepSad' },
    { day: 'Sat', mood: 'sad' },
    { day: 'Sun', mood: 'happy' },
  ];

  // Mood to icon mapping
  const moodIcons: { [key: string]: string } = {
    happy: HappyIcon,
    neutral:Neutral ,
    veryHappy: veryHappy,
    sad: SadIcon,
   deepSad: deepSad,
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-md">
      {/* Heading */}
      <h2 className="text-lg font-semibold mb-4">Weekly Mood History</h2>

      {/* Mood List */}
      <div className="space-y-2">
        {moodHistory.map((entry) => (
          <div
            key={entry.day}
            className="flex justify-between items-center bg-gray-100 rounded-md p-2"
          >
            <span className="text-sm font-medium">{entry.day}</span>
            <img src={moodIcons[entry.mood]} alt={entry.mood} className="w-6 h-6" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodHistoryCard;
