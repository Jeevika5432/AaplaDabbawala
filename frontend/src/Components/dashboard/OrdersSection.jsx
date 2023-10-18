// OrdersSection.jsx

import React, { useState } from 'react';
import './OrdersSection.css';

const OrdersSection = () => {
  // State to manage orders
  const [ordersType, setOrdersType] = useState('subscription');
  const [orders, setOrders] = useState({
    jain: {
      subscription: {
        sunday: [
                    { name: 'Amisha', category: 'Jain', time: '12:30 PM',address: '123 Main St, City'  },
          // Add more orders as needed
        ],
        monday: [
          { name: 'Jeevika', category: 'Jain', time: '1:00 PM', address: '456 Oak St, Town' },
          // Add more orders as needed
        ],
        // Add more days as needed
      },
      oneTime: [
        { name: 'Altaf', category: 'Jain', date: '2023-10-16', time: '12:30 PM', food: 'Food 3, Food 4',address: '789 Pine St, Village' },
        { name: 'Mahima', category: 'Jain', date: '2023-10-16', time: '2:00 PM', food: 'Food 5, Food 6', address: '101 Cedar St, Hamlet' },
        // Add more one-time orders as needed
      ],
    },
    vegetarian: {
      subscription: {
        sunday: [
          // Add subscription orders for the Vegetarian category on Sundays
        ],
        monday: [
          // Add subscription orders for the Vegetarian category on Mondays
        ],
        // Add more days as needed
      },
      oneTime: [
        // Add one-time orders for the Vegetarian category
      ],
    },
    nonVegetarian: {
      subscription: {
        sunday: [
          // Add subscription orders for the Non-Vegetarian category on Sundays
        ],
        monday: [
          // Add subscription orders for the Non-Vegetarian category on Mondays
        ],
        // Add more days as needed
      },
      oneTime: [
        // Add one-time orders for the Non-Vegetarian category
      ],
    },
  });

  const toggleOrdersType = (type) => {
    setOrdersType(type);
  };

  return (
    <div className="orders-section">
      <h2>Your Orders</h2>
      <div className="orders-toggle">
        <button onClick={() => toggleOrdersType('subscription')}>Subscription Orders</button>
        <button onClick={() => toggleOrdersType('oneTime')}>One-Time Orders</button>
      </div>

      {/* Display orders based on the selected type */}
      {ordersType === 'subscription' ? (
        <>
          {/* Display subscription orders for Jain category */}
          {Object.entries(orders.jain.subscription).map(([day, orderList]) => (
            <div key={day} className="orders-day">
            <h3>{day}</h3>
            <ul>
              {orderList.map((order, index) => (
                <li key={index} className="order-card subscription-order">
                  <h3>{order.name}</h3>
                  <p>Category: {order.category}</p>
                            <p>Time: {order.time}</p>
                            <p>Address: {order.address}</p>
                </li>
              ))}
            </ul>
          </div>
          ))}
          {/* Similar structure for Vegetarian and Non-Vegetarian categories */}
        </>
      ) : (
        <>
          {/* Display one-time orders for Jain category */}
          {orders.jain.oneTime.map((order, index) => (
            <div key={index} className="order-card">
              <h3>{order.name}</h3>
              <p>Category: {order.category}</p>
              <p>Date: {order.date}</p>
              <p>Time: {order.time}</p>
                        <p>Food: {order.food}</p>
                        <p>Address: {order.address}</p>
            </div>
          ))}
          {/* Similar structure for Vegetarian and Non-Vegetarian categories */}
        </>
      )}
    </div>
  );
};

export default OrdersSection;
