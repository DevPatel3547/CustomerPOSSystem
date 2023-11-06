import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu.css';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [showToppingsModal, setShowToppingsModal] = useState(false);
  const [toppings, setToppings] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState({});
  const [cart, setCart] = useState([]); // State to hold the cart items
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
    setQuantities(prevQuantities => {
      const newQuantity = increment ? prevQuantities[drinkName] + 1 : Math.max(0, prevQuantities[drinkName] - 1);
      updateCart(drinkName, newQuantity); // Call the updateCart function whenever quantities change
      return {
        ...prevQuantities,
        [drinkName]: newQuantity,
      };
    });
  };
  
  const updateCart = (drinkName, newQuantity) => {
    // Find the item in the cart
    const existingItem = cart.find(item => item.name === drinkName);
    if (existingItem) {
      // If it exists and new quantity is not 0, update the quantity
      if (newQuantity > 0) {
        setCart(cart.map(item =>
          item.name === drinkName ? { ...item, quantity: newQuantity } : item
        ));
      } else {
        // If new quantity is 0, remove it from the cart
        setCart(cart.filter(item => item.name !== drinkName));
      }
    } else if (newQuantity > 0) {
      // If not existing and new quantity is more than 0, add a new item
      const newItem = {
        name: drinkName,
        topping: selectedToppings[drinkName] || "", // Assuming a default topping or none
        quantity: newQuantity
      };
      setCart([...cart, newItem]);
    }
  };
  
  const handleToppingDone = () => {
    if (!selectedToppings[selectedDrink]) {
      alert('Please select a topping.');
      return;
    }
    handleQuantityChange(selectedDrink, true);
    addToCart();
    setSelectedDrink(null);
  };


  const addToCart = () => {
    // Check if the item is already in the cart
    const existingItem = cart.find(item => item.name === selectedDrink && item.topping === selectedToppings[selectedDrink]);
  
    if (existingItem) {
      // If it exists, just update the quantity
      setCart(cart.map(item =>
        item.name === selectedDrink && item.topping === selectedToppings[selectedDrink]
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // If not, add the new item with quantity and selected topping
      setCart([...cart, {
        name: selectedDrink,
        topping: selectedToppings[selectedDrink],
        quantity: 1
      }]);
    }
  
    // Reset selections after adding to cart
    setShowToppingsModal(false);
  };

  const handleQuantityUpdate = (itemName, increment) => {
    // Update the cart
    const updatedCart = cart.map(item =>
      item.name === itemName
        ? { ...item, quantity: increment ? item.quantity + 1 : Math.max(0, item.quantity - 1) }
        : item
    );
    setCart(updatedCart);
    
    // Update the quantities for the menu table
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemName]: increment ? prevQuantities[itemName] + 1 : Math.max(0, prevQuantities[itemName] - 1),
    }));
  };

  const handleRemoveFromCart = (itemName) => {
    // Update the cart
    const updatedCart = cart.filter(cartItem => cartItem.name !== itemName);
    setCart(updatedCart);
  
    // Reset the quantity in the menu table to 0 for the removed item
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemName]: 0,
    }));
  };
  
  

  return (
    <div className="menu-container">
      <h1>Drinks Menu</h1>
      <button onClick={() => setShowCart(true)} className="cart-button">Cart</button>
      <table>
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
                    <button onClick={() => handleQuantityChange(drink.name_of_item, false)}>-</button>
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.topping}</td>
                    <td>
                      <button onClick={() => handleQuantityUpdate(item.name, false)}>-</button>
                      {item.quantity}
                      <button onClick={() => handleQuantityUpdate(item.name, true)}>+</button>
                    </td>
                    <td>
                      <button onClick={() => handleRemoveFromCart(item.name) }>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => setShowCart(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
