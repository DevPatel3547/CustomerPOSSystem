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
        const toppingsList = item.topping ? item.topping.split(', ') : [];
        const allIngredients = item.ingredients.split(', ');

        return [...allIngredients, ...toppingsList].map(ingredientOrTopping => {
          const data = {
            table: 'inventory',
            name: ingredientOrTopping,
            quantity: item.quantity.toString(),
            identify: 'name',
            identifyKey: ingredientOrTopping
          };
          return axios.post('https://project-3-team910-10b-backend.onrender.com/updateTable', data);
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
            <p><strong>Ingredients: </strong>{item.ingredients}</p>
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