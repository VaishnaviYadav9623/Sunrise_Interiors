import React, { useState } from 'react';
import { ShoppingBag, Sun, Moon, Search, SunMedium, Menu, X, ArrowRight } from 'lucide-react';

/**
 * Navbar Component for Sunrise Interior Studio
 * 
 * Includes:
 * - Brand logo & name
 * - Navigation links (Home, About Us, Services, Products, Gallery, Projects, Blog, Contact)
 * - "Get a Quote" call-to-action button
 * - Live Search, Dark/Light Theme toggle, and Shopping Cart drawer trigger
 * - Mobile responsive navigation menu (Hamburger)
 */
export default function Navbar({
  cartCount = 0,
  onOpenCart,
  theme = 'light',
  onToggleTheme,
  searchQuery = '',
  onSearchChange,
  onGetQuote
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  // Navigation menu items requested by user
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Products', href: '#products' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (linkName, href) => {
    setActiveLink(linkName);
    setIsMobileMenuOpen(false);
    
    // Smooth scroll to section if present
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleQuoteClick = () => {
    setIsMobileMenuOpen(false);
    if (onGetQuote) {
      onGetQuote();
    } else {
      alert('🌟 Thank you for contacting Sunrise Interior Studio! Requesting your free design consultation & quote.');
    }
  };

  return (
    <header className="navbar-sticky">
      <div className="container navbar-content">
        {/* Sunrise Interior Studio Branding */}
        <a href="#home" className="brand-logo" onClick={() => handleNavClick('Home', '#home')}>
          <div className="brand-icon">
            <SunMedium size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-title">SUNRISE</span>
            <span className="brand-subtitle">INTERIOR STUDIO</span>
          </div>
        </a>

        {/* Navigation Menu (Links & Mobile Menu) */}
        <nav className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links-list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`nav-link ${activeLink === link.name ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.name, link.href);
                  }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile View CTA Button */}
          <div className="mobile-quote-container">
            <button className="btn-quote" onClick={handleQuoteClick}>
              Get a Quote <ArrowRight size={16} />
            </button>
          </div>
        </nav>

        {/* Header Action Tools */}
        <div className="nav-actions">
          {/* Live Search Input */}
          {onSearchChange !== undefined && (
            <div className="nav-search">
              <Search className="search-icon" size={16} />
              <input
                type="text"
                placeholder="Search studio products & designs..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                id="nav-search-input"
              />
            </div>
          )}

          {/* Desktop "Get a Quote" Button */}
          <button
            className="btn-quote desktop-quote"
            onClick={handleQuoteClick}
            id="get-quote-btn"
          >
            Get a Quote
          </button>

          {/* Theme Toggle (Light/Dark) */}
          {onToggleTheme && (
            <button
              className="icon-btn"
              onClick={onToggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              id="theme-toggle-btn"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}

          {/* Cart Drawer Trigger */}
          {onOpenCart && (
            <button
              className="icon-btn"
              onClick={onOpenCart}
              title="View Shopping Cart"
              id="cart-drawer-trigger"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="badge-counter">{cartCount}</span>}
            </button>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            className="icon-btn mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            id="mobile-menu-btn"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}

