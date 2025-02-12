// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import FindProduct from './pages/FindProduct';
import Cart from './pages/Cart';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/FindProduct" element={<FindProduct />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;