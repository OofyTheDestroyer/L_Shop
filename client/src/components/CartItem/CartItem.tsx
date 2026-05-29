import React from 'react';
import type { ICartItem } from '../../types';

interface CartItemProps {
  item: ICartItem;
  onQuantityChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="cart-item">
      <div style={{ flex: 1, paddingRight: '20px' }}>
        <h3 data-title="basket">{item.product.title}</h3>
        <p style={{ margin: '4px 0', color: '#666', fontSize: '0.9rem' }}>
          {item.product.description}
        </p>
      </div>

      <div style={{ textAlign: 'right', minWidth: '220px' }}>
        <div className="price-block">
          <span data-price="basket">
            {(item.product.price * item.quantity).toFixed(2)}
          </span> BYN
        </div>

        <div className="cart-item__controls">
          <button className="btn btn--secondary"
            onClick={() => onQuantityChange(item.product.id, -1)}>−</button>
          <span style={{ padding: '0 10px', fontWeight: 600 }}>{item.quantity}</span>
          <button className="btn btn--secondary"
            onClick={() => onQuantityChange(item.product.id, 1)}>+</button>
          <button className="btn btn--danger"
            onClick={() => onRemove(item.product.id)}>Удалить</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;