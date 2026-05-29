import React, { useState } from 'react';
import type { RegisterFormData } from '../types';
import { register, loginUser } from '../api/auth';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;  // вызывается после успешного входа/регистрации
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [tab, setTab] = useState<'register' | 'login'>('register');
  const [formData, setFormData] = useState<RegisterFormData>({ name: '', email: '', login: '', password: '' });
  const [loginData, setLoginData] = useState({ login: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await register(formData);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await loginUser(loginData.login, loginData.password);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        {/* Вкладки */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            className={`btn ${tab === 'register' ? 'btn--primary' : 'btn--secondary'}`}
            style={{ flex: 1 }}
            onClick={() => { setTab('register'); setError(null); }}
          >Регистрация</button>
          <button
            className={`btn ${tab === 'login' ? 'btn--primary' : 'btn--secondary'}`}
            style={{ flex: 1 }}
            onClick={() => { setTab('login'); setError(null); }}
          >Войти</button>
        </div>

        {error && <p style={{ color: 'var(--color-danger)', marginBottom: '10px' }}>{error}</p>}

        {tab === 'register' ? (
          <form onSubmit={handleRegister} data-registration>
            <div className="input-group">
              <label className="label">Имя</label>
              <input type="text" name="name" className="input" value={formData.name} onChange={handleInput} required />
            </div>
            <div className="input-group">
              <label className="label">Логин</label>
              <input type="text" name="login" className="input" value={formData.login} onChange={handleInput} required />
            </div>
            <div className="input-group">
              <label className="label">Email</label>
              <input type="email" name="email" className="input" value={formData.email} onChange={handleInput} required />
            </div>
            <div className="input-group">
              <label className="label">Пароль</label>
              <input type="password" name="password" className="input" value={formData.password} onChange={handleInput} required />
            </div>
            <button type="submit" className="btn btn--primary modal-form__submit" disabled={loading}>
              {loading ? 'Загрузка...' : 'Создать аккаунт'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label className="label">Логин</label>
              <input type="text" name="login" className="input" value={loginData.login} onChange={handleLoginInput} required />
            </div>
            <div className="input-group">
              <label className="label">Пароль</label>
              <input type="password" name="password" className="input" value={loginData.password} onChange={handleLoginInput} required />
            </div>
            <button type="submit" className="btn btn--primary modal-form__submit" disabled={loading}>
              {loading ? 'Загрузка...' : 'Войти'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;