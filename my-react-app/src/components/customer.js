// src/components/HomePage.js
import React from 'react';
import './customer.css';

const customerPage = () => {
  return (
    <div className="customer-container">
      <h1>Menu</h1>
      <div className="user-selection">
        <p>tabs to plan out</p>
        <button>Order Drink</button>
        <button>Customize Drink</button>
        <button>View Cart</button>
      </div>
    </div>
  );
}

export default customerPage;
