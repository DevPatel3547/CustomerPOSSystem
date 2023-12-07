import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Inventory.css';
import { Container, Card, Button, Modal, Form} from 'react-bootstrap';

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [needsRestock, setNeedsRestock] = useState([]);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({ showAdjuster: false });
  const [showCartModal, setShowCartModal] = useState(false);
  const [restockQuantity, setRestockQuantity] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [restockValue, setRestockValue] = useState('');
  const [isCustomCartModalVisible, setIsCustomCartModalVisible] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  // ... (other functions remain unchanged)

  const handleCheckout = () => {
    navigate('/inventorycheckout', { state: { cart } }); // Navigate to checkout page with cart data
  };

  const syncQuantities = (itemName, newQuantity) => {
    // Update inventory
    setInventoryItems((currentItems) =>
      currentItems.map((item) =>
        item.name === itemName ? { ...item, quantity: newQuantity } : item
      )
    );

    // Update needsRestock as well if the item is there
    setNeedsRestock((currentItems) =>
      currentItems.map((item) =>
        item.name === itemName ? { ...item, quantity: newQuantity } : item
      )
    );

    // Update cart
    setCart((currentCart) =>
      currentCart.map((cartItem) =>
        cartItem.name === itemName ? { ...cartItem, quantity: newQuantity } : cartItem
      )
    );
  };

  // Adjust this function to handle both showing the modal and hiding the adjuster
  const handleRestockClick = (item) => {
    setSelectedItem({ ...item, showAdjuster: false }); // Hide adjuster when opening modal
    setIsModalVisible(true);
  };
  const toggleCustomCartModal = () => {
    setIsCustomCartModalVisible(!isCustomCartModalVisible);
  };
  

  const closeRestockModal = () => {
    setIsModalVisible(false);
    setRestockValue('');
  };

  const handleRestockSubmit = () => {
    const newQuantity = selectedItem.quantity + parseInt(restockValue, 10);
  
    // Update both the inventoryItems and needsRestock states with the new quantity and showAdjuster flag
    const updatedInventoryItems = inventoryItems.map(item => {
      if (item.name === selectedItem.name) {
        return { ...item, quantity: newQuantity, showAdjuster: true };
      }
      return item;
    });
  
    const updatedNeedsRestock = needsRestock.map(item => {
      if (item.name === selectedItem.name) {
        // If the updated quantity is still below the threshold, keep it in the needsRestock array
        if (newQuantity) {
          return { ...item, quantity: newQuantity, showAdjuster: true };
        } else {
          // Otherwise, remove it from the needsRestock array by returning null and filtering it out
          return null;
        }
      }
      return item;
    }).filter(item => item != null); // Filter out the null entries

      // Add or update the item in the cart
  const existingCartItemIndex = cart.findIndex(item => item.name === selectedItem.name);
  if (existingCartItemIndex >= 0) {
    // Update existing item in cart
    const updatedCart = cart.map((item, index) => 
      index === existingCartItemIndex ? { ...item, quantity: item.quantity + parseInt(restockValue, 10) } : item
    );
    setCart(updatedCart);
  } else {
    // Add new item to cart
    const cartItem = { ...selectedItem, quantity: parseInt(restockValue, 10) };
    setCart([...cart, cartItem]);
  }
  
    setInventoryItems(updatedInventoryItems);
    setNeedsRestock(updatedNeedsRestock);
    // Update the selectedItem state to trigger the re-render
    setSelectedItem({ ...selectedItem, quantity: newQuantity, showAdjuster: true });
    closeRestockModal();
  };
  
  
  
  const updateQuantity = (itemName, newQuantity) => {
    if (newQuantity >= 0) {
      setInventoryItems((currentItems) =>
        currentItems.map((item) =>
          item.name === itemName ? { ...item, quantity: newQuantity } : item
        )
      );
      
      // Update needsRestock as well if the item is also there
      setNeedsRestock((currentItems) =>
        currentItems.map((item) =>
          item.name === itemName ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // Function to toggle the cart modal
const toggleCartModal = () => {
  setShowCartModal(!showCartModal);
};



  // Update cart quantity from cart controls
const updateCartQuantity = (itemName, newQuantity) => {
  const updatedCart = cart.map(item =>
    item.name === itemName ? { ...item, quantity: newQuantity } : item
  );
  setCart(updatedCart);
};
  
  // Function to increment or decrement quantity from the card
  const adjustQuantity = (item, adjustment) => {
    const newQuantity = item.quantity + adjustment;
    if (newQuantity >= 0) {
      syncQuantities(item.name, newQuantity);
    }
  };


  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('https://project-3-team910-10b-backend.onrender.com/getTable/inventory');
        const items = response.data;
        setInventoryItems(items);

        // Determine which items need restocking
        const restockItems = items.filter(item => item.quantity <50);
        setNeedsRestock(restockItems);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchInventory();
  }, []);




  return (
    <Container className="inventory-container">
    <div className="cart-icon-container">
      <FaShoppingCart onClick={toggleCustomCartModal} />
    </div>
      <h1 className="text-center">Inventory Management</h1>
      
      <h2>Needs Restock</h2>
      <div className="inventory-items">
      {needsRestock.map((item) => (
        <Card key={item.id} className="inventory-item-card">
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>Quantity: {item.quantity}</Card.Text>
            {item.showAdjuster ? (
              <div className="quantity-adjuster">
                <FaMinus onClick={() => adjustQuantity(item, -1)} />
                <Form.Control
                  type="text"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.name, parseInt(e.target.value, 10))}
                />
                <FaPlus onClick={() => adjustQuantity(item, 1)} />
              </div>
            ) : (
              <Button variant="warning" onClick={() => handleRestockClick(item)}>Restock</Button>
            )}
          </Card.Body>
        </Card>
        ))}
      </div>

      <h2>All Inventory</h2>
      <div className="inventory-items">
      {inventoryItems.map((item) => (
        <Card key={item.id} className="inventory-item-card">
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>Quantity: {item.quantity}</Card.Text>
            {item.showAdjuster ? (
              <div className="quantity-adjuster">
                <FaMinus onClick={() => adjustQuantity(item, -1)} />
                <Form.Control
                  type="text"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.name, parseInt(e.target.value, 10))}
                />
                <FaPlus onClick={() => adjustQuantity(item, 1)} />
              </div>
            ) : (
              <Button variant="warning" onClick={() => handleRestockClick(item)}>Restock</Button>
            )}
          </Card.Body>
        </Card>
        ))}
      </div>

      {isModalVisible && (
        <div className="custom-modal">
          <div className="custom-modal-content">
            <span className="close-button" onClick={closeRestockModal}>&times;</span>
            <h4>Restock Item: {selectedItem?.name}</h4>
            <input
              type="number"
              value={restockValue}
              onChange={(e) => setRestockValue(e.target.value)}
              placeholder="Enter restock quantity"
            />
            <button onClick={handleRestockSubmit}>Done</button>
          </div>
        </div>
      )}




      {isCustomCartModalVisible && (
        <div className="custom-cart-modal">
          <div className="custom-cart-modal-content">
            <span className="custom-cart-close-button" onClick={toggleCustomCartModal}>&times;</span>
            <h4>Shopping Cart</h4>
            {/* Cart items list */}
            <div className="custom-cart-items">
              {cart.map((item, index) => (
                       <div className="custom-cart-items">
                       {cart.map((item, index) => (
                         <div key={index} className="custom-cart-item">
                           <span>{item.name}</span>
                           <div className="custom-cart-quantity-adjuster">
                             <FaMinus onClick={() => adjustQuantity(item, -1)} />
                             <input 
                               type="text" 
                               value={item.quantity} 
                               onChange={(e) => {
                                 const newQuantity = parseInt(e.target.value, 10);
                                 if (!isNaN(newQuantity)) {
                                   syncQuantities(item.name, newQuantity);
                                 }
                               }} 
                             />
                             <FaPlus onClick={() => adjustQuantity(item, 1)} />
                           </div>
                         </div>
                       ))}
                     </div>
              ))}
            </div>
            {/* Cart actions */}
            <div className="custom-cart-actions">
              <button onClick={toggleCustomCartModal}>Close</button>
              <button onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        </div>
      )}



    </Container>
  );
};

export default Inventory;
