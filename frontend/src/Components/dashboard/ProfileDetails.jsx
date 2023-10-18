// ProfileDetails.jsx

import React from 'react';
import './ProfileDeets.css';

const ProfileDetails = ({ name, locations, contactNumber, dailySchedule, categories }) => {
  return (
    <div className="profile-details-container">
      <div className="profile-details">
        <div>
          <label>
            <strong>Name:</strong> {name || 'Sarah Khan'}
          </label>
        </div>
        <div>
          <label>
            <strong>Locations:</strong> {locations.join(', ') || 'Dadar, Mahim, Mumbai Central'}
          </label>
        </div>
        <div>
          <label>
            <strong>Contact Number:</strong> {contactNumber || 'N/A'}
          </label>
        </div>
        <div>
          <label>
            <strong>Daily Schedule:</strong> {dailySchedule || 'Mon-Fri: 9 AM - 5 PM'}
          </label>
        </div>
        <div>
          <label>
            <strong>Categories:</strong>
          </label>
          <ul>
            <li>Vegetarian: {categories.includes('vegetarian') ? 'Yes' : 'No'}</li>
            <li>Jain: {categories.includes('jain') ? 'Yes' : 'No'}</li>
            <li>Non-Vegetarian: {categories.includes('non-vegetarian') ? 'Yes' : 'No'}</li>
          </ul>
        </div>
      </div>
      <button className="edit-profile-button">Edit Profile</button>
    </div>
  );
};

export default ProfileDetails;
