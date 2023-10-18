import React, { useState } from 'react';

const MealScheduleCalendar = () => {
  // Sample data for demonstration (replace with actual data structure)
  const [mealSchedule, setMealSchedule] = useState({
    '2023-10-01': 'Vegetarian Curry',
    '2023-10-02': 'Pasta with Tomato Sauce',
    // Add more entries as needed
  });

  // Function to handle meal schedule updates
  const handleScheduleUpdate = (date, meal) => {
    setMealSchedule((prevSchedule) => ({
      ...prevSchedule,
      [date]: meal,
    }));
  };

  return (
    <div>
      <h2>Meal Schedule Calendar</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Meal</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(mealSchedule).map(([date, meal]) => (
            <tr key={date}>
              <td>{date}</td>
              <td>{meal}</td>
              <td>
                <button onClick={() => handleScheduleUpdate(date, 'New Meal')}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MealScheduleCalendar;
