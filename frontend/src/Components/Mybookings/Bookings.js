import React from "react";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom
import "./Bookings.css";
import sademoji from '../../img/sad emji.png'

const Bookings = () => {
  const { DabbalaName, mealType, mealName, date, price } = useParams();

  return (
    <div className="booking-container">
      {DabbalaName ? (
        <div className="booking-details">
          <h1>Your order has been placed</h1>
          <div className="booking-info">
            <p>
              Dabbala Name: <span>{DabbalaName}</span>
            </p>
            <p>
              Meal Type: <span>{mealType}</span>
            </p>
            <p>
              Name of the Meal: <span>{mealName}</span>
            </p>
            <p>
              Date: <span>{date}</span>
            </p>
            <p>
              Price: <span>{price}</span>
            </p>
          </div>
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
