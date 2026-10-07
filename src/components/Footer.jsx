import React, { useState } from 'react';
import { SunMedium, ArrowRight, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div>
            <a href="#home" className="brand-logo" style={{ color: '#fff', marginBottom: '1.25rem' }}>
              <div className="brand-icon">
                <SunMedium size={22} />
              </div>
              <div className="brand-text">
                <span className="brand-title" style={{ color: '#fff' }}>SUNRISE</span>
                <span className="brand-subtitle">INTERIOR STUDIO</span>
              </div>
            </a>
            <p style={{ maxWidth: '320px', lineHeight: 1.7 }}>
              Crafting architectural sanctuary through bespoke interior concepts, luxury styling, and sustainable craftsmanship.
            </p>
          </div>

          {/* Catalog Col */}
          <div className="footer-col">
            <h4>Catalog</h4>
            <ul className="footer-links">
              <li><a href="#">Living Collection</a></li>
              <li><a href="#">Solid Oak Dining</a></li>
              <li><a href="#">Architectural Lighting</a></li>
              <li><a href="#">Artisan Decor</a></li>
              <li><a href="#">Custom Modular Sofas</a></li>
            </ul>
          </div>

          {/* Studio Col */}
          <div className="footer-col">
            <h4>Atelier & Studio</h4>
            <ul className="footer-links">
              <li><a href="#">Our Craftsmanship</a></li>
              <li><a href="#">Sustainability Promise</a></li>
              <li><a href="#">White Glove Service</a></li>
              <li><a href="#">Trade & Architects</a></li>
              <li><a href="#">Flagship Locations</a></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="footer-col">
            <h4>Join The Circle</h4>
            <p>Receive exclusive architectural releases and private studio invitations.</p>
            
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  padding: '0.65rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  fontSize: '0.88rem',
                  width: '100%'
                }}
              />
              <button
                type="submit"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--clr-accent-terracotta)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {subscribed ? <Check size={18} /> : <ArrowRight size={18} />}
              </button>
            </form>
            {subscribed && (
              <span style={{ fontSize: '0.8rem', color: 'var(--clr-accent-emerald)', marginTop: '0.5rem', display: 'block' }}>
                Welcome to AURA Atelier Circle.
              </span>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 AURA Atelier & Living. All Rights Reserved.</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Craft</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Sustainability Report</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
