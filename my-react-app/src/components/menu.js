import React, { useState, useEffect, useRef } from 'react';
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

  const [brownSugarDrinks, setBrownSugarDrinks] = useState([]);
  const [brewTeaDrinks, setBrewTeaDrinks] = useState([]);
  const [luluDrinks, setLuluDrinks] = useState([]);
  const [snowVelvetDrinks, setSnowVelvetDrinks] = useState([]);
  const [milkTeaDrinks, setmilkTeaDrinks] = useState([]);
  const [naDrinks, setnaDrinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sugarLevel, setSugarLevel] = useState("regular");
  const [iceLevel, setIceLevel] = useState("regular ice");
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  
  const drinkRefs = useRef({});

  const scrollToItem = () => {
    const foundKey = Object.keys(drinkRefs.current).find(name => 
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (foundKey && drinkRefs.current[foundKey]) {
      drinkRefs.current[foundKey].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };


  useEffect(() => {
    // Update the CSS variable when the multiplier changes
    document.documentElement.style.setProperty('--font-size-multiplier', multiplier);
  }, [multiplier]);

  const increaseFontSize = () => setMultiplier(multiplier + 0.1);
  const decreaseFontSize = () => setMultiplier(multiplier - 0.1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let brownSugarDrinks = [], brewTeaDrinks = [], luluDrinks = [], snowVelvetDrinks = [], milkTeaDrinks = [], naDrinks = [];
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
          const ingredients = drink.ingredients.toLowerCase();
          if (ingredients.includes("brown sugar")) {
            brownSugarDrinks.push(drink);
          } else if (ingredients.includes("brew tea")) {
            brewTeaDrinks.push(drink);
          } else if (ingredients.includes("lulu")) {
            luluDrinks.push(drink);
          } else if (ingredients.includes("snow velvet")) {
            snowVelvetDrinks.push(drink);
          } else if (ingredients.includes("milk tea")) {
            milkTeaDrinks.push(drink);
          } else {
            naDrinks.push(drink);
          }
          
        });
        setBrownSugarDrinks(brownSugarDrinks);
        setBrewTeaDrinks(brewTeaDrinks);
        setLuluDrinks(luluDrinks);
        setSnowVelvetDrinks(snowVelvetDrinks);
        setmilkTeaDrinks(milkTeaDrinks);
        setnaDrinks(naDrinks);
       
        
        setQuantities(initialQuantities);
        setSelectedToppings(initialToppings);
        // ... existing code to fetch data ...
    // Group drinks based on ingredients
    // let brownSugarDrinks = [], brewTeaDrinks = [], luluDrinks = [], snowVelvetDrinks = [], milkTeaDrinks = [], naDrinks = [];
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
      
      console.log(brownSugarDrinks);
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
        sugarLevel: sugarLevel,
        iceLevel: iceLevel,
        quantity: newQuantity,
        cost: menuItems.find(item => item.name_of_item === drinkName).cost_of_item,
        ingredients: menuItems.find(item => item.name_of_item === drinkName).ingredients
      };
      setCart([...cart, newItem]);
      setSugarLevel("regular");
      setIceLevel("regular ice");
    }
  };
  
          
  const handleToppingDone = () => {
    if (isEditing) {
        // Handle updating an existing item
        const updatedCart = cart.map(item => {
            if (item.id === editingItemId) {
                return {
                    ...item,
                    topping: selectedToppings[selectedDrink].join(', '),
                    sugarLevel: sugarLevel,
                    iceLevel: iceLevel
                };
            }
            return item;
        });

        setCart(updatedCart);
        setShowCart(true);
    } else {
        // Handle adding a new item
        addToCart();
    }

    // Reset and close modal
    resetSelections();
    setShowToppingsModal(false);
    setIsEditing(false); // Reset the editing state
};

const handleCloseCart = () => {
  if (!isEditing) {
      setShowCart(false);
  }
};

