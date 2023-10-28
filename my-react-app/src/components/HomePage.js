// src/components/HomePage.js
import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Hello</h1>
      <div className="user-selection">
        <p>How do you want to use this?</p>
        <button>Customer</button>
        <button>Manager</button>
        <button>Cashier</button>
        <button>Menu Board</button>
      </div>
    </div>
  );
}

export default HomePage;
