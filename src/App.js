import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import CartPage from './keranjang/CartPage';
import LoginPage from './login/LoginPage';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/produk" element={
          <PrivateRoute>
            <ProductList />
          </PrivateRoute>
        } />
        <Route path="/keranjang" element={
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
