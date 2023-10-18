import React, { useState } from 'react';

const MealDetailsForm = () => {
  // State variables to store form data
  const [mealType, setMealType] = useState('');
  const [mainDish, setMainDish] = useState('');
  const [sideDishes, setSideDishes] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform any necessary validation before submitting data
    // ...

    // Assuming you want to log the data for now
    console.log({
      mealType,
      mainDish,
      sideDishes,
      specialInstructions,
    });

    // You can send this data to your backend for further processing and storage
    // Example: API call or dispatch an action if using Redux
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Meal Type:
        <input
          type="text"
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          required
        />
      </label>
      <br />

      <label>
        Main Dish:
        <input
          type="text"
          value={mainDish}
          onChange={(e) => setMainDish(e.target.value)}
          required
        />
      </label>
      <br />

      <label>
        Side Dishes:
        <input
          type="text"
          value={sideDishes}
          onChange={(e) => setSideDishes(e.target.value)}
        />
      </label>
      <br />

      <label>
        Special Instructions:
        <textarea
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
        />
      </label>
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default MealDetailsForm;
