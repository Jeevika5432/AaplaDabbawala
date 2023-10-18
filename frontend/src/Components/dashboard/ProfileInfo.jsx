import React, { useEffect } from 'react';
import ProfileDetails from './ProfileDetails';
import './ProfileInfo.css';

import { DabbaContext } from '../../context/DabbaContext';
import { useContext } from 'react';

const ProfileInfo = () => {
  const { isLoggedInD, checkDabbaLoggedIn, handleLogout2 } = useContext(DabbaContext);

  // Directly access the Dabbawala data from localStorage
  const storedDabbawalaData = localStorage.getItem('dabbawalaData');
  const dabbaa = JSON.parse(storedDabbawalaData) || {}; // Parse the data or set to an empty object if it doesn't exist

  const profileData = {
    name: dabbaa.name,
    locations: dabbaa.locations,
    contactNumber: dabbaa.phone,
    dailySchedule: dabbaa.dailySchedule,
    jain: dabbaa.jain,
    veg: dabbaa.veg,
    nonVeg: dabbaa.nonVeg,
  };

  return (
    <>
      <h2>Your Profile</h2>
      <div className="profile-info">
        <ProfileDetails {...profileData} />
      </div>
    </>
  );
};

export default ProfileInfo;
