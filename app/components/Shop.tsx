'use client';

const shopStyles = {
  section: {
    padding: '80px 80px',
    background: 'var(--color-surface)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '48px',
    flexWrap: 'wrap' as const,
    gap: '24px',
  },
  headerLeft: {},
  eyebrow: {
    fontSize: '0.7rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'var(--color-text-muted)',
    marginBottom: '8px',
  },
  h2: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
    fontWeight: 300,
    color: 'var(--color-charcoal)',
  },
  highlight: {
    fontStyle: 'italic',
    color: 'var(--color-cognac)',
  },
  filterRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap' as const,
  },
  filterBtn: {
    padding: '10px 20px',
    border: '1px solid var(--color-border)',
    background: 'transparent',
    color: 'var(--color-text-primary)',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    fontSize: '0.85rem',
    transition: 'all var(--transition-fast)',
  },
  filterBtnActive: {
    background: 'var(--color-gold)',
    color: 'var(--color-white)',
    borderColor: 'var(--color-gold)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '30px',
  },
  card: {
    background: 'var(--color-surface)',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-md)',
    cursor: 'pointer',
    transition: 'transform var(--transition-base), box-shadow var(--transition-base)',
  },
  imageWrap: {
    height: '220px',
    background: 'var(--color-cream-warm)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
  },
  badge: {
    position: 'absolute' as const,
    top: '12px',
    right: '12px',
    padding: '6px 12px',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.05em',
  },
  content: {
    padding: '20px',
  },
  category: {
    fontSize: '0.7rem',
    color: 'var(--color-text-muted)',
    marginBottom: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  name: {
    fontSize: '1.1rem',
    fontWeight: 500,
    marginBottom: '8px',
    color: 'var(--color-charcoal)',
  },
  price: {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'var(--color-cognac)',
    marginBottom: '16px',
  },
  actions: {
    display: 'flex',
    gap: '12px',
  },
  addBtn: {
    flex: 1,
    padding: '12px',
    background: 'var(--color-charcoal)',
    color: 'var(--color-white)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 500,
    transition: 'background var(--transition-fast)',
  },
  viewBtn: {
    padding: '12px 16px',
    background: 'transparent',
    color: 'var(--color-charcoal)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    transition: 'border-color var(--transition-fast)',
  },
  mobileSection: {
    padding: '40px 20px',
    background: 'var(--color-surface)',
  },
  mobileHeader: {
    marginBottom: '20px',
  },
  mobileEyebrow: {
    fontSize: '0.65rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--color-text-muted)',
    marginBottom: '5px',
  },
  mobileH2: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    fontWeight: 300,
  },
  mobileFilters: {
    display: 'flex',
    gap: '8px',
    overflowX: 'auto' as React.CSSProperties['overflowX'],
    paddingBottom: '15px',
    marginBottom: '20px',
    scrollbarWidth: 'none' as React.CSSProperties['scrollbarWidth'],
  },
  mobileFilter: {
    padding: '8px 16px',
    border: '1px solid var(--color-border)',
    background: 'var(--color-surface)',
    color: 'var(--color-text-primary)',
    borderRadius: 'var(--radius-full)',
    cursor: 'pointer',
    fontSize: '0.75rem',
    whiteSpace: 'nowrap' as const,
  },
  mobileGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  mobileCard: {
    background: 'var(--color-surface)',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-md)',
    cursor: 'pointer',
    border: '1px solid var(--color-line)',
  },
  mobileImage: {
    height: '140px',
    background: 'var(--color-cream-warm)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
  },
  mobileBadge: {
    position: 'absolute' as const,
    top: '8px',
    right: '8px',
    padding: '4px 8px',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.6rem',
    fontWeight: 600,
  },
  mobileContent: {
    padding: '12px',
  },
  mobileCategory: {
    fontSize: '0.65rem',
    color: 'var(--color-text-muted)',
    marginBottom: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  mobileName: {
    fontSize: '0.85rem',
    fontWeight: 500,
    marginBottom: '6px',
    color: 'var(--color-charcoal)',
    lineHeight: 1.3,
  },
  mobilePrice: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: 'var(--color-cognac)',
    marginBottom: '10px',
  },
  mobileAddBtn: {
    width: '100%',
    padding: '10px',
    background: 'var(--color-charcoal)',
    color: 'var(--color-white)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontSize: '0.75rem',
    fontWeight: 500,
  },
};

