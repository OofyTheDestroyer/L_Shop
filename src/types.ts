/**
 * src/types.ts
 * Полный перечень интерфейсов проекта L_Shop
 */

// 1. Интерфейс пользователя (Базовый)
export interface IUser {
  id: string;
  name: string;
  email: string;
  login: string;
  phone?: string;
}

// 2. Тип для данных формы регистрации (ОШИБКА БЫЛА ТУТ)
// Используем Pick, чтобы взять нужные поля из IUser и добавить поле password
export type RegisterFormData = Pick<IUser, 'name' | 'email' | 'login'> & { 
  password: string; 
};

// 3. Интерфейс товара (Специфика азиатских снеков)
export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string;
  inStock: boolean;
  weight: number;      // Вес в граммах
  spicinessLevel: number; // Уровень остроты (0-3)
  imageUrl?: string;
}

// 4. Интерфейс товара в корзине
export interface ICartItem {
  product: IProduct;
  quantity: number;
}

// 5. Интерфейс для формы оформления заказа
export interface IDeliveryState {
  address: string;
  phone: string;
  email: string;
  comment?: string;
  paymentMethod: 'card' | 'cash';
}

// 6. Полный объект заказа (для отправки на сервер)
export interface IOrder {
  id?: string;
  userId: string;
  items: ICartItem[];
  delivery: IDeliveryState;
  totalPrice: number;
  createdAt: string;
}