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
  const { state } = location;

  const filterCriteria = JSON.parse(localStorage.getItem('searchData'));
  const currProduct = JSON.parse(localStorage.getItem('currProduct'));

  // const [foodName, setFoodName] = useState(""); // Change UID to Food Name
  const [mealType, setMealType] = useState(filterCriteria.category);
  const [quantity, setQuantity] = useState("");
  const [address, setAddress] = useState("");
  const [orderDate, setOrderDate] = useState(""); // Add orderDate state
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const prices = currProduct[filterCriteria.category].price;
    const foodName = currProduct[filterCriteria.category].name;
    const formattedOrderDate = formatDate(orderDate);

    // Validate the form inputs here
    if (mealType && quantity && address && orderDate) {
      // Prepare the order data
      const orderData = {
        user: userr._id, // Get userId from the state
        dabbawala: state.userId, // Get dabbawalaId from the state
        orderType: state.frequency, // Get order type from the state
        foodName,
        quantity,
        prices,
        mealType,
        address,
        subscriptionStartDate: formattedOrderDate,
      };

      console.log(orderData);


      try {
        // Send a POST request to your backend endpoint to create the order
        const response = await axios.post('http://localhost:8800/api/booking/create', orderData);

        // Check the response status and handle it accordingly
        if (response.status === 201) {
          const orderApi = "http://localhost:8800/api/payment/orders";
          const { data } = await axios.post(
            orderApi,
            { amount: (prices*quantity) },
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                  "POST, GET, OPTIONS, PUT, DELETE",
                "Access-Control-Allow-Headers":
                  "Content-Type, X-Auth-Token, Origin, Authorization",
              },
            }
          );
          console.log(data);
          await initPayment(data.data);

          // Order was successfully created
          setOrderPlaced(true);
          // You can reset the form inputs here if needed
          // setFoodName('');
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


  const initPayment = (data) => {
    console.log("In init")
    const options = {
      key: "rzp_test_Uf8e5ZC0BrgIFH",
      amount: data.amount,
      currency: data.currency,
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyApi = "http://localhost:8800/api/payment/verify";
          const { data } = await axios.post(verifyApi, { ...response, userId: userr._id }, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
              'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token, Origin, Authorization',
            },
          });
          console.log(data);
          if (data.status) {
            alert(`Order Placed, Razorpay order Id: ${data.razorpay_order_id}, Razorpay payment Id: ${data.razorpay_payment_id}`);
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#f57e42",
      },
    };

    console.log(options)
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };


  return (
    <div className="order-form">
      <div className="flex-container">
        <img src={Dabawalaimage} alt="Dabawala Image" />

        <div className="form-content">
          <h2 className="young">Place Your Order </h2>
          <form onSubmit={handleSubmit}>
            {/* <label htmlFor="foodName">Food Name:</label>
            <input
              type="text"
              id="foodName"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
            /> */}

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
