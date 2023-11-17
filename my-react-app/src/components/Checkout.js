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
      <h1>Checkout</h1>
      <table>
        <thead>
          <tr>
            <th>Drink</th>
            <th>Topping</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Ingredients</th> {/* New column for ingredients */}
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => ( // Using index in the key for uniqueness
            <tr key={`${item.name}-${index}`}> 
              <td>{item.name}</td>
              <td>{item.topping}</td>
              <td>{item.quantity}</td>
              <td>${(item.cost * item.quantity).toFixed(2)}</td>
              <td>{`${item.ingredients}${item.topping ? ', ' + item.topping : ''}`}</td> {/* Now includes topping in the ingredients list */}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Total Price</td>
            <td>${totalPrice.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      <button className="checkout-button"  onClick={handleCheckout}>
        Checkout - ${totalPrice.toFixed(2)}
      </button>
    </div>
  );
};

export default Checkout;