// pages/CatalogPage.tsx (Компонент страницы верхнего уровня)
// Источники: [87, 83, 12, 93, 21]
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import type { IProduct } from '../types';

// Mock-данные (так как нет БД) [25]
const MOCK_PRODUCTS: IProduct[] = [
  {
    id: '1',
    title: 'Палочки Pocky (Клубника)',
    description: 'Классический японский бисквит в клубничной глазури.',
    price: 5.50,
    oldPrice: 6.20, // Скидка
    category: 'Снеки',
    inStock: true,
    imageUrl: 'https://via.placeholder.com/200x200?text=Pocky',
    weight: 47,
    spicinessLevel: 0
  },
  {
    id: '2',
    title: 'Моти с манго (Taiwan Dessert)',
    description: 'Тайваньский десерт из рисового теста с начинкой.',
    price: 12.00,
    category: 'Сладости',
    inStock: true,
    imageUrl: 'https://via.placeholder.com/200x200?text=Mochi',
    weight: 120,
    spicinessLevel: 0
  },
  {
    id: '3',
    title: 'Чипсы нори (Острые)',
    description: 'Хрустящие пластинки морской капусты с перцем.',
    price: 3.80,
    category: 'Снеки',
    inStock: true,
    imageUrl: 'https://via.placeholder.com/200x200?text=Nori',
    weight: 5,
    spicinessLevel: 2 // Острый
  },
    {
    id: '4',
    title: 'Рамен Samyang 2x Spicy',
    description: 'Очень острая корейская лапша быстрого приготовления.',
    price: 6.50,
    category: 'Лапша',
    inStock: true,
    imageUrl: 'https://via.placeholder.com/200x200?text=Ramen',
    weight: 140,
    spicinessLevel: 3 // Очень острый
  },
];

interface CatalogPageProps {
  onAddToCart: (product: IProduct) => void;
}

const CatalogPage: React.FC<CatalogPageProps> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const location = useLocation();

  // Имитация загрузки данных и обработки query-параметров [83, 93]
  useEffect(() => {
    // В реальном SPA здесь был бы fetch(`/api/products${location.search}`) [26]
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('search')?.toLowerCase();

    let filteredProducts = MOCK_PRODUCTS;

    if (searchQuery) {
      filteredProducts = MOCK_PRODUCTS.filter(p => 
        p.title.toLowerCase().includes(searchQuery) || 
        p.description.toLowerCase().includes(searchQuery)
      );
    }

    setProducts(filteredProducts);
  }, [location.search]);

  return (
    <div className="catalog-page">
      <h1 className="H1">Каталог азиатских снеков</h1>
      
      {/* Пример панели фильтрации/поиска для демонстрации query-параметров [12, 93] */}
      <div className="catalog-controls" style={{marginBottom: '1rem', display: 'flex', gap: '10px'}}>
          <input type="text" placeholder="Поиск..." className="input" style={{maxWidth: '300px'}} />
          <button className="btn btn--secondary">Найти</button>
      </div>

      <div className="catalog-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart} 
          />
        ))}
      </div>
      
      {products.length === 0 && (
          <p>Товары не найдены.</p>
      )}
    </div>
  );
};

export default CatalogPage;