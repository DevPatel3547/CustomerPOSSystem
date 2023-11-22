// src/components/login.js
import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import './cashier.css';
import axios from 'axios';
import ScaleText from 'react-scale-text';




const Cashier = ({cart, setCart}) => {
  const [menuItems, setMenuItems] = useState([]);
    let navigate = useNavigate();

const goToMenu = () => {
    navigate('/Menu');
  
  }

const Remove = () => {

}
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('https://project-3-team910-10b-backend.onrender.com/gettable/menu');
      const drinks = response.data.filter(item => item.type === 'Drink');
      setMenuItems(drinks);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  fetchData();
}, []);
const calculateTotalCost = () => {
  return cart.reduce((total, cartItem) => {
    const itemCost = menuItems.find(drink => drink.name_of_item === cartItem.name)?.cost_of_item || 0;
    return total + (itemCost * cartItem.quantity);
  }, 0);
};

const remove = (itemId) => {
  // Update the cart by reducing the quantity of the item or removing it if the quantity becomes 0
  const updatedCart = cart.map((item) => {
    if (item.id === itemId) {
      return { ...item, quantity: Math.max(0, item.quantity - 1) };
    }
    return item;
  }).filter((item) => item.quantity > 0);

  setCart(updatedCart);
};

  
  

const totalCost = calculateTotalCost(cart);
  
    return (
      <div className="cashier-container">
        <div className = "topBar">
        <div className = "backButton">
        <button onClick={() => navigate('/')}>Back</button>
        </div>
        <h1>Cashier Interface</h1>
        </div>
        <div className = "topImgDisplay">
      </div>
        <div className="button-selection">
        
        <button onClick={goToMenu}>Manual Order Input</button>
        
        
          <button >Total Cost: {totalCost.toFixed(2)}</button>
          
          
          <button onClick={() => navigate('/checkout')}>Go to checkout</button>
          
        </div>
       
        <div className="second-part">
        <h1>View Customer Order</h1>
        
          <div className= "order-display">
          <table>
        <thead>
          <tr>
            <th>Drink</th>
            <th>Topping</th>
            <th>Quantity</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => {
           const itemCost = menuItems.find(drink => drink.name_of_item === item.name)?.cost_of_item || 0;
           return (
             <tr key={item.id}>
               <td>{item.name}</td>
               <td>{item.topping}</td>
               <td>{item.quantity}</td>
               <td>${(itemCost * item.quantity).toFixed(2)}</td> {/* Display the cost for each item */}
               <button onClick={() => remove(item.id)}>Remove</button>
             </tr>
           );
           })}
        </tbody>
      </table>

  </div>
  
        </div>
      </div>
    );
  };
  
  export default Cashier;