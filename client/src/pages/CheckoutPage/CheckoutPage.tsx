import React, { useState } from 'react';
import type { IDeliveryState } from '../../types';
import { createDelivery } from '../../api/delivery';

interface CheckoutPageProps {
  isLoggedIn: boolean;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ isLoggedIn }) => {
  const [form, setForm] = useState<IDeliveryState>({
    address: '', phone: '', email: '', comment: '', paymentMethod: 'card'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setError('Для оформления заказа нужно войти в аккаунт.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await createDelivery(form);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка оформления');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="checkout-page">
        <h1 className="H1">Заказ оформлен! ✅</h1>
        <p>Мы свяжемся с вами по телефону или email для подтверждения.</p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1 className="H1">Оформление доставки</h1>

      {!isLoggedIn && (
        <p style={{ color: 'var(--color-danger)', marginBottom: '1rem' }}>
          ⚠️ Для оформления заказа необходимо войти в аккаунт.
        </p>
      )}

      <div className="checkout-card">
        <form onSubmit={handleSubmit} data-delivery-form>
          <div className="form-group">
            <label>Email *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required data-delivery-email />
          </div>
          <div className="form-group">
            <label>Телефон *</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} required data-delivery-phone />
          </div>
          <div className="form-group">
            <label>Адрес доставки *</label>
            <input type="text" name="address" value={form.address} onChange={handleChange} required data-delivery-address />
          </div>
          <div className="form-group">
            <label>Комментарий курьеру</label>
            <textarea name="comment" value={form.comment} onChange={handleChange} rows={3} data-delivery-comment />
          </div>
          <div className="form-group">
            <label>Способ оплаты</label>
            <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
              <option value="card">Банковской картой онлайн</option>
              <option value="cash">Наличными при получении</option>
            </select>
          </div>

          {error && <p style={{ color: 'var(--color-danger)', marginBottom: '10px' }}>{error}</p>}

          <button type="submit" className="btn btn--primary"
            style={{ width: '100%', marginTop: '10px', fontSize: '1.1rem' }}
            disabled={loading}>
            {loading ? 'Оформляем...' : 'Подтвердить заказ'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;