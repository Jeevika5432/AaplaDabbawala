import React, { useState } from 'react';
import './ProfileSetupForm.css';
import { Link } from 'react-router-dom';


const ProfileSetupForm = () => {
  // State variables to store form data
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [deliveryPrice, setDeliveryPrice] = useState('');
  const [foodMenu, setFoodMenu] = useState('');
  const [categories, setCategories] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [dailySchedule, setDailySchedule] = useState('');
  const [locations, setLocations] = useState([]);
  const [locationInput, setLocationInput] = useState('');

  // Food details states
  const [jainFoodDetails, setJainFoodDetails] = useState({ foodName: '', foodPrice: '' });
  const [vegetarianFoodDetails, setVegetarianFoodDetails] = useState({ foodName: '', foodPrice: '' });
  const [nonVegetarianFoodDetails, setNonVegetarianFoodDetails] = useState({ foodName: '', foodPrice: '' });

  // Helper functions
  const handleLocationChange = (e) => setLocationInput(e.target.value);

  const handleAddLocation = () => {
    if (locationInput.trim() !== '' && !locations.includes(locationInput)) {
      setLocations([...locations, locationInput]);
      setLocationInput('');
    }
  };

  const handleRemoveLocation = (index) => setLocations(locations.filter((_, i) => i !== index));

  const handleProfilePhotoChange = (e) => setProfilePhoto(e.target.files[0]);

  const handleCategoryChange = (category) => {
    setCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const handleFoodDetailsChange = (category, e) => {
    const { name, value } = e.target;
    switch (category) {
      case 'jain':
        setJainFoodDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
        break;
      case 'vegetarian':
        setVegetarianFoodDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
        break;
      case 'non-vegetarian':
        setNonVegetarianFoodDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
        break;
      default:
        break;
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Log the data for now
    console.log({
      name,
      contactNumber,
      deliveryPrice,
      foodMenu,
      categories,
      profilePhoto,
      dailySchedule,
      locations,
      jainFoodDetails,
      vegetarianFoodDetails,
      nonVegetarianFoodDetails,
    });
    // Send this data to your backend for further processing and storage
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="profile-photo-section">
            <label className="profile-photo-label">
              {profilePhoto ? (
              <img
                src={URL.createObjectURL(profilePhoto)}
                alt="Profile"
                className="profile-photo-preview"
              />
            ) : (
              <>
              <div className="profile-photo-placeholder">
                <span className="plus-icon">+</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePhotoChange}
                className="profile-photo-input"
              />
              </>
            )}
            </label>
          </div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-section">
          <label>
            Locations:
            <div className="selected-locations-container">
              {locations.map((location, index) => (
                <div key={index} className="selected-location-container">
                  <span className="selected-location">{location}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveLocation(index)}
                    className="remove-location"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <div className="location-input-container">
              <input
                type="text"
                value={locationInput}
                onChange={handleLocationChange}
                placeholder="Type location..."
              />
              <button type="button" onClick={handleAddLocation}>
                Add Location
              </button>
            </div>
          </label>
        </div>



        <div className="form-section">
          <label>
            Contact Number:
            <input
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-section">
          <label>
            Daily Schedule:
            <textarea
              value={dailySchedule}
              onChange={(e) => setDailySchedule(e.target.value)}
              placeholder="Specify the daily delivery schedule (e.g., Mon-Fri: 9 AM - 5 PM)"
              required
            />
          </label>
        </div>
        <div className="form-section">
          <label>
            Categories:
            <div>
              <label>
                <input
                  type="checkbox"
                  value="vegetarian"
                  checked={categories.includes('vegetarian')}
                  onChange={() => handleCategoryChange('vegetarian')}
                />
                Vegetarian
              </label>
              {categories.includes('vegetarian') && (
                <div>
                  <label>
                    Food Name:
                    <input
                      type="text"
                      name="foodName"
                      value={vegetarianFoodDetails.foodName}
                      onChange={(e) => handleFoodDetailsChange('vegetarian', e)}
                    />
                  </label>
                  <label>
                    Food Price:
                    <input
                      type="text"
                      name="foodPrice"
                      value={vegetarianFoodDetails.foodPrice}
                      onChange={(e) => handleFoodDetailsChange('vegetarian', e)}
                    />
                  </label>
                </div>
              )}
            </div>
            {/* Similar structure for Jain and Non-Vegetarian categories */}
            <div>
              <label>
                <input
                  type="checkbox"
                  value="jain"
                  checked={categories.includes('jain')}
                  onChange={() => handleCategoryChange('jain')}
                />
                Jain
              </label>
              {categories.includes('jain') && (
                <div>
                  <label>
                    Food Name:
                    <input
                      type="text"
                      name="foodName"
                      value={jainFoodDetails.foodName}
                      onChange={(e) => handleFoodDetailsChange('jain', e)}
                    />
                  </label>
                  <label>
                    Food Price:
                    <input
                      type="text"
                      name="foodPrice"
                      value={jainFoodDetails.foodPrice}
                      onChange={(e) => handleFoodDetailsChange('jain', e)}
                    />
                  </label>
                </div>
              )}
            </div>

            <div>
              <label>
                <input
                  type="checkbox"
                  value="non-vegetarian"
                  checked={categories.includes('non-vegetarian')}
                  onChange={() => handleCategoryChange('non-vegetarian')}
                />
                Non-Vegetarian
              </label>
              {categories.includes('non-vegetarian') && (
                <div>
                  <label>
                    Food Name:
                    <input
                      type="text"
                      name="foodName"
                      value={nonVegetarianFoodDetails.foodName}
                      onChange={(e) => handleFoodDetailsChange('non-vegetarian', e)}
                    />
                  </label>
                  <label>
                    Food Price:
                    <input
                      type="text"
                      name="foodPrice"
                      value={nonVegetarianFoodDetails.foodPrice}
                      onChange={(e) => handleFoodDetailsChange('non-vegetarian', e)}
                    />
                  </label>
                </div>
              )}
            </div>

          </label>
        </div>
        <Link to="/dashboard">
          <button type="submit">Submit</button>
        </Link>

      </form>
    </div>
  );
};

export default ProfileSetupForm;
