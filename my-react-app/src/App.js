// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CustomerP from './components/customer';
import Menu from './components/Menu';
import Checkout from './components/Checkout';

function App() {
  const [cart, setCart] = useState([]); // Initialize the cart state here

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/customer" element={<CustomerP />} />
          {/* Pass cart and setCart as props to Menu */}
          <Route path="/menu" element={<Menu cart={cart} setCart={setCart} />} />
          {/* Pass cart as a prop to Checkout */}
          <Route path="/checkout" element={<Checkout cart={cart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
