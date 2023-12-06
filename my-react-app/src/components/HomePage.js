import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  let navigate = useNavigate();
  const [multiplier, setMultiplier] = useState(1); // Start with no scaling


  useEffect(() => {
    // Update the CSS variable when the multiplier changes
    document.documentElement.style.setProperty('--font-size-multiplier', multiplier);
  }, [multiplier]);

  const increaseFontSize = () => setMultiplier(multiplier + 0.1);
  const decreaseFontSize = () => setMultiplier(multiplier - 0.1);
  
  return (
    <div className="homepage">
    <div className="textSize">
    <button onClick={increaseFontSize}>+ Font Size</button>
      <button onClick={decreaseFontSize}>- Font Size</button>
      </div>
      <div className="central-image">
        <h1 style={{color: 'white'}} className="titles">The Alley</h1>
        <div className="nav-options">
          <span onClick={() => navigate('/managerLogin')}>Manager</span>
          <span onClick={() => navigate('/customer')}>Customer</span>
          <span onClick={() => navigate('/login')}>Cashier</span>
          <span onClick={() => navigate('/menu-board')}>Menu Board</span>
        </div>
      </div>
      <div id="google_translate_element"></div>
    </div>
  );
};

export default HomePage;
