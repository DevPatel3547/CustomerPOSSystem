import React from 'react';
import './OrderHistory.css';

const OrderHistory = () => {
    // Placeholder for future dynamic content
    const trends = [
        { name: "What Sales Together", description: "Popular items sold together." },
        { name: "Sales Report", description: "Sales by menu item." },
        { name: "Excess Report", description: "Items with less than 10% sales of inventory." }
    ];

    return (
        <div className="order-history-container">
            <h1>Order History and Trends</h1>
            <div className="trends-container">
                {trends.map((trend, index) => (
                    <div key={index} className="trend-card">
                        <h2>{trend.name}</h2>
                        <p>{trend.description}</p>
                        {/* Placeholder for future dynamic content */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;
