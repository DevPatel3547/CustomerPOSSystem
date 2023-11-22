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

  return (
    <Container className="py-4">
      <div className="backButton">
        <Button variant="secondary" onClick={() => navigate('/')}>Back</Button>
      </div>
      <h1 className="text-center mb-4">Menu Board</h1>

      <h2>Drinks</h2>
      <div className="menuBoard">
        {menuItems.map((drink) => (
          <Card key={drink.name_of_item} className="itemCard">
            <Card.Body>
              <Card.Title>{drink.name_of_item}</Card.Title>
              <Card.Text>
                Price: ${drink.cost_of_item}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>

      <h2>Toppings</h2>
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
