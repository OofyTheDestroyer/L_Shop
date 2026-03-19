import React from 'react';
import { ICartItem } from '../../types';

interface Props {
    item: ICartItem;
    onRemove: (id: string) => void;
}

const CartItem: React.FC<Props> = ({ item, onRemove }) => {
    return (
        <div className="cart-item">
            <div style={{ flex: 1, paddingRight: '20px' }}>
                {/* Обязательный атрибут data-title [cite: 304] */}
                <h3 data-title="basket">{item.product.title}</h3>
                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{item.product.description}</p>
                <p style={{ marginTop: '8px', fontWeight: 600 }}>Количество: {item.quantity} шт.</p>
            </div>
            
            <div style={{ textAlign: 'right', minWidth: '150px' }}>
                {/* Обязательный атрибут data-price [cite: 304] */}
                <div className="price-block">
                    <span data-price="basket">{item.product.price}</span> руб.
                </div>
                <button className="btn btn--danger" onClick={() => onRemove(item.product.id)}>
                    Удалить
                </button>
            </div>
        </div>
    );
};

export default CartItem;