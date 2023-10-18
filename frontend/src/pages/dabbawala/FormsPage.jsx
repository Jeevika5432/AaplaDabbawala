import React from 'react';
import ProfileSetupForm from '../../Components/dabbawala/ProfileSetupForm';


const FormsPage = () => {
  return (
    <div className="forms-container">
      {/* <h1>Forms</h1> */}
      <div className="custom-form-section">
        <ProfileSetupForm />
      </div>
      {/* <div className="custom-form-section">
        <WeeklyCalendar />
      </div> */}
      {/* Add other forms as needed */}
    </div>
  );
};

export default FormsPage;

