// App.tsx (Обновленный файл на основе предоставленного)
// Источники: [82, 83, 84, 92, 27, 28]
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// Импорт глобальных стилей
import './index.css'; 
import './Pages.css';

import Header from './components/Header';
import RegistrationModal from './components/RegistrationModal';
// Импорт новых страниц
import CatalogPage from './pages/CatalogPage'; 
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
// Импорт типов
import { type ICartItem, type IProduct } from './types';

// Тотальное использование TypeScript [16]
const App: React.FC = () => {
  // Состояние корзины [5, 27]
  const [cartItems, setCartItems] = useState<ICartItem[]>([
    {
      product: { 
          id: '1', title: 'Палочки Pocky (Клубника)', description: 'Классический японский бисквит', 
          price: 5.50, category: 'Снеки', inStock: true, weight: 47, spicinessLevel: 0,
          imageUrl: 'https://via.placeholder.com/200x200?text=Pocky'
      },
      quantity: 2
    },
  ]);

  // Состояние модального окна регистрации [27]
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);

  // Обработчик добавления в корзину (Бизнес-логика [12])
  const handleAddToCart = (product: IProduct) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
    console.log(`Товар ${product.title} добавлен в корзину`);
  };

  // Высчитываем общее количество товаров для хедера
  const totalItemsInCart = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    // URL-маршрутизация на History API [92]
    <BrowserRouter>
      {/* Layout: Фиксированный Хедер [88, 89] */}
      <Header 
        cartItemsCount={totalItemsInCart} 
        onOpenRegister={() => setIsRegisterModalOpen(true)} 
      />

      {/* Основной контент (формируется динамически) [4, 84] */}
      <main className="container">
        <Routes>
          {/* Главная страница теперь - Каталог [87] */}
          <Route path="/" element={<CatalogPage onAddToCart={handleAddToCart} />} />
          
          {/* Существующие маршруты */}
          <Route path="/cart" element={<CartPage items={cartItems} setItems={setCartItems} />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          
          {/* Редирект со старой главной на новую (Каталог) или обработка 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Окно регистрации (UI Component / Modal) [79] */}
      <RegistrationModal 
        isOpen= {isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </BrowserRouter>
  );
};

export default App;