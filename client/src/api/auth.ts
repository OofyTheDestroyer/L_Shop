import type { RegisterFormData } from '../types';

export const register = async (data: RegisterFormData & { phone?: string }): Promise<void> => {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data)
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.message ?? 'Ошибка регистрации');
};

export const loginUser = async (login: string, password: string): Promise<void> => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ login, password })
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.message ?? 'Неверный логин или пароль');
};

export const logoutUser = async (): Promise<void> => {
  await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include'
  });
};