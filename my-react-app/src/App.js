// App.js
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart, setCart as setCartAction } from './store/cartSlice';
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
import ManagerLogin from './components/managerLogin';
import Inventory from './components/Inventory';
import InventoryCheckout from './components/InventoryCheckout';


function App() {
  // The order lives in the Redux store (store/cartSlice.js); components get it as props.
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const setCart = useCallback(
    (next) => dispatch(setCartAction(typeof next === 'function' ? next(cart) : next)),
    [dispatch, cart],
  );

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
          <Route path="/managerLogin" element={<ManagerLogin />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/OrderHistory" element={<OrderHistory />} />
          <Route path="/EditMenu" element={<EditMenu />} />
          <Route path="/Inventory" element={<Inventory />} />
          <Route path="/InventoryCheckout" element={<InventoryCheckout />} />
        </Routes>
        
      </div>
    </Router>
    
  );
}

export default App;
