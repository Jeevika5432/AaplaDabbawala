import React, { useState } from 'react';

const AvailabilityStatus = () => {
  // State variable to store availability status (true if available, false if unavailable)
  const [isAvailable, setIsAvailable] = useState(true);

  // Function to handle toggle switch change
  const handleToggleChange = () => {
    setIsAvailable((prev) => !prev);
  };

  return (
    <div>
      <h2>Availability Status</h2>
      <label>
        {isAvailable ? 'Available' : 'Unavailable'}
        <input
          type="checkbox"
          checked={isAvailable}
          onChange={handleToggleChange}
        />
      </label>
    </div>
  );
};

export default AvailabilityStatus;
