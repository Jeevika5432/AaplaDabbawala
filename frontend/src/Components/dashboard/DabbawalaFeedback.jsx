// DabbawalaFeedback.jsx

import React from 'react';
import './DabbawalaFeedback.css';  // Import CSS file for styling

const DabbawalaFeedback = () => {
  const feedbacks = [
    { user: 'Amisha', rating: 4, comment: 'Great service!' },
    { user: 'Jeevika', rating: 5, comment: 'Amazing food quality!' },
    // Add more feedback objects as needed
  ];

  return (
    <div className="feedbacks-container">
      <h2>User Ratings and Reviews</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <ul className="feedback-list">
          {feedbacks.map((feedback, index) => (
            <li key={index} className="feedback-item">
              <div className="user-info">
                <strong>{feedback.user}</strong>
                <span>Rating: {feedback.rating}</span>
              </div>
              <p className="feedback-comment">{feedback.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DabbawalaFeedback;
