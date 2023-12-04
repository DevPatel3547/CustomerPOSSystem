// Manager.js
import React from 'react';
import './Manager.css';
import { useNavigate } from 'react-router-dom';

const Manager = () => {
    let navigate = useNavigate();
    return (
        <div className="manager-container">
            <div className = "backButton">
      <button onClick={() => navigate('/')}>Back</button>
      </div>
            <h1 className="manager-title">Manager Dashboard</h1>
            <div className="buttons-container">
                <button className="dashboard-button">Trends</button>
                <button className="dashboard-button">Edit Menu</button>
                <button className="dashboard-button">Inventory</button>
                <button className="dashboard-button">Order History</button>
            </div>
        </div>
    );
};

export default Manager;
