// components/RegistrationModal.tsx (UI/Feature компонент)
// Источники: [79, 80, 70, 23, 40, 98, 58-69]
import React, { useState } from 'react';
import type{ RegisterFormData } from '../types';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  // Локальное состояние формы [27]
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    login: '',
    password: ''
  });
  
  // Состояние ошибок для демонстрации семантической подсветки [40]
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Очищаем ошибку при вводе
    if (errors[name as keyof RegisterFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof RegisterFormData, string>> = {};
    
    // Простая валидация для примера [40]
    if (!formData.email.includes('@')) {
      newErrors.email = 'Некорректный email';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log('Регистрация:', formData);
      // Логика успешной регистрации
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Остановка всплытия клика, чтобы модалка не закрывалась при клике внутри */}
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} title="Закрыть">×</button>
        
        <h2 className="modal-title H1">Регистрация</h2>
        
        {/* data-registration на теге form для QA [98] */}
        <form className="modal-form" onSubmit={handleSubmit} data-registration>
          <div className="input-group">
            <label className="label" htmlFor="reg-name">Имя</label>
            <input 
              type="text" 
              id="reg-name"
              name="name"
              className="input" 
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="label" htmlFor="reg-login">Логин</label>
            <input 
              type="text" 
              id="reg-login"
              name="login"
              className="input" 
              value={formData.login}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="label" htmlFor="reg-email">Email</label>
            <input 
              type="email" 
              id="reg-email"
              name="email"
              /* Семантическая подсветка ошибки [40] */
              className={`input ${errors.email ? 'input--error' : ''}`} 
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label className="label" htmlFor="reg-password">Пароль</label>
            <input 
              type="password" 
              id="reg-password"
              name="password"
              className={`input ${errors.password ? 'input--error' : ''}`} 
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          <button type="submit" className="btn btn--primary modal-form__submit">
            Создать аккаунт
          </button>
        </form>
        
        <div className="modal-form__footer">
          Уже есть аккаунт? <button className="btn-link">Войти</button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;