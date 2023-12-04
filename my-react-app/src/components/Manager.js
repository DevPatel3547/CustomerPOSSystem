// Manager.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Manager.css';

const Manager = () => {
    let navigate = useNavigate();
    return (
        <div className="manager-container">
            <h1 className="manager-title">Manager Dashboard</h1>
            <div className="buttons-container">
                <button className="dashboard-button">Trends</button>
                <button className="dashboard-button" onClick={() => navigate('/EditMenu')}>Edit Menu</button>
                <button className="dashboard-button">Inventory</button>
                <button className="dashboard-button" onClick={() => navigate('/OrderHistory')}>Order History</button>
            </div>
        </div>
    );
};

export default Manager;
