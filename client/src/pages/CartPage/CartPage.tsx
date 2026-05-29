import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { ICartItem } from '../../types';
import CartItem from '../../components/CartItem/CartItem';

interface CartPageProps {
  items: ICartItem[];
  setItems: React.Dispatch<React.SetStateAction<ICartItem[]>>;
}

const CartPage: React.FC<CartPageProps> = ({ items, setItems }) => {
  const navigate = useNavigate();

  const handleQuantityChange = (id: string, delta: number) => {
    setItems(prev => prev.map(item =>
      item.product.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const handleRemove = (id: string) => {
    setItems(prev => prev.filter(item => item.product.id !== id));
  };

  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1 className="H1">Корзина покупок</h1>

      {items.length === 0 ? (
        <p>Ваша корзина пуста.</p>
      ) : (
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>

          {/* Список товаров */}
          <div style={{ flex: 1 }}>
            {items.map(item => (
              <CartItem
                key={item.product.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
              />
            ))}
          </div>

          {/* Боковая панель итого */}
          <div style={{
            width: '280px', background: 'var(--color-bg-white)',
            padding: '20px', borderRadius: '8px',
            border: '1px solid var(--color-border)',
            position: 'sticky', top: '80px'
          }}>
            <h2>Итого</h2>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', margin: '10px 0 20px' }}>
              {totalPrice.toFixed(2)} BYN
            </h3>
            <button
              className="btn btn--primary"
              style={{ width: '100%' }}
              onClick={() => navigate('/checkout')}
            >
              К оформлению →
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default CartPage;