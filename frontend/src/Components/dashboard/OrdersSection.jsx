import React, { useState, useEffect } from 'react';
import './OrdersSection.css';
import axios from 'axios';

import { DabbaContext } from '../../context/DabbaContext';
import { useContext } from 'react';

const OrdersSection = () => {
  const { isLoggedInD, dabbaa, setDabbaa, checkDabbaLoggedIn, handleLogout2 } = useContext(DabbaContext);

  const [ordersType, setOrdersType] = useState('monthly');
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders based on the selected type (monthly or one-time)
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/api/booking/dabbawalabookings/${dabbaa._id}`);
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Filter orders based on the selected type (monthly or one-time)
  const filterOrders = () => {
    if (ordersType === 'monthly') {
      setFilteredOrders(orders.filter(order => order.orderType === 'monthly'));
    } else {
      setFilteredOrders(orders.filter(order => order.orderType === 'oneTime'));
    }
  };

  useEffect(() => {
    fetchOrders();
    filterOrders();
  }, [ordersType]);

  useEffect(() => {
    filterOrders();
  }, [orders, ordersType]);

  const toggleOrdersType = (type) => {
    setOrdersType(type);
  };

  return (
    <div className="orders-section">
      <h2>Your Orders</h2>
      <div className="orders-toggle">
        <button onClick={() => toggleOrdersType('monthly')}>Subscription Orders</button>
        <button onClick={() => toggleOrdersType('oneTime')}>One-Time Orders</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {filteredOrders.map((order, index) => (
            <div key={index} className={`order-card${order.orderType === 'monthly' ? ' subscription-order' : ''}`}>
              <h3>{order.userName}</h3>
              <p>Phone Number : {order.userPhone}</p>
              <p>Category: {order.dabbawala}</p>
              <p>Food: {order.foodName}</p>
              {order.orderType === 'monthly' ? (
                <>
                  <p>Subscription Start Date: {order.subscriptionStartDate}</p>
                </>
              ) : (
                <>
                  <p>Order Date: {order.subscriptionStartDate}</p>
                </>
              )}
              <p>Address: {order.address}</p>

            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default OrdersSection;
