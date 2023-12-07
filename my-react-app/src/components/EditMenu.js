import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button, Modal, Form } from 'react-bootstrap';
import './EditMenu.css';

const EditMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [newPrice, setNewPrice] = useState('');
    const [newName, setNewName] = useState('');
  // New item states
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemType, setNewItemType] = useState('Drink');
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [allIngredients, setAllIngredients] = useState([]);


  const drinkImageMap = {
    "Snow Velvet Assam Black Tea": "Snow Velvet Assam Black Tea.avif",
    "Snow Velvet Cream Cold Brew": "Snow Velvet Cream Cold Brew.png",
    "Snow Velvet Grape LuLu": "Snow Velvet Grape Lulu.png",
    "Snow Velvet Jasmine Green Tea": "Snow Velvet Jasmine Green Tea.avif",
    "Snow Velvet Peach Oolong Tea": "Snow Velvet Peach Oolong Tea.avif",
    "Snow Velvet Royal No 9": "Snow Velvet Royal No 9.avif",
    "Strawberry Lulu": "Strawberry Lulu.avif",
    "Taro Coconut Milk Tea": "Taro Coconut Milk Tea.jpg",
    "Taro Milk Tea": "Taro Milk Tea.jpg",
    "Taro Smoothie": "Taro Smoothie.jpg",
    "The Alley Assam Black Tea": "The Alley Assam Black Tea.avif",
    "The Alley Assam Milk Tea": "The Alley Assam Milk Tea.jpg",
    "The Alley Trio": "The Alley Trio.jpg",
    "Ube Creme Brulee Brown Sugar Deerioca Milk": "Ube Creme Brulee Brown Sugar Deerioca Milk.png",
    "Ube Taro Brown Sugar Deerioca Milk": "Ube Taro Brown Sugar Deerioca Milk.avif",
    "Yogurt Grape LuLu": "Yogurt Grape Lulu.png",
    "Brown Sugar Cream Cold Brew": "Brown Sugar Cream Cold Brew.jpg",
    "Brown Sugar Deerioca Creme Brulee Milk": "Brown Sugar Deerioca Creme Brulee Milk.jpg",
    "Brown Sugar Deerioca Milk": "Brown Sugar Deerioca Milk.jpg",
    "Cocoa Brown Sugar Deerioca Milk": "Cocoa Brown Sugar Deerioca Milk.jpg",
    "Cocoa Cream Cold Brew": "Cocoa Cream Cold Brew.jpg",
    "Deerioca Creme Brulee Cold Brew": "Deerioca Creme Brulee Cold Brew.avif",
    "Iced Peach Oolong Grape LuLu": "Iced Peach Oolong Grape LuLu.webp",
    "Jasmine Green Milk Tea": "Jasmine Green Milk Tea.jpg",
    "Jasmine Green Tea": "Jasmine Green Tea.avif",
    "Lychee Green Tea": "Lychee Green Tea.jpg",
    "Lychee LuLu": "Lychee LuLu.jpg",
    "Mango Frappe": "Mango Frappe.jpg",
    "Mango Green Tea with Jelly Ball": "Mango Green Tea with Jelly Ball.jpg",
    "Mango LuLu": "Mango Lulu.png",
    "Matcha Brown Sugar Deerioca Milk": "Matcha Brown Sugar Deerioca Milk.avif",
    "Matcha Purple Rice Yogurt": "Matcha Purple Rice Yogurt.webp",
    "Milk Tea Cold Brew": "Milk Tea Cold Brew.jpg",
    "Orange Lulu": "Orange Lulu.avif",
    "Original Yogurt Purple Rice": "Original Yogurt Purple Rice.webp",
    "Passion Fruit Green Tea": "Passion Fruit Green Tea.jpg",
    "Peach Frappe": "Peach Frappe.jpg",
    "Peach Oolong Purple Rice Yogurt": "Peach Oolong Purple Rice Yogurt.jpg",
    "Peach Oolong Tea": "Peach Oolong Tea.avif",
    "Royal No. 9 Black Tea": "Royal No. 9 Black Tea.avif",
    "Royal No. 9 Milk Tea": "Royal No. 9 Milk Tea.jpg",
    // Add other drink-image mappings here
  };

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://project-3-team910-10b-backend.onrender.com/gettable/menu');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    const fetchInventoryData = async () => {
      try {
          const response = await axios.get('https://project-3-team910-10b-backend.onrender.com/gettable/inventory');
          setIngredients(response.data.map(item => ({ label: item.name_of_item, value: item.name_of_item })));
      } catch (error) {
          console.error('Error fetching inventory data:', error);
      }
  };
  fetchInventoryData();
  const fetchIngredients = async () => {
    try {
      const response = await axios.get('https://project-3-team910-10b-backend.onrender.com/gettable/menu');
      const ingredients = response.data
        .filter(item => item.type === 'Ingredient')
        .map(item => ({ label: item.name_of_item, value: item.name_of_item }));
      console.log("Fetched Ingredients:", ingredients); // Debug log
      setAllIngredients(ingredients);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };
  
fetchIngredients();
  }, []);

  const handleEdit = (item) => {
    setCurrentItem(item);
    setNewPrice(item.cost_of_item.toString());
    setNewName(item.name_of_item); // Set the new name

    const initialIngredients = item.ingredients.split(', ').map(ingredient => {
      return allIngredients.find(i => i.label === ingredient) || { label: ingredient, value: ingredient };
    });
    setSelectedIngredients(initialIngredients);
    setShowEditModal(true);
  };


  const saveChanges = async () => {
    try {
      await axios.post('https://project-3-team910-10b-backend.onrender.com/updateTable', {
        table: 'menu',
        name_of_item: newName, 
        cost_of_item: newPrice,
        ingredients: selectedIngredients.map(i => i.label).join(', '),
        identify: 'name_of_item',
        identifyKey: currentItem.name_of_item
      });
      // Update the local state with new name and price
      setMenuItems(items => 
        items.map(item => 
          item.name_of_item === currentItem.name_of_item ? { ...item, name_of_item: newName, cost_of_item: newPrice } : item
        )
      );
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating item:', error);
      // Handle error
    }
  };

  // Handle removing selected ingredient
    const removeSelectedIngredient = (ingredientToRemove) => {
        setSelectedIngredients(selectedIngredients.filter(ingredient => ingredient.value !== ingredientToRemove.value));
    };

    // Render selected ingredients with remove option
    const renderSelectedIngredients = () => {
        return selectedIngredients.map(ingredient => (
            <div key={ingredient.value} className="selected-ingredient">
                {ingredient.label}
                <button type="button" onClick={() => removeSelectedIngredient(ingredient)}>X</button>
            </div>
        ));
    };

    // Handle dropdown selection change
    const handleDropdownChange = (e) => {
        const selectedValue = e.target.value;
        const ingredientToAdd = ingredients.find(ingredient => ingredient.value === selectedValue);
        if (ingredientToAdd && !selectedIngredients.some(i => i.value === ingredientToAdd.value)) {
            setSelectedIngredients([...selectedIngredients, ingredientToAdd]);
        }
    };


  const handleRemove = async (itemName) => {
    try {
      // Prepare the data for deletion
      const dataToSend = {
        table: 'menu', // Replace with your actual table name
        identify: 'name_of_item', // Replace with your actual identification column
        identifyKey: itemName // The unique identifier for the item to delete
      };
  
      // Send the DELETE request to the backend
      const response = await axios.post('https://project-3-team910-10b-backend.onrender.com/deleteItem', dataToSend);
  
      if (response.status === 200) {
        // Remove the item from the local state
        setMenuItems(items => items.filter(item => item.name_of_item !== itemName));
        console.log('Item removed successfully:', response.data);
      } else {
        console.error('Error removing item:', response.data);
      }
    } catch (error) {
      console.error('Error removing item:', error);
      // Handle error
    }
  };

    // Handle opening the Add New Item modal
    const handleAddNewItem = () => {
      setShowAddModal(true);
    };
  
    // Handle changes in the new item form
    const handleNewItemChange = (e, field) => {
      if (field === 'type') {
        setNewItemType(e.target.value);
      } else if (field === 'name') {
        setNewItemName(e.target.value);
      } else if (field === 'price') {
        setNewItemPrice(e.target.value);
      }
    };
  
    // Handle ingredient checkbox changes
    const handleIngredientChange = (ingredientName) => {
      setSelectedIngredients(prev => {
        if (prev.includes(ingredientName)) {
          return prev.filter(i => i !== ingredientName);
        } else {
          return [...prev, ingredientName];
        }
      });
    };
  
    const submitNewItem = async () => {
      try {
        // Prepare the data for the menu item
        const menuItemData = {
          table: 'menu',
          type: newItemType,
          name_of_item: newItemName,
          cost_of_item: newItemPrice,
          numbers_sold_during_day: 100, // example static value
          ingredients: selectedIngredients.map(i => i.label).join(', ')
        };
    
        // Send POST request to add the new menu item
        const menuResponse = await axios.post('https://project-3-team910-10b-backend.onrender.com/insertInto', menuItemData);
        if (menuResponse.status === 200) {
          console.log('Menu item added successfully:', menuResponse.data);
        } else {
          console.error('Error adding menu item:', menuResponse.data);
        }
    
        // If an image is selected, proceed to upload it
        if (selectedImage) {
          const formData = new FormData();
          formData.append('image', selectedImage);
    
          // Send POST request to upload the image
          const imageResponse = await axios.post('https://project-3-team910-10b-backend.onrender.com/upload-image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
    
          // Log the response from the image upload
          console.log('Image upload response:', imageResponse.data);
        }
    
        // Reset states and close the modal
        setShowAddModal(false);
        setNewItemType('Drink');
        setNewItemName('');
        setNewItemPrice('');
        setSelectedIngredients([]);
        setSelectedImage(null); // Reset the image state
    
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
  
  return (
    <Container className="edit-menu-container">
      <h1 className="text-center">Manage Menu</h1>
      <Button variant="success" className="add-item-button" onClick={handleAddNewItem}>Add New Item</Button>
      <div className="menu-items">
      {menuItems.map((item) => (
        <Card key={item.name_of_item} className="menu-item-card">
          
          <Card.Body>
          <Card.Img 
            variant="top" 
            src={`/drinkImages/${drinkImageMap[item.name_of_item] || 'default.png'}`}
            alt={item.name_of_item}
            style={{ height: '200px', width: '100%', objectFit: 'cover' }}
          />
            <Card.Title>{item.name_of_item}</Card.Title>
            <Card.Text>Price: ${item.cost_of_item}</Card.Text>
              <Button variant="primary" onClick={() => handleEdit(item)}>Edit</Button>
              <Button variant="danger" onClick={() => handleRemove(item.name_of_item)}>Remove</Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {showEditModal && (
        <div className="custom-modal">
          <div className="custom-modal-content">
            <span className="custom-modal-close" onClick={() => setShowEditModal(false)}>&times;</span>
            <h4>Edit Item: {currentItem?.name_of_item}</h4>
            <div className="custom-modal-body">
              <label>New Name</label>
              <input 
                type="text" 
                value={newName} 
                onChange={(e) => setNewName(e.target.value)}
              />
              <label>New Price</label>
              <input 
                type="number" 
                value={newPrice} 
                onChange={(e) => setNewPrice(e.target.value)}
              />



                      <label>Ingredients</label>
                        <div>
                            {renderSelectedIngredients()}
                            <select onChange={handleDropdownChange}>
                                {ingredients.map(ingredient => (
                                    <option key={ingredient.value} value={ingredient.value}>
                                        {ingredient.label}
                                    </option>
                                ))}
                            </select>
                        </div>
            </div>
            <div className="custom-modal-footer">
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={saveChanges}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

{showAddModal && (
        <div className="custom-modal">
          <div className="custom-modal-content">
            <span className="custom-modal-close" onClick={() => setShowAddModal(false)}>&times;</span>
            <h4>Add New Item</h4>
            <div className="custom-modal-body">
              <label>Type</label>
              <select value={newItemType} onChange={(e) => handleNewItemChange(e, 'type')}>
                <option value="Drink">Drink</option>
                <option value="Topping">Topping</option>
              </select>
              <label>Name</label>
              <input type="text" value={newItemName} onChange={(e) => handleNewItemChange(e, 'name')} />
              <label>Price</label>
              <input type="number" value={newItemPrice} onChange={(e) => handleNewItemChange(e, 'price')} />
              <label>Ingredients</label>
                        <div>
                            {renderSelectedIngredients()}
                            <select onChange={handleDropdownChange}>
                                {ingredients.map(ingredient => (
                                    <option key={ingredient.value} value={ingredient.value}>
                                        {ingredient.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <label>Image</label>
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange} 
                        />
            </div>
            <div className="custom-modal-footer">
              <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
              <Button variant="primary" onClick={submitNewItem}>Add Item</Button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default EditMenu;
