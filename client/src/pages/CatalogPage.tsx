import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import type { IProduct } from '../types';
import { fetchProducts } from '../api/products';

interface CatalogPageProps {
  onAddToCart: (product: IProduct) => void;
}

const CatalogPage: React.FC<CatalogPageProps> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const q = new URLSearchParams(location.search).get('search') ?? '';
    setSearch(q);
    load(q);
  }, [location.search]);

  const load = async (q?: string) => {
    setLoading(true);
    setError(null);
    try {
      setProducts(await fetchProducts(q));
    } catch {
      setError('Не удалось загрузить товары. Убедись, что бэкенд запущен.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    navigate(search ? `/?search=${encodeURIComponent(search)}` : '/');
  };

  return (
    <div className="catalog-page">
      <h1 className="H1">Каталог азиатских снеков</h1>

      <div className="catalog-controls" style={{ marginBottom: '1rem', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Поиск..."
          className="input"
          style={{ maxWidth: '300px' }}
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <button className="btn btn--secondary" onClick={handleSearch}>Найти</button>
      </div>

      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: 'var(--color-danger)' }}>{error}</p>}

      {!loading && !error && (
        <div className="catalog-grid">
          {products.map(p => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
          ))}
          {products.length === 0 && <p>Товары не найдены.</p>}
        </div>
      )}
    </div>
  );
};

export default CatalogPage;