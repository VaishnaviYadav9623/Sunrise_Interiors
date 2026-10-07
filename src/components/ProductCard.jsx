import React from 'react';
import { Star, Plus, Eye } from 'lucide-react';

export default function ProductCard({ product, onQuickView, onAddToCart }) {
  return (
    <div className="product-card" id={`product-card-${product.id}`}>
      {/* Thumbnail Container */}
      <div className="product-thumb">
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <img src={product.image} alt={product.name} loading="lazy" />

        {/* Hover Quick View Overlay */}
        <div className="quick-view-overlay">
          <button
            className="quick-view-btn"
            onClick={() => onQuickView(product)}
            id={`quick-view-btn-${product.id}`}
          >
            <Eye size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
            Quick View
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="product-details">
        <div className="product-category-text">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>

        <div className="product-rating">
          <Star size={14} className="star-icon" />
          <span>{product.rating}</span>
          <span>({product.reviewsCount} reviews)</span>
        </div>

        <div className="product-footer">
          <div className="product-price">${product.price.toLocaleString()}</div>
          <button
            className="add-cart-btn"
            onClick={() => onAddToCart(product)}
            title="Add to Cart"
            id={`add-to-cart-${product.id}`}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
