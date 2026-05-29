// components/ProductCard.tsx (Smart-компонент Feature)
// Источники: [91, 23, 47, 48, 49, 98, 52]
import React from 'react';
import type { IProduct } from '../types';

interface ProductCardProps {
  product: IProduct;
  onAddToCart: (product: IProduct) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  
  // Хелпер для отображения уровня остроты [22]
  const renderSpiciness = (level: number) => {
    if (level === 0) return null;
    return (
      <span className={`product-card__spiciness spiciness--${level}`}>
        {'🌶️'.repeat(level)}
      </span>
    );
  };

  return (
    <div className="product-card">
      <div className="product-card__image-wrapper">
        <img src={product.imageUrl} alt={product.title} className="product-card__image" />
      </div>
      
      {/* data-title для QA [98] */}
      <h3 className="product-card__title" data-title>
        {product.title}
      </h3>
      
      <div className="product-card__meta">
        <span>{product.weight} г</span>
        {renderSpiciness(product.spicinessLevel)}
      </div>

      <p className="product-card__description">{product.description}</p>
      
      <div className="product-card__price-row">
        {product.oldPrice ? (
          <>
            {/* data-price оборачивает текстовый узел с числом [98] */}
            <span className="product-card__price product-card__price--discount">
              <span data-price>{product.price.toFixed(2)}</span> BYN
            </span>
            <span className="product-card__old-price">{product.oldPrice.toFixed(2)} BYN</span>
          </>
        ) : (
          <span className="product-card__price">
            <span data-price>{product.price.toFixed(2)}</span> BYN
          </span>
        )}
      </div>
      
      <button 
        className="btn btn--primary product-card__btn" 
        onClick={() => onAddToCart(product)}
      >
        В корзину
      </button>
    </div>
  );
};

export default ProductCard;