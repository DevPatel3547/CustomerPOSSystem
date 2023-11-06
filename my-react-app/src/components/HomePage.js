import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { Fade } from 'react-awesome-reveal';
import './HomePage.css';

const HomePage = () => {
  let navigate = useNavigate();

  // Handle the scrolling effect for the navbar
  const [scrolled, setScrolled] = React.useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  let navbarClasses = ['custom-navbar'];
  if (scrolled) {
    navbarClasses.push('scrolled');
  }

  return (
    <div className="homepage">
      <div className="image-placeholder">
        {/* Background image set in CSS */}
      </div>
      
      <Navbar bg="light" variant="light" expand="lg" className={navbarClasses.join(" ")}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#manager">Manager</Nav.Link>
            <Nav.Link onClick={() => navigate('/customer')}>Customer</Nav.Link>
            <Nav.Link href="#cashier">Cashier</Nav.Link>
            <Nav.Link href="#menu-board">Menu Board</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>



      {/* Fade-in sections on scroll */}
      <Fade triggerOnce>
        <div className="section section-white">
        <h1>Welcome to Our Site</h1>
        </div>
      </Fade>
      <Fade triggerOnce>
        <div className="section section-light">
          <p>Content for light section.</p>
        </div>
      </Fade>
      <Fade triggerOnce>
        <div className="section section-dark">
          <p>Content for dark section.</p>
        </div>
      </Fade>

      {/* You can add more sections here */}
    </div>
  );
};

export default HomePage;
