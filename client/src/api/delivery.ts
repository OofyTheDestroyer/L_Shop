import type { IDeliveryState } from '../types';

export const createDelivery = async (form: IDeliveryState): Promise<void> => {
  const res = await fetch('/api/delivery', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      address: form.address,
      phone: form.phone,
      email: form.email
    })
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.message ?? 'Ошибка оформления заказа');
};