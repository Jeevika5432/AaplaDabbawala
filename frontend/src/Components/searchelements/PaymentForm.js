import React, { useState } from "react";
import './PaymentForm.css';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import Dabawalaimage from '../../img/db_per-removebg-preview.png';

const PaymentForm = ({ onCancel }) => {
  const [foodName, setFoodName] = useState(""); // Change UID to Food Name
  const [mealType, setMealType] = useState("Veg");
  const [quantity, setQuantity] = useState("");
  const [address, setAddress] = useState("");
  const [orderDate, setOrderDate] = useState(""); // Add orderDate state
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form inputs here
    if (foodName && mealType && quantity && address && orderDate) { // Check for orderDate
      // Set the orderPlaced state to true
      setOrderPlaced(true);

      // You can also reset the form inputs here if needed
      setFoodName("");
      setMealType("Veg");
      setQuantity("");
      setAddress("");
      setOrderDate("");
    } else {
      // If any required field is missing, show an error message
      window.alert("Please fill in all the required fields.");
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
