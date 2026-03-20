// components/Header.tsx (Компонент макета)
// Источники: [88, 89, 38]
import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  cartItemsCount: number;
  onOpenRegister: () => void; // Функция для открытия модалки
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onOpenRegister }) => {
  return (
    <header className="header">
      <div className="container header__container">
        <Link to="/" className="logo">L_Shop</Link>
        
        <nav className="nav">
          <ul className="nav__list">
            <li><Link to="/" className="nav__link">Каталог</Link></li>
            <li><Link to="/checkout" className="nav__link">Доставка</Link></li>
            <li>
              <button className="nav__link btn-link" onClick={onOpenRegister}>
                Регистрация
              </button>
            </li>
            <li>
              <Link to="/cart" className="cart-icon" title="Перейти в корзину">
                {/* Иконка корзины (простой текст для примера) [38] */}
                🛒
                {cartItemsCount > 0 && (
                  <span className="cart-count">{cartItemsCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;