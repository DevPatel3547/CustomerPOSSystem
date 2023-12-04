import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button, Modal, Form } from 'react-bootstrap';
import './EditMenu.css';

const EditMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [newPrice, setNewPrice] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/gettable/menu');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (item) => {
    setCurrentItem(item);
    setNewPrice(item.cost_of_item.toString());
    setShowEditModal(true);
  };

  const saveChanges = async () => {
    try {
      await axios.post('http://localhost:9000/updateprice', {
        table: 'menu', // Replace with your actual table name
        cost_of_item: newPrice,
        identify: 'name_of_item', // Replace with your actual identifier column name
        identifyKey: currentItem.name_of_item
      });
      setMenuItems(items => 
        items.map(item => 
          item.name_of_item === currentItem.name_of_item ? { ...item, cost_of_item: newPrice } : item
        )
      );
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating price:', error);
      // Handle error (e.g., show error message)
    }
  };

  const handleRemove = (itemName) => {
    // Placeholder function for remove functionality
    console.log(`Remove ${itemName}`);
  };

  return (
    <Container className="edit-menu-container">
      <h1 className="text-center">Manage Menu</h1>
      <Button variant="success" className="add-item-button">Add New Item</Button>
      <div className="menu-items">
        {menuItems.map((item) => (
          <Card key={item.name_of_item} className="menu-item-card">
            <Card.Body>
              <Card.Title>{item.name_of_item}</Card.Title>
              <Card.Text>Price: ${item.cost_of_item}</Card.Text>
              <Button variant="primary" onClick={() => handleEdit(item)}>Edit</Button> {/* Pass the entire item */}
              <Button variant="danger" onClick={() => handleRemove(item.name_of_item)}>Remove</Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Price</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>New Price for {currentItem?.name_of_item}</Form.Label>
            <Form.Control 
              type="number" 
              value={newPrice} 
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EditMenu;
