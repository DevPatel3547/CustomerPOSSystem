// src/components/HomePage.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import './customer.css';
import Particles from 'react-tsparticles';


const particlesOptions = {


  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 10000
      }
    },
    shape: {
      type: 'circle'
    },
    opacity: {
      value: 0.3,
      random: true,
      anim: {
        enable: false
      }
    },
    size: {
      value: 10,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: false
    },
    move: {
      enable: true,
      speed: 1,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'bubble'
      },
      onclick: {
        enable: false
      },
      resize: true
    },
    modes: {
      bubble: {
  distance: 250,
  size: 100,
  duration: 2,
  opacity: 1, // This will make them fully opaque on hover
  speed: 3
}
    }
  },
  retina_detect: true
};

const CustomerPage = () => {
  let navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to manage modal visibility

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }
  return (
    <div className="customer-container">
   
      <h1>Welcome to the Alley!</h1>
      <div className="button-selection">
      <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='https://www.google.com/maps/dir//The+Alley,+23220+Grand+Cir+Blvd+Ste+130,+Katy,+TX+77449/@29.7884538,-95.8549678,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x864127881412378f:0x207b18bb4c6f0802!2m2!1d-95.7725655!2d29.7883304?entry=ttu';
      }}> Find a location near you!</button>
        <button onClick={() => navigate('/')}>Look at our delicious drinks!</button>
        <button onClick={() => navigate('/menu')}>Try our Seasonal Item</button>
      </div>
      <h1>Favorite Toppings</h1>
      <div className="button-selection-second">
        <div className= "text-column">
      <p>Casually sitting in The Alley, wander and imagine the ideal life,
          devour a cup of afternoon tea in a comfy setting, mesmerize in a springtime dream
          like the subtle delight of honey, such unspeakable snugness will soak through your heart
          via The Alley drink, it’s time for tea!</p>
      <p>Big and small plans in life transcends into experiences;
        we try to combine living and design into a life style, to devote into art and
        cultural events, to develop heartwarming handcrafted living designs ,
        to achieve touching moments through the process.</p>
</div>

      <button>Customize Drink</button>
      
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Fan Favorite Image"
        className="Modal"
        overlayClassName="Overlay">
        <div style={{ position: 'relative', height: '100%' }}/>
          <Particles className="particles" params={particlesOptions} />
      </Modal>
    </div>
  );
}

export default CustomerPage;
