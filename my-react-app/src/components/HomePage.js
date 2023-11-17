import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  let navigate = useNavigate();

  return (
    <div className="homepage">
      <div className="central-image">
        <h1 style={{color: 'white'}} className="title">The Alley</h1>
        <div className="nav-options">
          <span onClick={() => navigate('/manager')}>Manager</span>
          <span onClick={() => navigate('/customer')}>Customer</span>
          <span onClick={() => navigate('/login')}>Cashier</span>
          <span onClick={() => navigate('/menu-board')}>Menu Board</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
