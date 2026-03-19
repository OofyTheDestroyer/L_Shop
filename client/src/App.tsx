import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import { ICartItem } from './types';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([
    {
      product: { id: '1', title: 'Палочки Pocky (Клубника)', description: 'Классический японский бисквит', price: 5.50, category: 'Снеки', inStock: true },
      quantity: 2
    },
    {
      product: { id: '2', title: 'Моти с манго', description: 'Тайваньский десерт (Taiwan Dessert)', price: 12.00, category: 'Сладости', inStock: true },
      quantity: 1
    }
  ]);

  return (
    <BrowserRouter>
      <div className="container">
        <nav className="header">
          <Link to="/cart">Корзина</Link>
          <Link to="/checkout">Оформление доставки</Link>
        </nav>

        <Routes>
          {/* Вот эта строчка спасает от белого экрана! */}
          <Route path="/" element={<Navigate to="/cart" replace />} />
          
          <Route path="/cart" element={<CartPage items={cartItems} setItems={setCartItems} />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;