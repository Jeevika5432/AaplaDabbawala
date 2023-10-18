import React, { useState } from 'react';
import './WeeklyCalendar.css'; // Import CSS file for styling

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const WeeklyCalendar = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [mealDetails, setMealDetails] = useState({
    menu: 'Current Menu',
    photoUrl: 'Current Photo URL',
  });
  const [editedMenu, setEditedMenu] = useState('');
       const [editedPhoto, setEditedPhoto] = useState('');
       const [isModalVisible, setIsModalVisible] = useState(true);

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setSelectedMeal(null);
    setIsEditing(false);
  };

   const handleMealClick = (meal) => {
    setSelectedMeal(meal);
    setIsEditing(false);
    setIsModalVisible(true); // Set modal visibility to true when a meal is clicked
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedMenu(mealDetails.menu);
    setEditedPhoto(mealDetails.photoUrl);
  };

  const handleSaveClick = () => {
    // Update the meal details dynamically
    setMealDetails({
      menu: editedMenu,
      photoUrl: editedPhoto,
    });
    setIsEditing(false);
  };

  const handleSaveAndCloseClick = () => {
    // Update the meal details dynamically
    setMealDetails({
      menu: editedMenu,
      photoUrl: editedPhoto,
    });

    setIsEditing(false);
    setIsModalVisible(false); // Set modal visibility to false

    // Show alert
    alert('Meal added successfully!');

    // Perform any action to add the meal to the database
    // For example, make an API call or dispatch an action if using Redux
  };
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="weekly-calendar">
      <div className="days-of-week">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className={`day ${selectedDay === day ? 'selected' : ''}`}
            onClick={() => handleDayClick(day)}
          >
            {day}
          </div>
        ))}
      </div>

                {selectedDay && (
                       
        <div className="meal-options">
          <div className="meal" onClick={() => handleMealClick('Breakfast')}>
            Breakfast
          </div>
          <div className="meal" onClick={() => handleMealClick('Lunch')}>
            Lunch
          </div>
          <div className="meal" onClick={() => handleMealClick('Dinner')}>
            Dinner
          </div>
          {/* Add more meals as needed */}
        </div>
      )}

      {selectedMeal && (
        <div className={`meal-details-modal ${isEditing ? 'editing' : ''}`} style={{ display: isModalVisible ? 'flex' : 'none' }}>
          <div className="modal-content">
            <h3>{`Meal Details for ${selectedDay} - ${selectedMeal}`}</h3>
            {isEditing ? (
              <>
                <label>
                  Menu:
                  <input
                    type="text"
                    value={editedMenu}
                    onChange={(e) => setEditedMenu(e.target.value)}
                  />
                </label>
                <label>
                  Photo URL:
                  <input
                    type="text"
                    value={editedPhoto}
                    onChange={(e) => setEditedPhoto(e.target.value)}
                  />
                </label>
                <div className="button-group">
                  <button onClick={handleSaveClick}>Save</button>
                  <button onClick={handleCancelClick}>Cancel</button>
                  
                </div>
              </>
            ) : (
              <>
                <p>Menu: {mealDetails.menu}</p>
                <img src={mealDetails.photoUrl} alt="Meal" />
                                                          <button onClick={handleEditClick}>Edit</button>
                                                          <button onClick={handleSaveAndCloseClick}>Save & Close</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyCalendar;
