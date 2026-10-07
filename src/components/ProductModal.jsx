import React, { useState } from 'react';
import { X, Star, ShoppingBag, Shield, Truck, Check } from 'lucide-react';

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} id="product-modal-backdrop">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} id="modal-close-btn">
          <X size={20} />
        </button>

        {/* Image Column */}
        <div className="modal-image-col">
          <img src={product.image} alt={product.name} />
        </div>

        {/* Details Column */}
        <div className="modal-info-col">
          <div className="product-category-text">{product.category}</div>
          <h2 className="modal-title">{product.name}</h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Star size={16} className="star-icon" />
            <span style={{ fontWeight: 600 }}>{product.rating}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              ({product.reviewsCount} customer reviews)
            </span>
          </div>

          <div className="modal-price">${(product.price * quantity).toLocaleString()}</div>

          <p className="modal-desc">{product.description}</p>

          {/* Specs Table */}
          {product.specs && (
            <div className="modal-specs">
              <div className="spec-item">
                <span>Material</span>
                <strong>{product.specs.material}</strong>
              </div>
              <div className="spec-item">
                <span>Dimensions</span>
                <strong>{product.specs.dimensions}</strong>
              </div>
              <div className="spec-item">
                <span>Warranty</span>
                <strong>{product.specs.warranty || product.specs.finish}</strong>
              </div>
              <div className="spec-item">
                <span>Delivery</span>
                <strong>White Glove In-Home</strong>
              </div>
            </div>
          )}

          {/* Action Row */}
          <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="quantity-controls" style={{ padding: '0.4rem 0.8rem' }}>
              <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 600 }}>{quantity}</span>
              <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <button
              className="checkout-btn"
              style={{ marginTop: 0, flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              onClick={handleAdd}
              id="modal-add-to-cart-btn"
            >
              {added ? <Check size={18} /> : <ShoppingBag size={18} />}
              {added ? 'Added to Cart!' : `Add to Cart • $${(product.price * quantity).toLocaleString()}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
