import React from 'react';
import ProfileSetupForm from '../../Components/dabbawala/ProfileSetupForm';
import './FormsPage.css';



const FormsPage = () => {
  return (
    <div className="forms-container">
      {/* <h1>Forms</h1> */}
    
        <ProfileSetupForm />
  
      {/* <div className="custom-form-section">
        <WeeklyCalendar />
      </div> */}
      {/* Add other forms as needed */}
    </div>
  );
};

export default FormsPage;

