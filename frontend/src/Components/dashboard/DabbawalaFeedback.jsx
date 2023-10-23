import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DabbawalaFeedback.css';

import { DabbaContext } from "../../context/DabbaContext";
import { useContext } from "react";

const DabbawalaFeedback = () => {
  const { isLoggedInD, dabbaa, setDabbaa, checkDabbaLoggedIn, handleLogout2 } = useContext(DabbaContext);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, [dabbaa._id]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/api/dabbawala/dabbareviews/${dabbaa._id}`);
      console.log(response.data);
      if (response.status === 200) {
        setReviews(response.data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };


  return (
    <div className="feedbacks-container">
      <h2>User Ratings and Reviews</h2>
      {reviews.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <ul className="feedback-list">
          {reviews.map((review, index) => (
            <li key={index} className="feedback-item">
              <div className="user-info">
                <strong>{review.userName}</strong>
                <span>Rating: {review.rating}</span>
              </div>
              <p className="feedback-comment">{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DabbawalaFeedback;
