import React, { useState } from "react";
import './PaymentForm.css';
import axios from "axios";
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Dabawalaimage from '../../img/db_per-removebg-preview.png';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';

const PaymentForm = ({ onCancel }) => {
  const { isLoggedIn, userr, checkUserLoggedIn, handleLogout } = useContext(UserContext);

  const location = useLocation();
  const {state} = location;


  const [foodName, setFoodName] = useState(""); // Change UID to Food Name
  const [mealType, setMealType] = useState("Veg");
  const [quantity, setQuantity] = useState("");
  const [address, setAddress] = useState("");
  const [orderDate, setOrderDate] = useState(""); // Add orderDate state
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate the form inputs here
    if (foodName && mealType && quantity && address && orderDate) {
      // Prepare the order data
      const orderData = {
        userId: state.userId, // Get userId from the state
        dabbawalaId: state.dabbawalaId, // Get dabbawalaId from the state
        orderType: state.frequency, // Get order type from the state
        foodName,
        mealType,
        quantity,
        address,
        orderDate,
        // Add other fields as needed
      };
  
      try {
        // Send a POST request to your backend endpoint to create the order
        const response = await axios.post('http://localhost:3000/api/booking/create', orderData);
  
        // Check the response status and handle it accordingly
        if (response.status === 201) {
          // Order was successfully created
          setOrderPlaced(true);
          // You can reset the form inputs here if needed
          setFoodName('');
          setMealType('Veg');
          setQuantity('');
          setAddress('');
          setOrderDate('');
        } else {
          // Handle other status codes as needed
          window.alert('Order creation failed.');
        }
      } catch (error) {
        // Handle any errors that occur during the request
        console.error(error);
        window.alert('An error occurred while creating the order.');
      }
    } else {
      // If any required field is missing, show an error message
      window.alert('Please fill in all the required fields.');
    }
  };
  
  return (
    <div className="order-form">
      <div className="flex-container">
        <img src={Dabawalaimage} alt="Dabawala Image" />

        <div className="form-content">
          <h2 className="young">Place Your Order </h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="foodName">Food Name:</label> {/* Change UID to Food Name */}
            <input
              type="text"
              id="foodName" // Change UID to Food Name
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
            />

            <label htmlFor="mealType">Meal Type:</label>
            <select
              id="mealType"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              required
            >
              <option value="Veg">Veg</option>
              <option value="NonVeg">Non-Veg</option>
              <option value="Jain">Jain</option>
            </select>

            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />

            <label htmlFor="address">Delivery Address:</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <label htmlFor="orderDate">Order Date:</label> {/* Add Order Date field */}
            <input
              type="date"
              id="orderDate"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              required
            />

            <button type="submit">Submit</button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
            <Link to="/fetch-products" className="text-slate-200 hover:text-white">
              &larr; Back
            </Link>
          </form>
        </div>
      </div>
      {orderPlaced && (
        <div className="order-placed-popup">
          <p className="ha">Your order has been placed!</p>
          <Link to="/MyBookings" className="view-button">
            View
          </Link>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
