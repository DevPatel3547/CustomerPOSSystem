import React from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import Particles from 'particlesjs';
import { useEffect } from 'react';

const HomePage = () => {
    const navigate = useNavigate();
    
    const sections = [
        { title: 'Menu', description: 'Access and customize the dishes and prices for your restaurant.', route: '/' },
        { title: 'Customer', description: 'Manage customer feedback, reviews, and loyalty programs.', route: '/customer' },
        { title: 'Cashier', description: 'Handle transactions, refunds, and generate invoices.', route: '/' },
        { title: 'Manager', description: 'Oversee sales, staff, and daily operations.', route: '/' }
    ];
    
    useEffect(() => {
      Particles.init({
          selector: '#particles-js',
          maxParticles: 150,
          sizeVariations: 3,
          speed: 0.5,
          color: ['#DA0463', '#404B69', '#DBEDF3'],
          connectParticles: false,  // Removed the connections between particles
          responsive: [
              {
                  breakpoint: 768,
                  options: {
                      maxParticles: 100,
                      color: '#DA0463',
                      connectParticles: false
                  }
              }
          ],
          particles: {
              color: '#d1d1d1',
              shape: 'circle', // Changed to circles
              opacity: 0.7,
              size: 3,  // Adjust as needed
              size_random: true,
              nb: 150,
              line_linked: {
                  enable_auto: false
              },
              move: {
                  radius: 10,
                  type: 'top',  // particles move towards the top
                  speed: 1,
                  out_mode: 'out',
                  attract: {
                      enable: true,
                      rotateX: 600,
                      rotateY: 1200
                  }
              }
          }
      });
  }, []);
  
    return (
        <Container fluid>
            <canvas id="particles-js"></canvas>
            <Row className="justify-content-center text-center mb-5">
                <Col md={10}>
                    <h1>Welcome, How would you like to do this?</h1>
                </Col>
            </Row>
            <Row>
                {sections.map((section, index) => (
                    <Col md={6} key={index} className="mb-4">
                        <Card className="h-100 shadow-lg">
                            <Card.Body>
                                <Card.Title>{section.title}</Card.Title>
                                <Card.Text>
                                    {section.description}
                                </Card.Text>
                                <Button variant="primary" onClick={() => navigate(section.route)}>
                                    Go to {section.title}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default HomePage;
