import React, { useState } from 'react';
import './ProfileSetupForm.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import { DabbaContext } from "../../context/DabbaContext";
import { useContext } from "react";


const ProfileSetupForm = () => {
  const navigate = useNavigate();
  const { isLoggedInD, dabbaa, setDabbaa, checkDabbaLoggedIn, handleLogout2} = useContext(DabbaContext);

  // State variables to store form data
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [categories, setCategories] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [dailySchedule, setDailySchedule] = useState('');
  const [locations, setLocations] = useState([]);
  const [locationInput, setLocationInput] = useState('');

  // Food details states
  const [jainFoodDetails, setJainFoodDetails] = useState({
    foodName: '',
    foodMenu: '',
    foodPrice: '',
  });

  const [vegetarianFoodDetails, setVegetarianFoodDetails] = useState({
    foodName: '',
    foodMenu: '',
    foodPrice: '',
  });

  const [nonVegetarianFoodDetails, setNonVegetarianFoodDetails] = useState({
    foodName: '',
    foodMenu: '',
    foodPrice: '',
  });


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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('userId', dabbaa._id);
    formData.append('name', name);
    locations.forEach((location) => {
      formData.append('locations', location);
    });
    formData.append('phone', contactNumber);
    formData.append('dailySchedule', dailySchedule);
    // categories.forEach((category) => {
    //   formData.append('categories', category);
    // });
    formData.append('profilePicture', profilePhoto);

    // Add Jain, Vegetarian, and Non-Vegetarian details to the form data
    if (categories.includes('jain')) {
      formData.append('jain[isPresent]', true);
      formData.append('jain[name]', jainFoodDetails.foodName);
      formData.append('jain[menu]', jainFoodDetails.foodMenu);
      formData.append('jain[price]', jainFoodDetails.foodPrice);
    }
    if (categories.includes('vegetarian')) {
      formData.append('veg[isPresent]', true);
      formData.append('veg[name]', vegetarianFoodDetails.foodName);
      formData.append('veg[menu]', vegetarianFoodDetails.foodMenu);
      formData.append('veg[price]', vegetarianFoodDetails.foodPrice);
    }
    if (categories.includes('non-vegetarian')) {
      formData.append('nonVeg[isPresent]', true);
      formData.append('nonVeg[name]', nonVegetarianFoodDetails.foodName);
      formData.append('nonVeg[menu]', nonVegetarianFoodDetails.foodMenu);
      formData.append('nonVeg[price]', nonVegetarianFoodDetails.foodPrice);
    }
    // console.log("donie1")
    // console.log(formData);

    try {
      const response = await axios.put('http://localhost:8800/api/dabbawala/', formData);
      console.log(response.data);
      localStorage.setItem('dabbawalaData', JSON.stringify(response.data));

      await checkDabbaLoggedIn();
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }

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
                    Food Menu:
                    <input
                      type="text"
                      name="foodMenu"
                      value={vegetarianFoodDetails.foodMenu}
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
                    Food Menu:
                    <input
                      type="text"
                      name="foodMenu"
                      value={jainFoodDetails.foodMenu}
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
                    Food Menu:
                    <input
                      type="text"
                      name="foodMenu"
                      value={nonVegetarianFoodDetails.foodMenu}
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
        <button type="submit">Submit</button>

      </form>
    </div>
  );
};

export default ProfileSetupForm;
