// src/components/HomePage.js
import React, { useState } from 'react';
import ScaleText from 'react-scale-text';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import './customer.css';
import { useEffect } from 'react';
import { Loader } from "@googlemaps/js-api-loader"
//AIzaSyCEFaXBQ4EVffaWnys01L4QmfaOIlk36HY

const CustomerPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to manage modal visibility
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const navigate = useNavigate();
  const [multiplier, setMultiplier] = useState(1); // Start with no scaling


  useEffect(() => {
    // Update the CSS variable when the multiplier changes
    document.documentElement.style.setProperty('--font-size-multiplier', multiplier);
  }, [multiplier]);

  const increaseFontSize = () => setMultiplier(multiplier + 0.1);
  const decreaseFontSize = () => setMultiplier(multiplier - 0.1);

  const openModal = () => {
    setModalIsOpen(true);
  
    
  }
  const closeModal = () => {
    setModalIsOpen(false);
  }
  const goToMenu = () => {
    navigate('/Menu');

  }

  const loadGoogleMap = () => {
    const loader = new Loader({
      apiKey: 'AIzaSyCEFaXBQ4EVffaWnys01L4QmfaOIlk36HY', //API KEY
      version: 'weekly',
    });
  
    return loader.load().then(() => {
      return window.google; // Return the google object
    });
  };

  useEffect(() => {
    if (isMapModalOpen) {
      loadGoogleMap().then((google) => {
        const map = new google.maps.Map(document.getElementById('map-overlay'), {
          center: { lat: 31.792290, lng: -95.768180 },
          zoom: 7,
        });
  
        new google.maps.Marker({
          position: { lat: 32.961740, lng: -96.682530 },
          map: map,
          label: "A",
          title: "The Alley",
          draggable: false,
          animation: google.maps.Animation.DROP
        });
        new google.maps.Marker({
          position: { lat: 33.089960, lng: -96.804840 },
          map: map,
          label: "B",
          title: "The Alley",
          draggable: false,
          animation: google.maps.Animation.DROP
        });
        new google.maps.Marker({
          position: { lat: 29.792290, lng: -95.768181 },
          map: map,
          label: "C",
          title: "The Alley",
          draggable: false,
          animation: google.maps.Animation.DROP
        });
      });
    }
  }, [isMapModalOpen]);
  
  
  
  return (
    <div className="customer-container">

      <div className = "topBar">
      <div className = "backButtons">
      <button onClick={() => navigate('/')}>Back</button>
      </div>
      <h1>Welcome to the Alley!</h1>
      </div>
      <div className="textSize">
    <button onClick={increaseFontSize}>+ Font Size</button>
      <button onClick={decreaseFontSize}>- Font Size</button>
      </div>
      <div className = "topImgDisplay">
    </div>
      <div className="button-selections">
      
      <button onClick={() => setIsMapModalOpen(true)}>Show Map</button>
      
      
        <button onClick={openModal}>Preview of what we have to offer!</button>
        
        
        <button onClick={goToMenu}>Order Now!</button>
        
      </div>
     
      <div className="second-parts">
      <h1>Bringing passion infused boba to people since 2013</h1>
      <div className = "textwImg">
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
      
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Fan Favorite Image"
        className="Modal"
        overlayClassName="Overlay">
  
        <div style={{ position: 'absolute', height: '100%' }}/>
          
      </Modal>
      <Modal
      isOpen={isMapModalOpen}
      onRequestClose={() => setIsMapModalOpen(false)}
      contentLabel="Map"
      className="MapModal" // Use the new class name here
      overlayClassName="Overlay">
      <div 
      id="map-overlay" 
      style={{ 
        width: '900px', 
        height: '600px', 
        position: 'absolute',  
        left: '50%',           
        top: '50%',            
        transform: 'translate(-50%, -50%)'
  }} 
/>
    </Modal>
    </div>
  );
}


export default CustomerPage;