const filterLabels: Record<string, string> = {
  'All': 'All',
  'Duffel Bag': 'Duffel',
  'Carry Bag': 'Carry',
  'Backpack': 'Backpack',
  'Cushion Cover': 'Cushion',
};

const filters = ['All', 'Duffel Bag', 'Carry Bag', 'Backpack', 'Cushion Cover'];

export default function Shop({ products, filter, onFilterChange, onAddToCart, onProductClick, isMobile }) {
  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  if (isMobile) {
    return (
      <section style={shopStyles.mobileSection}>
        <div style={shopStyles.mobileHeader}>
          <p style={shopStyles.mobileEyebrow}>THE COLLECTION</p>
          <h2 style={shopStyles.mobileH2}>
            Shop <em style={shopStyles.highlight}>Bostique</em>
          </h2>
        </div>
        <div style={shopStyles.mobileFilters}>
          {filters.map(f => (
            <button 
              key={f} 
              onClick={() => onFilterChange(f)}
              style={{
                ...shopStyles.mobileFilter,
                ...(filter === f ? shopStyles.filterBtnActive : {}),
              }}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>
        <div style={shopStyles.mobileGrid}>
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              onClick={() => onProductClick(product)}
              style={shopStyles.mobileCard}
            >
              <div style={shopStyles.mobileImage}>
                {product.images && product.images[0] ? (
                  <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '2.5rem' }}>{product.emoji}</span>
                )}
                {product.badge && (
                  <span style={{ 
                    ...shopStyles.mobileBadge,
                    background: product.badge === 'Sale' ? 'var(--color-error)' : 'var(--color-success)',
                  }}>
                    {product.badge}
                  </span>
                )}
              </div>
              <div style={shopStyles.mobileContent}>
                <p style={shopStyles.mobileCategory}>{product.category}</p>
                <h3 style={shopStyles.mobileName}>{product.name}</h3>
                <p style={shopStyles.mobilePrice}>₹{product.price.toLocaleString()}</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                  style={shopStyles.mobileAddBtn}
                >
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="shop" style={shopStyles.section}>
      <div style={shopStyles.header}>
        <div style={shopStyles.headerLeft}>
          <p style={shopStyles.eyebrow}>THE COLLECTION</p>
          <h2 style={shopStyles.h2}>
            Shop All <em style={shopStyles.highlight}>Bostique</em>
          </h2>
        </div>
        <div style={shopStyles.filterRow}>
          {filters.map(f => (
            <button 
              key={f} 
              onClick={() => onFilterChange(f)}
              style={{
                ...shopStyles.filterBtn,
                ...(filter === f ? shopStyles.filterBtnActive : {}),
              }}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>
      </div>
      <div style={shopStyles.grid}>
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            onClick={() => onProductClick(product)}
            style={shopStyles.card}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
          >
            <div style={shopStyles.imageWrap}>
              {product.images && product.images[0] ? (
                <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ fontSize: '5rem' }}>{product.emoji}</span>
              )}
              {product.badge && (
                <span style={{ 
                  ...shopStyles.badge,
                  background: product.badge === 'Sale' ? 'var(--color-error)' : 'var(--color-success)',
                }}>
                  {product.badge}
                </span>
              )}
            </div>
            <div style={shopStyles.content}>
              <p style={shopStyles.category}>{product.category}</p>
              <h3 style={shopStyles.name}>{product.name}</h3>
              <p style={shopStyles.price}>₹{product.price.toLocaleString()}</p>
              <div style={shopStyles.actions}>
                <button 
                  onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                  style={shopStyles.addBtn}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--color-cognac)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--color-charcoal)'}
                >
                  Add to Bag
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onProductClick(product); }}
                  style={shopStyles.viewBtn}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-cognac)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}