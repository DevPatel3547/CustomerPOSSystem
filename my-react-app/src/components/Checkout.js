// src/components/Checkout.js
import React from 'react';
import './Checkout.css'; 

const Checkout = ({ cart }) => {
  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <table>
        <thead>
          <tr>
            <th>Drink</th>
            <th>Topping</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.topping}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Checkout;
