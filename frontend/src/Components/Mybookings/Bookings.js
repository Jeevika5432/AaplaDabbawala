import React, { useEffect, useState } from "react";
import "./Bookings.css";
import sademoji from '../../img/sad emji.png';
import axios from "axios";
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';

const Bookings = () => {
  const { isLoggedIn, userr, checkUserLoggedIn, handleLogout } = useContext(UserContext);
  const [bookings, setBookings] = useState([]); // State to store user's bookings

  useEffect(() => {
    // Fetch user's bookings when userr._id is available
    userr?._id && fetchUserBookings();
  }, [userr]);

  const fetchUserBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/api/booking/userbookings/${userr._id}`);
      // console.log(response.data);
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
    }
  };


  return (
    <div className="booking-container">
      {bookings.length > 0 ? (
        <div className="booking-details">
          <h1>Your Orders</h1>
          <hr/>
          {bookings.map((booking) => (
            <div className="booking-info" key={booking._id}>
              <p>
                Dabbawala Name: <span>{booking.dabbawalaName}</span>
              </p>
              <p>
                Phone Number: <span>{booking.dabbawalaPhone}</span>
              </p>
              <p>
                Meal Type: <span>{booking.mealType}</span>
              </p>
              <p>
                Name of the Meal: <span>{booking.foodName}</span>
              </p>
              <p>
                Date: <span>{booking.subscriptionStartDate}</span>
              </p>
              <p>
                Price: <span>{booking.prices}</span>
              </p>
              <hr/>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-bookings">
          <div className="no-bookings-content">
            <img src={sademoji} alt="sademoji" className="small-image" />
            <h1 className="haha">No bookings yet!</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
