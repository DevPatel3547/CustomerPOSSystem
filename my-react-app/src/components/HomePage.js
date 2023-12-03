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
  // useEffect(() => {
  //   const googleTranslateScriptId = 'google-translate-script';
  //   let scriptExists = document.getElementById(googleTranslateScriptId);
  
  //   if (!scriptExists) {
  //     try {
  //       const script = document.createElement('script');
  //       script.id = googleTranslateScriptId;
  //       script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  //       script.defer = true;
  //       document.body.appendChild(script);
  //     } catch (error) {
  //       console.error("Error loading Google Translate script:", error);
  //     }
  //   }
  
  //   window.googleTranslateElementInit = function() {
  //     try {
  //       if (window.google && window.google.translate && !document.querySelector('.goog-te-combo')) {
  //         new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
  //       }
  //     } catch (error) {
  //       console.error("Error initializing Google Translate:", error);
  //     }
  //   };
  
  //   return () => {
  //     // Cleanup
  //     const script = document.getElementById(googleTranslateScriptId);
  //     if (script) {
  //       document.body.removeChild(script);
  //     }
  //     const translateEl = document.getElementById('google_translate_element');
  //     if (translateEl) {
  //       translateEl.innerHTML = '';
  //     }
  //   };
  // }, []);

  return (
    <div className="homepage">
    <div className="textSize">
    <button onClick={increaseFontSize}>+ Font Size</button>
      <button onClick={decreaseFontSize}>- Font Size</button>
      </div>
      <div className="central-image">
        <h1 style={{color: 'white'}} className="titles">The Alley</h1>
        <div className="nav-options">
          <span onClick={() => navigate('/manager')}>Manager</span>
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
