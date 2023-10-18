
import React, { useState } from 'react';
import './Notificationdabbawala.css';

const NotificationsDabbawala = () => {
  // State to manage notifications
  const [notifications, setNotifications] = useState([
    { message: 'New order received at 10:00 AM' },
    { message: 'You have a new review!' },
    // Add more static notifications as needed
  ]);

  // Function to handle adding a new notification
  const handleAddNotification = () => {
    const newNotification = {
      message: `New order received at ${new Date().toLocaleTimeString()}`,
    };

    setNotifications([newNotification, ...notifications]);
  };

  return (
    <div className="notifications-section">
      <h2>Notifications!</h2>
      <p>Stay updated with the latest happenings.</p>

      {/* Display existing notifications */}
      <div className="existing-notifications">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index} className="notification-item">
              {notification.message}
            </div>
          ))
        ) : (
          <p>No new notifications.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationsDabbawala;
