import React, { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import './OrderHistory.css';

const OrderHistory = () => {
    //let navigate = useNavigate();
    const [orderHistory, setOrderHistory] = useState([]);

    // const goBack = () => {
    //     window.history.back();
    // };

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await axios.get('https://project-3-team910-10b-backend.onrender.com/gettable/orderhistory');
                setOrderHistory(response.data); // Assuming the response data is an array of order history objects
            } catch (error) {
                console.error('Error fetching order history:', error);
            }
        };

        fetchOrderHistory();
    }, []);

    return (
        <div className="order-history-container">
            <h1>Order History and Trends</h1>
            {/* <div className="backButton">
                <Button variant="secondary" onClick={goBack}>Back</Button>
            </div> */}
            <table className="order-history-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Flavor</th>
                        <th>Toppings</th>
                        <th>Item Price</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orderHistory.map((order, index) => (
                        <tr key={index}>
                            <td>{order.date}</td>
                            <td>{order.flavor}</td>
                            <td>{order.toppings}</td>
                            <td>{order.itemprice}</td>
                            <td>{order.totalprice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Placeholder for future dynamic content */}
            <div className="trends-container">
                {/* ... */}
            </div>
        </div>
    );
};

export default OrderHistory;
