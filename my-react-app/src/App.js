// src/App.js
import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerP from './components/customer';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/customer" element={<CustomerP />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;