import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import './Pages.css';

import Header from './components/Header';
import RegistrationModal from './components/RegistrationModal';
import CatalogPage from './pages/CatalogPage';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import { logoutUser } from './api/auth';
import { type ICartItem, type IProduct } from './types';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAddToCart = (product: IProduct) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleLogout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
  };

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <BrowserRouter>
      <Header
        cartItemsCount={totalItems}
        isLoggedIn={isLoggedIn}
        onOpenRegister={() => setIsModalOpen(true)}
        onLogout={handleLogout}
      />
      <main className="container">
        <Routes>
          <Route path="/" element={<CatalogPage onAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={<CartPage items={cartItems} setItems={setCartItems} />} />
          <Route path="/checkout" element={<CheckoutPage isLoggedIn={isLoggedIn} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => setIsLoggedIn(true)}
      />
    </BrowserRouter>
  );
};

export default App;