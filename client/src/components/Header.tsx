import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  cartItemsCount: number;
  isLoggedIn: boolean;
  onOpenRegister: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, isLoggedIn, onOpenRegister, onLogout }) => {
  return (
    <header className="header">
      <div className="container header__container">
        <Link to="/" className="logo">L_Shop</Link>
        <nav className="nav">
          <ul className="nav__list">
            <li><Link to="/" className="nav__link">Каталог</Link></li>
            <li><Link to="/checkout" className="nav__link">Доставка</Link></li>
            <li>
              {isLoggedIn ? (
                <button className="nav__link btn-link" onClick={onLogout}>Выйти</button>
              ) : (
                <button className="nav__link btn-link" onClick={onOpenRegister}>Войти / Регистрация</button>
              )}
            </li>
            <li>
              <Link to="/cart" className="cart-icon" title="Перейти в корзину">
                🛒
                {cartItemsCount > 0 && <span className="cart-count">{cartItemsCount}</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;