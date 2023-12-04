import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Modal, Form, Card } from 'react-bootstrap';
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
  const [multiplier, setMultiplier] = useState(1); // Start with no scaling


  useEffect(() => {
    // Update the CSS variable when the multiplier changes
    document.documentElement.style.setProperty('--font-size-multiplier', multiplier);
  }, [multiplier]);

  const increaseFontSize = () => setMultiplier(multiplier + 0.1);
  const decreaseFontSize = () => setMultiplier(multiplier - 0.1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://project-3-team910-10b-backend.onrender.com/gettable/menu');
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
  
    // Reset selected toppings for the new item
    setSelectedToppings(prevToppings => ({
      ...prevToppings,
      [drinkName]: [] // This ensures a fresh array for new selections
    }));
  
    setShowToppingsModal(true);
  };

  const handleAddMoreToppings = (drinkName, newTopping) => {
    setSelectedToppings(prevToppings => ({
      ...prevToppings,
      [drinkName]: [...(prevToppings[drinkName] || []), newTopping]
    }));
  };

  const handleToppingChange = (drinkName, topping) => {
    setSelectedToppings(prevToppings => ({
      ...prevToppings,
      [drinkName]: prevToppings[drinkName] ? [...prevToppings[drinkName], topping] : [topping]
    }));
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
    if (!selectedToppings[selectedDrink] || selectedToppings[selectedDrink].length === 0) {
      alert('Please select at least one topping.');
      return;
    }
    setShowToppingsModal(false);
    addToCart();
    setSelectedDrink(null);
  };
  

  const addToCart = () => {
    const drinkDetails = menuItems.find(drink => drink.name_of_item === selectedDrink);
    const toppingsList = selectedToppings[selectedDrink] || [];
    const toppingsString = toppingsList.join(', ');
  
    // Include the toppings in the final ingredients list
    const finalIngredients = `${drinkDetails.ingredients}, ${toppingsString}`;
  
    // Call updateCart with the combined toppings string
    updateCart(selectedDrink, 1, toppingsString, drinkDetails.cost_of_item, finalIngredients);
    
    setShowToppingsModal(false);
    setSelectedDrink(null);
  
    // Reset the selected toppings for the next item
    setSelectedToppings(prevToppings => ({
      ...prevToppings,
      [selectedDrink]: []
    }));
  
    // Update the quantity in the menu table
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [selectedDrink]: prevQuantities[selectedDrink] + 1,
    }));
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
    <Container className="py-4 menu-container">

      <div className="navigation-buttons">
      
        <Button className="back-button"  onClick={() => navigate('/')}>Back</Button>
        <Button className="view-cart-button"  onClick={() => setShowCart(true)}>View Cart</Button>
      </div>
      <div className="textSize">
    <button onClick={increaseFontSize}>+ Font Size</button>
      <button onClick={decreaseFontSize}>- Font Size</button>
      </div>

      <h1 className="text-center mb-4">Drinks Menu</h1>
      
      <div className="drink-cards">
        {menuItems.map((drink) => (
          <Card key={drink.name_of_item} className="drink-card">
            <Card.Body>
              <Card.Title>{drink.name_of_item}</Card.Title>
              <Card.Text>Price: ${drink.cost_of_item}</Card.Text>
              {quantities[drink.name_of_item] > 0 ? (
                <div className="quantity-control">
                  {quantities[drink.name_of_item]}
                  <Button className="qty-btn" onClick={() => handleQuantityChange(drink.name_of_item, true)}>+</Button>
                </div>
              ) : (
                <Button className="add-btn" onClick={() => handleAddClick(drink.name_of_item)}>Add</Button>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>

  

    {showToppingsModal && (
      <div className="modal">
        <div className="modal-content">
          <h3>Select Toppings for {selectedDrink}</h3>
          <div className="topping-options">
            {toppings.map((topping) => (
              <div key={topping.name_of_item} className="topping-item">
                <input 
                  type="checkbox" 
                  id={`topping-${topping.name_of_item}`} 
                  onChange={() => handleToppingChange(selectedDrink, topping.name_of_item)} 
                />
                <label htmlFor={`topping-${topping.name_of_item}`}>{topping.name_of_item}</label>
              </div>
            ))}
          </div>
          <div className="modal-actions">
            <Button variant="success" onClick={handleToppingDone}>Done</Button>
            <Button variant="secondary" onClick={() => setShowToppingsModal(false)}>Cancel</Button>
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

