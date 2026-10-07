import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Tag, CheckCircle } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutSuccess
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 1500 || subtotal === 0 ? 0 : 150;
  const discountAmount = subtotal * discount;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const applyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'AURA10') {
      setDiscount(0.10);
      setPromoApplied(true);
    } else {
      alert('Try promo code: AURA10 for 10% off luxury furniture!');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      onCheckoutSuccess();
    }, 1500);
  };

  return (
    <>
      <div className="cart-drawer-backdrop" onClick={onClose} id="cart-drawer-backdrop" />

      <div className="cart-drawer" id="cart-drawer-panel">
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} className="star-icon" />
            <h3>Your Shopping Cart ({cartItems.reduce((a, b) => a + b.quantity, 0)})</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} id="cart-close-btn">
            <X size={18} />
          </button>
        </div>

        {/* Item List */}
        <div className="cart-items-list">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
              <ShoppingBag size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
              <h4>Your Cart is Empty</h4>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Explore our luxury collection and add pieces to your space.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h4 className="cart-item-title">{item.name}</h4>
                  <div className="cart-item-price">${(item.price * item.quantity).toLocaleString()}</div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="quantity-controls">
                      <button className="qty-btn" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, px: '0.4rem' }}>{item.quantity}</span>
                      <button className="qty-btn" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      style={{ color: 'var(--text-muted)', padding: '0.3rem' }}
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            {/* Promo Input */}
            <form onSubmit={applyPromo} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <input
                type="text"
                placeholder="Promo code (e.g. AURA10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={promoApplied}
                style={{
                  flexGrow: 1,
                  padding: '0.5rem 0.9rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-surface)',
                  fontSize: '0.85rem'
                }}
              />
              <button
                type="submit"
                disabled={promoApplied}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  background: promoApplied ? 'var(--clr-accent-emerald)' : 'var(--bg-surface)',
                  color: promoApplied ? '#fff' : 'var(--text-main)',
                  border: '1px solid var(--border-color)',
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}
              >
                {promoApplied ? <CheckCircle size={16} /> : 'Apply'}
              </button>
            </form>

            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>

            {discount > 0 && (
              <div className="cart-summary-row" style={{ color: 'var(--clr-accent-emerald)' }}>
                <span>10% VIP Discount</span>
                <span>-${discountAmount.toLocaleString()}</span>
              </div>
            )}

            <div className="cart-summary-row">
              <span>White Glove Delivery</span>
              <span>{shipping === 0 ? <strong style={{ color: 'var(--clr-accent-emerald)' }}>FREE</strong> : `$${shipping}`}</span>
            </div>

            <div className="cart-summary-row total">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={isCheckingOut}
              id="cart-checkout-btn"
            >
              {isCheckingOut ? 'Processing Order...' : 'Proceed to Checkout'}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
