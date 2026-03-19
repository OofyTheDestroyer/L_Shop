import React, { useState } from 'react';
import { IDeliveryState } from '../../types';

const CheckoutPage: React.FC = () => {
    const [form, setForm] = useState<IDeliveryState>({
        address: '',
        phone: '',
        email: '',
        comment: '',
        paymentMethod: 'card'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Отправка заказа:', form);
        alert('Заказ успешно оформлен!');
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1>Оформление доставки</h1>
            
            <div className="checkout-card">
                {/* Обязательный атрибут на форму для тестировщиков (QA) [cite: 304] */}
                <form onSubmit={handleSubmit} data-delivery-form>
                    
                    <div className="form-group">
                        <label>E-mail *</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required data-delivery-email />
                    </div>

                    <div className="form-group">
                        <label>Номер телефона *</label>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} required data-delivery-phone />
                    </div>

                    <div className="form-group">
                        <label>Адрес (улица, дом, квартира) *</label>
                        <input type="text" name="address" value={form.address} onChange={handleChange} required data-delivery-address />
                    </div>

                    <div className="form-group">
                        <label>Комментарий курьеру</label>
                        <textarea name="comment" value={form.comment} onChange={handleChange} rows={3} data-delivery-comment />
                    </div>

                    <div className="form-group">
                        <label>Способ оплаты</label>
                        <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} data-delivery-payment>
                            <option value="card">Банковской картой онлайн</option>
                            <option value="cash">Наличными при получении</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn--primary" style={{ width: '100%', marginTop: '10px', fontSize: '1.1rem' }}>
                        Подтвердить заказ
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;