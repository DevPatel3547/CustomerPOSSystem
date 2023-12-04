// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CustomerP from './components/customer';
import Menu from './components/menu';
import Checkout from './components/Checkout';
import Login from './components/login';
import Cashier from './components/cashier';
import MenuBoard from './components/menuboard';
import Manager from './components/Manager';
import OrderHistory from './components/OrderHistory';
import EditMenu from './components/EditMenu';

function App() {
  const [cart, setCart] = useState([]); // Initialize the cart state here

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/customer" element={<CustomerP />} />
          <Route path="/menu" element={<Menu cart={cart} setCart={setCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cashier" element={<Cashier cart={cart} setCart={setCart}/>} />
          <Route path="/menu-board" element={<MenuBoard cart={cart} setCart={setCart} />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/OrderHistory" element={<OrderHistory />} />
          <Route path="/EditMenu" element={<EditMenu />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
