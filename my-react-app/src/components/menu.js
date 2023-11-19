import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import './menu.css';

const Menu = ({ cart, setCart }) => {
  let navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [showToppingsModal, setShowToppingsModal] = useState(false);
  const [toppings, setToppings] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState({});
  const [showCart, setShowCart] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/getTable/menu');
        const drinks = response.data.filter(item => item.type === 'Drink');
        const toppings = response.data.filter(item => item.type === 'Topping');
        setMenuItems(drinks);
        setToppings(toppings);
        let initialQuantities = {};
        let initialToppings = {};
        drinks.forEach(drink => {
          initialQuantities[drink.name_of_item] = 0;
          initialToppings[drink.name_of_item] = '';
          drink.ingredients = drink.ingredients;
        });
        setQuantities(initialQuantities);
        setSelectedToppings(initialToppings);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleAddClick = (drinkName) => {
    setSelectedDrink(drinkName);
    setShowToppingsModal(true);
  };
  

  const handleToppingChange = (drinkName, topping) => {
    setSelectedToppings(prevToppings => ({ ...prevToppings, [drinkName]: topping }));
  };

  const handleQuantityChange = (drinkName, increment) => {
    if (increment) {
      // Set the selected drink and show toppings modal to add a new item
      setSelectedDrink(drinkName);
      setShowToppingsModal(true);
    } else {
      // If decrementing, just update the quantity
      setQuantities(prevQuantities => {
        const newQuantity = Math.max(0, prevQuantities[drinkName] - 1);
        updateCart(drinkName, newQuantity, selectedToppings[drinkName]); // Pass the currently selected topping
        return {
          ...prevQuantities,
          [drinkName]: newQuantity,
        };
      });
    }
  };
  
  
  const updateCart = (drinkName, newQuantity, topping) => {
    const itemId = `${drinkName}-${topping}`;
    const existingItemIndex = cart.findIndex(item => item.name === drinkName && item.topping === topping);
    
    if (existingItemIndex > -1) {
      // If the item already exists, update the quantity and ingredients
      const updatedCart = [...cart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + newQuantity,
        ingredients: updatedCart[existingItemIndex].ingredients // You may want to update this if toppings can change
      };
      setCart(updatedCart);
    } else {
      const newItem = {
        id: itemId,
        name: drinkName,
        topping: topping,
        quantity: newQuantity,
        cost: menuItems.find(item => item.name_of_item === drinkName).cost_of_item,
        ingredients: menuItems.find(item => item.name_of_item === drinkName).ingredients
      };
      setCart([...cart, newItem]);
    }
  };
  
          
  const handleToppingDone = () => {
    if (!selectedToppings[selectedDrink]) {
      alert('Please select a topping.');
      return;
    }
    setShowToppingsModal(false);
    addToCart();
    setSelectedDrink(null);
  };
  

  const addToCart = () => {
    const drinkDetails = menuItems.find(drink => drink.name_of_item === selectedDrink);
    const toppingsDetails = toppings.find(topping => topping.name_of_item === selectedToppings[selectedDrink]);
    
    // Combine drink ingredients and topping as the final ingredients list
    const finalIngredients = `${drinkDetails.ingredients}${toppingsDetails ? ', ' + toppingsDetails.name_of_item : ''}`;
    
    // Call updateCart with the selected drink, quantity 1, the selected topping, and the drink details
    updateCart(selectedDrink, 1, selectedToppings[selectedDrink], drinkDetails.cost_of_item, finalIngredients);
    
    // Update the quantity in the menu table
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [selectedDrink]: prevQuantities[selectedDrink] + 1,
    }));
    
    setShowToppingsModal(false);
    setSelectedDrink(null);
  };
  
  
  const handleQuantityUpdate = (itemId, increment) => {
    // Split the item ID to get the drink name and topping
    const [drinkName, topping] = itemId.split('-');
    
    // Update the cart using the unique itemId
    const updatedCart = cart.map((item) => {
      if (item.id === itemId) {
        const newQuantity = increment ? item.quantity + 1 : Math.max(0, item.quantity - 1);
        // Also, update the quantities state to reflect the change
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [drinkName]: prevQuantities[drinkName] + (increment ? 1 : -1),
        }));
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter((item) => item.quantity > 0); // Remove the item if the quantity is 0
    setCart(updatedCart);
  };

  const handleRemoveFromCart = (itemId) => {
    // Update the cart by filtering out the item by its unique itemId
    const updatedCart = cart.filter(cartItem => cartItem.id !== itemId);
    setCart(updatedCart);
  };

  
  

  return (
    <Container className="py-4">
      <div className = "backButton">
      <button onClick={() => navigate('/')}>Back</button>
      </div>
      <h1 className="text-center mb-4">Drinks Menu</h1>
      <Button variant="primary" onClick={() => setShowCart(true)}>Cart</Button>
      <table striped bordered hover className="my-4">
        <thead>
          <tr>
            <th>Name of Drink</th>
            <th>Cost</th>
            <th>Add</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((drink) => (
            <tr key={drink.name_of_item}>
              <td>{drink.name_of_item}</td>
              <td>${drink.cost_of_item}</td>
              <td>
                {quantities[drink.name_of_item] > 0 ? (
                  <div>

                    {quantities[drink.name_of_item]}
                    <button onClick={() => handleQuantityChange(drink.name_of_item, true)}>+</button>
                  </div>
                ) : (
                  <button onClick={() => handleAddClick(drink.name_of_item)}>Add</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showToppingsModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select a topping for {menuItems.find(drink => drink.name_of_item === selectedDrink)?.name_of_item}</h2>
            <select
              onChange={(e) => handleToppingChange(selectedDrink, e.target.value)}
              value={selectedToppings[selectedDrink] || ''}
            >
              <option value="">--Choose a topping--</option>
              {toppings.map(topping => (
                <option key={topping.name_of_item} value={topping.name_of_item}>
                  {topping.name_of_item}
                </option>
              ))}
            </select>
            <div>
              <button onClick={handleToppingDone}>Done</button>
              <button onClick={() => setShowToppingsModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showCart && (
        <div className="modal cart-modal">
          <div className="modal-content">
            <h2>Cart</h2>
            <table>
              <thead>
                <tr>
                  <th>Drink</th>
                  <th>Topping</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.topping}</td>
                    <td>
                      <button onClick={() => handleQuantityUpdate(item.id, false)}>-</button>
                      {item.quantity}
                      <button onClick={() => handleQuantityUpdate(item.id, true)}>+</button>
                    </td>
                    <td>${(item.cost * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3">Total</td>
                  <td>${cart.reduce((total, item) => total + item.cost * item.quantity, 0).toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
            <button onClick={() => setShowCart(false)}>Close</button>
            <button onClick={() => navigate('/checkout')}>Checkout</button>
          </div>
        </div>
      )}

    </Container>
  );
};

export default Menu;

