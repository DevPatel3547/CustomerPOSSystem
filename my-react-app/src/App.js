// src/App.js
import React from 'react';

import HomePage from './components/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerP from './components/customer';
import Menu from './components/Menu';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/customer" element={<CustomerP />} />
          <Route path="/menu" element={<Menu />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;