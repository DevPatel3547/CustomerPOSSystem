// src/components/HomePage.js
import React from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
   const navigate = useNavigate();
  return (
    <div className="home-container">
      <h1>Hello</h1>
      <div className="user-selection">
        <p>How do you want to use this?</p>
        <button onClick={() => navigate('/customer')}>Go to Customer</button>
        <button>Manager</button>
        <button>Cashier</button>
        <button>Menu Board</button>
      </div>
    </div>
  );
}

export default HomePage;
