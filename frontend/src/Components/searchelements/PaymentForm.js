import React, { useState } from "react";
import './PaymentForm.css';
import { Link, useParams } from "react-router-dom";


import Dabawalaimage from '../../img/db_per-removebg-preview.png';

const OrderForm = ({ onCancel, onSubmit }) => {
  const [uid, setUid] = useState("");
  const [mealType, setMealType] = useState("Veg");
  const [quantity, setQuantity] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form inputs here

    // If the inputs are valid, call the onSubmit function
    onSubmit({
      uid,
      mealType,
      quantity,
      address,
    });
  };

  return (
    <div className="order-form">
      <div className="flex-container">
        <img src={Dabawalaimage} alt="Dabawala Image" />

        <div className="form-content">
          <h2 className="young">Place Your Order</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="uid">UID Number:</label>
            <input
              type="text"
              id="uid"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              required
            />

            <label htmlFor="mealType">Meal Type:</label>
            <select
              id="mealType"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
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
    </div>
  );
};

export default OrderForm;
