import React from 'react';
import { CATEGORIES } from '../data/products';
import { SlidersHorizontal } from 'lucide-react';

export default function CategoryFilter({
  activeCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  totalItems
}) {
  return (
    <div className="catalog-header" id="catalog-section">
      <div className="catalog-title">
        <h2>Curated Furniture Catalog</h2>
        <p>Showing {totalItems} handcrafted architectural pieces</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        {/* Category Pill Tabs */}
        <div className="category-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
              id={`cat-tab-${cat.id}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--bg-surface-elevated)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
          <SlidersHorizontal size={15} style={{ color: 'var(--text-muted)' }} />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              fontSize: '0.88rem',
              fontWeight: 500,
              cursor: 'pointer'
            }}
            id="sort-select"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>
    </div>
  );
}
