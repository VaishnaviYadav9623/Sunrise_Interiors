import React from 'react';
import { ArrowRight, Award, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

export default function Hero({ onExploreClick }) {
  return (
    <section className="hero-section">
      <div className="container hero-grid">
        {/* Left Copy */}
        <div className="hero-content">
          <div className="hero-tag">
            <Sparkles size={14} />
            <span>2026 Architectural Collection</span>
          </div>

          <h1 className="hero-title">
            Sculpting Sanctuary for <span className="highlight">Modern Living</span>
          </h1>

          <p className="hero-subtitle">
            Discover handcrafted furniture designed at the intersection of Scandinavian minimalism, organic comfort, and sustainable craftsmanship.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={onExploreClick} id="hero-explore-btn">
              Explore Collection <ArrowRight size={18} />
            </button>
            <button className="btn-secondary" onClick={() => alert("Virtual 3D Room Studio Tour launching soon!")}>
              Virtual Studio
            </button>
          </div>

          <div className="hero-metrics">
            <div className="metric-item">
              <strong>10-Year</strong>
              <span>Frame Warranty</span>
            </div>
            <div className="metric-item">
              <strong>100%</strong>
              <span>FSC Wood</span>
            </div>
            <div className="metric-item">
              <strong>4.95★</strong>
              <span>Architect Rating</span>
            </div>
          </div>
        </div>

        {/* Right Visual Image */}
        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <img
              src={HERO_IMAGE}
              alt="AURA Luxury Living Room interior design showcase"
              loading="eager"
            />
          </div>

          {/* Floating Glassmorphism Badge */}
          <div className="glass-floating-card">
            <div className="floating-icon">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>White Glove Delivery</h4>
              <p style={{ fontSize: '0.78rem', opacity: 0.8 }}>Complimentary room assembly</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
