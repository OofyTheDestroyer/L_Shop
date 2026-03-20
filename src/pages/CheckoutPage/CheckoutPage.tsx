import React, { useState } from 'react';
import type{ IDeliveryState } from '../../types'; // Импорт интерфейса из методички [cite: 23]

const CheckoutPage: React.FC = () => {
  // Состояние формы согласно интерфейсу IDeliveryState [cite: 23, 27]
  const [form, setForm] = useState<IDeliveryState>({
    address: '',
    phone: '',
    email: '',
    paymentMethod: 'card'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Данные доставки отправлены:', form);
    alert('Заказ успешно оформлен!');
  };

  return (
    <div className="checkout-page">
      <h1 className="H1">Оформление доставки</h1>
      
      {/* ОБЯЗАТЕЛЬНО: data-delivery для формы согласно методичке [cite: 98] */}
      <form className="checkout-form" onSubmit={handleSubmit} data-delivery="order">
        
        <div className="input-group">
          <label className="label">Адрес доставки</label>
          <input 
            type="text" 
            className="input"
            /* ОБЯЗАТЕЛЬНО: вариация data-delivery-* [cite: 98] */
            data-delivery-address
            value={form.address}
            onChange={(e) => setForm({...form, address: e.target.value})}
            required 
          />
        </div>

        <div className="input-group">
          <label className="label">Телефон</label>
          <input 
            type="tel" 
            className="input"
            data-delivery-phone
            value={form.phone}
            onChange={(e) => setForm({...form, phone: e.target.value})}
            required 
          />
        </div>

        <div className="input-group">
          <label className="label">Email</label>
          <input 
            type="email" 
            className="input"
            data-delivery-email
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            required 
          />
        </div>

        <div className="input-group">
          <label className="label">Способ оплаты</label>
          <select 
            className="input"
            value={form.paymentMethod}
            onChange={(e) => setForm({...form, paymentMethod: e.target.value as 'card' | 'cash'})}
          >
            <option value="card">Картой онлайн</option>
            <option value="cash">Наличными курьеру</option>
          </select>
        </div>

        {/* Кнопка в стиле Primary из дизайн-системы [cite: 38, 60] */}
        <button type="submit" className="btn btn--primary" style={{ marginTop: '20px', width: '100%' }}>
          Подтвердить заказ
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;