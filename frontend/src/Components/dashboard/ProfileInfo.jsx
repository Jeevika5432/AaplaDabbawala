// ProfileInfo.jsx

import React from 'react';
import ProfileDetails from './ProfileDetails'; // Import the ProfileDetails component
import './ProfileInfo.css';

const ProfileInfo = () => {
 
const profileData = {
    name: 'Sarah Khan',
    locations: ['Dadar', 'Mahim', 'Mumbai Central'],
    contactNumber: '1234567890',
    dailySchedule: 'Mon-Fri: 9 AM - 5 PM',
    categories: ['vegetarian', 'jain'],
    // ... other profile details
  };
       return (
              <>
         <h2>Your Profile</h2>
    <div className="profile-info">
     
      <ProfileDetails {...profileData} /> {/* Pass the profileData to ProfileDetails component */}
                     </div>
                     </>
  );
};

export default ProfileInfo;
