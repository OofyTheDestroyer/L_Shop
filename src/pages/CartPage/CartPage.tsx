import React from 'react';
import type { ICartItem } from '../../types'; // Путь к вашим интерфейсам [cite: 23]

interface CartPageProps {
  items: ICartItem[];
  setItems: React.Dispatch<React.SetStateAction<ICartItem[]>>;
}

const CartPage: React.FC<CartPageProps> = ({ items, setItems }) => {
  
  // Логика изменения количества [cite: 12, 29]
  const updateQuantity = (id: string, delta: number) => {
    setItems(prev => prev.map(item => 
      item.product.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) } 
        : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.product.id !== id));
  };

  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1 className="H1">Корзина покупок</h1>
      
      {items.length === 0 ? (
        <p>Ваша корзина пуста</p>
      ) : (
        <div className="cart-list">
          {items.map(item => (
            <div key={item.product.id} className="cart-item" style={{ borderBottom: '1px solid var(--color-border)', padding: '15px 0', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                {/* ОБЯЗАТЕЛЬНО: data-title="basket" для QA  */}
                <h3 data-title="basket" className="cart-item__title">{item.product.title}</h3>
                
                {/* ОБЯЗАТЕЛЬНО: data-price="basket" для QA  */}
                <p>Цена: <span data-price="basket">{item.product.price.toFixed(2)}</span> BYN</p>
              </div>

              <div className="cart-item__controls" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button className="btn btn--secondary" onClick={() => updateQuantity(item.product.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button className="btn btn--secondary" onClick={() => updateQuantity(item.product.id, 1)}>+</button>
                <button className="btn" style={{ color: 'var(--color-danger)' }} onClick={() => removeItem(item.product.id)}>Удалить</button>
              </div>
            </div>
          ))}
          
          <div className="cart-total" style={{ marginTop: '20px', textAlign: 'right' }}>
            <h2>Итого: {totalPrice.toFixed(2)} BYN</h2>
            <button className="btn btn--primary">Перейти к оформлению</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;