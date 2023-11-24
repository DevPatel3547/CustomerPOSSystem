import React from 'react';
import axios from 'axios';
import './Checkout.css';

const Checkout = ({ cart }) => {
  const totalPrice = cart.reduce((total, item) => total + item.quantity * item.cost, 0);

  const handleCheckout = async () => {
    try {
      // Map each cart item to an array of POST request promises for each ingredient and topping
      const requests = cart.flatMap(item => {
        // Combine ingredients and topping into a single list
        const allIngredients = item.ingredients.split(', ').concat(item.topping ? [item.topping] : []);

        return allIngredients.map(ingredient => {
          const data = {
            table: 'inventory', // Replace with your actual table name
            name: ingredient, // Name of the ingredient
            quantity: item.quantity.toString(), // Quantity of the item
            identify: 'name', // Field to identify the item in the database
            identifyKey: ingredient // Actual name of the ingredient to be updated
          };
          return axios.post('http://localhost:9000/updateTable', data);
        });
      });

      const responses = await Promise.all(requests);
      console.log('Checkout successful:', responses);
      // Further actions after successful checkout (e.g., clear cart, show success message)
    } catch (error) {
      console.error('Checkout failed:', error);
      // Handle errors (e.g., show error message)
    }
  };

  return (
    <div className="checkout-container">
      <h1 style={{fontFamily: "'Courier New', Courier, monospace", color: "black"}}>Checkout</h1>
      <div className="checkout-items">
        {cart.map((item, index) => (
          <div key={`${item.name}-${index}`} className="checkout-item">
            <h3>{item.name}</h3>
            <p><strong>Topping:</strong> {item.topping || 'None'}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <p><strong>Price:</strong> ${item.cost}</p>
          </div>
        ))}
      </div>
      <div className="checkout-total">
        <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
        <button className="checkout-button" onClick={handleCheckout}>
          Checkout - ${totalPrice.toFixed(2)}
        </button>
      </div>
    </div>
  );

};

export default Checkout;