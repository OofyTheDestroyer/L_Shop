import React, { useState } from 'react';
import type { IDeliveryState } from '../../types';

const CheckoutPage: React.FC = () => {
  const [form, setForm] = useState<IDeliveryState>({
    address: '',
    phone: '',
    email: '',
    comment: '',
    paymentMethod: 'card'
  });

  // Один обработчик для всех полей (из second-front, чище чем спред на каждое поле)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Данные доставки:', form);
    alert('Заказ успешно оформлен!');
  };

  return (
    <div className="checkout-page">
      <h1 className="H1">Оформление доставки</h1>

      <div className="checkout-card">
        <form onSubmit={handleSubmit} data-delivery-form>

          <div className="form-group">
            <label className="label">Email *</label>
            <input type="email" name="email" className="input"
              value={form.email} onChange={handleChange}
              required data-delivery-email />
          </div>

          <div className="form-group">
            <label className="label">Номер телефона *</label>
            <input type="tel" name="phone" className="input"
              value={form.phone} onChange={handleChange}
              required data-delivery-phone />
          </div>

          <div className="form-group">
            <label className="label">Адрес доставки *</label>
            <input type="text" name="address" className="input"
              value={form.address} onChange={handleChange}
              required data-delivery-address />
          </div>

          <div className="form-group">
            <label className="label">Комментарий курьеру</label>
            <textarea name="comment" className="input"
              value={form.comment} onChange={handleChange}
              rows={3} data-delivery-comment />
          </div>

          <div className="form-group">
            <label className="label">Способ оплаты</label>
            <select name="paymentMethod" className="input"
              value={form.paymentMethod} onChange={handleChange}
              data-delivery-payment>
              <option value="card">Банковской картой онлайн</option>
              <option value="cash">Наличными при получении</option>
            </select>
          </div>

          <button type="submit" className="btn btn--primary"
            style={{ marginTop: '10px', width: '100%', fontSize: '1.1rem' }}>
            Подтвердить заказ
          </button>

        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;