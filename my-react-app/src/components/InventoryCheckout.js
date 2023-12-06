import React from 'react';
import { useLocation } from 'react-router-dom';
import './InventoryCheckout.css';
import axios from 'axios';


const InventoryCheckout = () => {
  const location = useLocation();
  const { cart } = location.state;

  const handleCheckout = () => {
  const dataToSend = cart.map(item => {
    return {
      table: 'inventory', 
      quantity: item.quantity,
      identify: 'name', // Assuming 'name' is the unique identifier in your table
      identifyKey: item.name
      
    };
  });

  // Send each item update request separately
  dataToSend.forEach(data => {
    axios.post('http://localhost:9000/updateTable', data)
      .then(response => {
        console.log('Checkout successful for item:', response);
        // Handle successful checkout here
      })
      .catch(error => {
        console.error('Checkout error:', error);
        // Handle errors here
      });
  });

  // Additional actions after checkout (e.g., clear cart)
};


  return (
    <div className="inventory-checkout-container">
      <h1>Inventory Checkout</h1>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span>{item.name}</span>
            <span>Quantity: {item.quantity}</span>
          </li>
        ))}
      </ul>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default InventoryCheckout;
