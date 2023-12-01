// Manager.js
import React from 'react';
import './Manager.css';

const Manager = () => {
    return (
        <div className="manager-container">
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
