// src/components/HomePage.js
import React, { useState } from 'react';
import ScaleText from 'react-scale-text';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import './customer.css';
import { useEffect } from 'react';
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
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to manage modal visibility
  const navigate = useNavigate();
  const particlesConfig = {
    particles: {
      number: {
        value: 80, // Number of particles
        density: {
          enable: true,
          value_area: 800 // Area that particles cover
        }
      },
      color: {
        value: "#ffffff" // Color of the particles
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false
        }
      },
      size: {
        value: 5, // Size of the particles
        random: true
      },
      line_linked: {
        enable: false
      },
      move: {
        speed: 1 // Speed of the particle movement
      }
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  
    
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }
  const goToMenu = () => {
    navigate('/Menu');

  }
  // useEffect(() => { //THIS CAUSES ERRORS
  //   Particles.init({
  //     selector: '.Overlay',
  //     ...particlesConfig
  //   });
  // }, []);
  
  
  return (
    <div className="customer-container">
      <div className = "backButton">
      <button onClick={() => navigate('/')}>Back</button>
      </div>
      <div className = "topImgDisplay">
    </div>
      <h1>Welcome to the Alley!</h1>
      <div className="button-selection">
      <ScaleText>
      <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='https://www.google.com/maps/dir//The+Alley,+23220+Grand+Cir+Blvd+Ste+130,+Katy,+TX+77449/@29.7884538,-95.8549678,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x864127881412378f:0x207b18bb4c6f0802!2m2!1d-95.7725655!2d29.7883304?entry=ttu';
      }}> Find a location near you!</button>
      </ScaleText>
      <ScaleText>
        <button onClick={openModal}>Preview of what we have to offer!</button>
        </ScaleText>
        <ScaleText>
        <button onClick={goToMenu}>Order Now</button>
        </ScaleText>
      </div>
      
      <div className="button-selection-second">
        <div className= "text-column">
          <ScaleText>
      <p>Big and small plans in life transcends into experiences;
          we try to combine living and design into a life style, to devote into art and
          cultural events, to develop heartwarming handcrafted living designs ,
          to achieve touching moments through the process.</p>
      <p>Casually sitting in The Alley, wander and imagine the ideal life,
          devour a cup of afternoon tea in a comfy setting, mesmerize in a springtime dream
          like the subtle delight of honey, such unspeakable snugness will soak through your heart
          via The Alley drink, it’s time for tea!</p>
        <p>A good cup of tea is hidden within each and every one’s heart. On that relaxing afternoon,
          bath in sunshine’s’ warmth, sprinkle by breezy wind, charmed by a lover’s smile,
          fulfilled by the pleasing aftertaste. Reminisce the touching satisfaction from that
          first cup of good tea, to share this delight with everyone, to keep up with this originality,
          give rise to “The Alley”.</p>
        <p>We firmly believe one drinks sentiment from tea, devour a sense of happiness.
          We hope to hide this among the deepest part of your heart,
          the part of indescribable sentiment that one look forward to.
          Through the drinks of The Alley, to construct the expression of life well-lived.</p>
          </ScaleText>
</div>

    <div className = "imgDisplay">
    </div>
      
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Fan Favorite Image"
        className="Modal"
        overlayClassName="Overlay">
  
        <div style={{ position: 'relative', height: '100%' }}/>
          
      </Modal>
    </div>
  );
}



export default CustomerPage;
