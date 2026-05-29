import type { IProduct } from '../types';

// Тип как данные приходят с сервера
interface BackendProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  isAvailable: boolean;
  categories: string[];
  images: { preview: string; gallery?: string[] };
  discount?: number;
  weight?: number;
  spicinessLevel?: number;
}

// Адаптер: серверный формат → формат фронтенда
const toIProduct = (p: BackendProduct): IProduct => ({
  id: p.id,
  title: p.title,
  description: p.description,
  price: p.discount
    ? +(p.price * (1 - p.discount / 100)).toFixed(2)
    : p.price,
  oldPrice: p.discount ? p.price : undefined,
  category: p.categories[0] ?? '',
  inStock: p.isAvailable,
  imageUrl: p.images?.preview,
  weight: p.weight ?? 0,
  spicinessLevel: p.spicinessLevel ?? 0,
});

export const fetchProducts = async (search?: string, category?: string): Promise<IProduct[]> => {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (category) params.set('category', category);

  const url = `/api/products${params.toString() ? '?' + params : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Ошибка загрузки товаров');
  const data: BackendProduct[] = await res.json();
  return data.map(toIProduct);
};