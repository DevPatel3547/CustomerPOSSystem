import React from 'react';
import axios from 'axios';
import './Checkout.css';

const Checkout = ({ cart }) => {
  const totalPrice = cart.reduce((total, item) => total + item.quantity * item.cost, 0);

  const handleCheckout = async () => {
    try {
      const requests = cart.map(item => {
        const data = {
          table: 'inventory',
          flavor: item.name,
          price: item.cost.toString(),
          quantity: item.quantity.toString(),
          ingredients: item.ingredients,
          identify: 'name_of_item',
          identifyKey: item.name
        };

        return axios.post('http://localhost:9000/updateTable', data);
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