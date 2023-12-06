import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import './menuboard.css'; // Ensure you have this CSS file for styling

const MenuBoard = () => {
  let navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [toppings, setToppings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://project-3-team910-10b-backend.onrender.com/gettable/menu');
        const drinks = response.data.filter(item => item.type === 'Drink');
        const toppingItems = response.data.filter(item => item.type === 'Topping');
        setMenuItems(drinks);
        setToppings(toppingItems);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const [multiplier, setMultiplier] = useState(1); // Start with no scaling


  useEffect(() => {
    // Update the CSS variable when the multiplier changes
    document.documentElement.style.setProperty('--font-size-multiplier', multiplier);
  }, [multiplier]);

  const increaseFontSize = () => setMultiplier(multiplier + 0.1);
  const decreaseFontSize = () => setMultiplier(multiplier - 0.1);

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

  return (
    
    <Container className="py-4">
      <div className="textSize">
    <button onClick={increaseFontSize}>+ Font Size</button>
      <button onClick={decreaseFontSize}>- Font Size</button>
      </div>
      <div className="backButton">
        <Button variant="secondary" onClick={() => navigate('/')}>Back</Button>
      </div>
      <div className="MenuBoardTitle">Menu Board</div>
      <div className="ItemTypeHeader">
        Drinks
      </div>
      <div className="menuBoard">
        {menuItems.map((drink) => (
          <Card key={drink.name_of_item} className="itemCard">
            <Card.Body>
            <Card.Img 
      variant="top" 
      src={`/drinkImages/${drinkImageMap[drink.name_of_item] || 'default.png'}`}
      alt={drink.name_of_item}
      style={{ height: '200px', width: '100%', objectFit: 'cover' }} // Adjust height as needed
    />
              <Card.Title >{drink.name_of_item}</Card.Title>
              <Card.Text>
                Price: ${drink.cost_of_item}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>

      <div className="ItemTypeHeader">
        Toppings
      </div>
      <div className="menuBoard">
        {toppings.map((topping) => (
          <Card key={topping.name_of_item} className="itemCard">
            <Card.Body>
              <Card.Title>{topping.name_of_item}</Card.Title>
              <Card.Text>
                Price: ${topping.cost_of_item}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default MenuBoard;