const resetSelections = () => {
    setSelectedDrink(null);
    setSelectedToppings({});
    setSugarLevel('regular');
    setIceLevel('regular ice');
    setIsEditing(false);
    setEditingItemId(null);
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

  const handleEditDone = () => {
    // Update the item in the cart
    const updatedCart = cart.map(item => {
        if (item.id === `${selectedDrink}-${selectedToppings[selectedDrink].join(', ')}`) {
            return {
                ...item,
                topping: selectedToppings[selectedDrink].join(', '),
                sugarLevel: sugarLevel,
                iceLevel: iceLevel
            };
        }
        return item;
    });

    setCart(updatedCart);
    setShowToppingsModal(true);
    // Reset selections
    setSelectedDrink(null);
    setSelectedToppings({});
    setSugarLevel('regular');
    setIceLevel('regular ice');
};
const handleEditClick = (itemId) => {
  const itemToEdit = cart.find(item => item.id === itemId);
  if (itemToEdit) {
      setSelectedDrink(itemToEdit.name);
      setSelectedToppings({ [itemToEdit.name]: itemToEdit.topping.split(', ') });
      setSugarLevel(itemToEdit.sugarLevel);
      setIceLevel(itemToEdit.iceLevel);
      setIsEditing(true);
      setEditingItemId(itemId);
      setShowToppingsModal(true);
      setShowCart(false);
  }
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

      <div className="search-bar">
        <Form.Control
          type="text"
          placeholder="Search for a drink..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              scrollToItem();
            }
          }}
        />
      </div>

      <h1 className="text-center mb-4">Drinks Menu</h1>
      
      <h2 className='categoryTitle'>Brown Sugar Drinks</h2>
      <div className="drink-cards">
    
        {brownSugarDrinks.map((drink) => (
          <Card key={drink.name_of_item} className="drink-card" ref={el => drinkRefs.current[drink.name_of_item] = el}>
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
      <h2 className='categoryTitle'>Brew Tea Drinks</h2>
      <div className="drink-cards">
      
        {brewTeaDrinks.map((drink) => (
          <Card key={drink.name_of_item} className="drink-card" ref={el => drinkRefs.current[drink.name_of_item] = el}>
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
      <h2 className='categoryTitle'>Lulu Drinks</h2>
      <div className="drink-cards">
      
        {luluDrinks.map((drink) => (
          <Card key={drink.name_of_item} className="drink-card" ref={el => drinkRefs.current[drink.name_of_item] = el}>
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
      <h2 className='categoryTitle'>Snow Velvet Drinks</h2>
      <div className="drink-cards">
        {snowVelvetDrinks.map((drink) => (
          <Card key={drink.name_of_item} className="drink-card" ref={el => drinkRefs.current[drink.name_of_item] = el}>
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
      
      <h2 className='categoryTitle'>Milk Tea Drinks</h2>
      <div className="drink-cards">
        {milkTeaDrinks.map((drink) => (
          <Card key={drink.name_of_item} className="drink-card" ref={el => drinkRefs.current[drink.name_of_item] = el}>
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
      <h2 className='categoryTitle'>Other Drinks</h2>
      <div className="drink-cards">
        {naDrinks.map((drink) => (
          <Card key={drink.name_of_item} className="drink-card"  ref={el => drinkRefs.current[drink.name_of_item] = el}>
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
          <Form.Group>
    <Form.Label>Sugar Level</Form.Label>
    <Form.Control as="select" value={sugarLevel} onChange={(e) => setSugarLevel(e.target.value)}>
      <option value="0%">0%</option>
      <option value="50%">50%</option>
      <option value="regular">Regular</option>
      <option value="120%">120%</option>
    </Form.Control>
  </Form.Group>

  <Form.Group>
    <Form.Label>Ice Level</Form.Label>
    <Form.Control as="select" value={iceLevel} onChange={(e) => setIceLevel(e.target.value)}>
      <option value="no ice">No Ice</option>
      <option value="lite ice">Lite Ice</option>
      <option value="regular ice">Regular Ice</option>
    </Form.Control>
  </Form.Group>
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
                  <th>Sugar Level</th>
                  <th>Ice Level</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                     <Button variant="outline-secondary" onClick={() => handleEditClick(item.id)}>Edit</Button>
                    <td>{item.name}</td>
                    <td>{item.topping}</td>
                    <td>{item.sugarLevel}</td> 
                    <td>{item.iceLevel}</td>   
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

