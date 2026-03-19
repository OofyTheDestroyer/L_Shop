import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ICartItem } from '../../types';
import CartItem from '../../components/CartItem/CartItem';

interface Props {
    items: ICartItem[];
    setItems: React.Dispatch<React.SetStateAction<ICartItem[]>>;
}

const CartPage: React.FC<Props> = ({ items, setItems }) => {
    const navigate = useNavigate();
    const total = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

    const handleRemove = (id: string) => {
        setItems(prev => prev.filter(item => item.product.id !== id));
    };

    return (
        <div>
            <h1>Корзина</h1>
            {items.length === 0 ? (
                <p>Ваша корзина пуста.</p>
            ) : (
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                        {items.map(item => (
                            <CartItem key={item.product.id} item={item} onRemove={handleRemove} />
                        ))}
                    </div>
                    
                    <div style={{ width: '300px', background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #E0E0E0' }}>
                        <h2>Итого:</h2>
                        <h3 style={{ fontSize: '1.5rem', color: '#FF6900' }}>{total.toFixed(2)} руб.</h3>
                        <button 
                            className="btn btn-primary" 
                            style={{ width: '100%', marginTop: '15px' }}
                            onClick={() => navigate('/checkout')}
                        >
                            К оформлению
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;