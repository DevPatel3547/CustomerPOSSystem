// src/components/HomePage.js
import React from 'react';
import './customer.css';

const customerPage = () => {
  return (
    <div className="customer-container">
      <h1>Welcome to the Alley!</h1>
      <div className="button-selection">
        <button>Favorite Drinks</button>
        <button>Fan Favorite</button>
        <button>Try our Seasonal Item</button>
      </div>
      <h1>Favorite Toppings</h1>
      <div className="button-selection">
      <button>Customize Drink</button>
      </div>
    </div>
  );
}

export default customerPage;
