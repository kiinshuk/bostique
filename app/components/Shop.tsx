'use client';

const shopStyles = {
  section: {
    padding: '80px 48px',
    background: 'var(--color-white)',
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
    fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
    fontWeight: 400,
    color: 'var(--color-black)',
    letterSpacing: '-0.02em',
  },
  highlight: {
    fontStyle: 'italic',
    color: 'var(--color-gray-700)',
  },
  filterRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap' as const,
  },
  filterBtn: {
    padding: '10px 20px',
    border: '1px solid var(--color-gray-300)',
    background: 'transparent',
    color: 'var(--color-text-primary)',
    borderRadius: '0',
    cursor: 'pointer',
    fontSize: '0.75rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    transition: 'all 0.2s ease',
  },
  filterBtnActive: {
    background: 'var(--color-black)',
    color: 'var(--color-white)',
    borderColor: 'var(--color-black)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '32px',
  },
  card: {
    background: 'var(--color-white)',
    borderRadius: '0',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
  },
  imageWrap: {
    aspectRatio: '4/5',
    background: 'var(--color-gray-50)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
    overflow: 'hidden',
  },
  badge: {
    position: 'absolute' as const,
    top: '12px',
    right: '12px',
    padding: '6px 12px',
    background: 'var(--color-black)',
    color: 'var(--color-white)',
    fontSize: '0.65rem',
    fontWeight: 500,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    borderRadius: '0',
  },
  content: {
    padding: '20px 0',
  },
  category: {
    fontSize: '0.65rem',
    color: 'var(--color-text-muted)',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  name: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.1rem',
    fontWeight: 400,
    marginBottom: '8px',
    color: 'var(--color-black)',
  },
  price: {
    fontSize: '0.95rem',
    fontWeight: 500,
    color: 'var(--color-black)',
  },
  mobileSection: {
    padding: '48px 20px',
    background: 'var(--color-white)',
  },
  mobileHeader: {
    marginBottom: '20px',
  },
  mobileEyebrow: {
    fontSize: '0.65rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--color-text-muted)',
    marginBottom: '4px',
  },
  mobileH2: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    fontWeight: 400,
    color: 'var(--color-black)',
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
    border: '1px solid var(--color-gray-300)',
    background: 'var(--color-white)',
    color: 'var(--color-text-primary)',
    borderRadius: '0',
    cursor: 'pointer',
    fontSize: '0.7rem',
    whiteSpace: 'nowrap' as const,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  mobileGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  mobileCard: {
    background: 'var(--color-white)',
    borderRadius: '0',
    overflow: 'hidden',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  mobileImage: {
    aspectRatio: '1/1.2',
    background: 'var(--color-gray-50)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
    flexShrink: 0,
  },
  mobileBadge: {
    position: 'absolute' as const,
    top: '6px',
    left: '6px',
    padding: '4px 8px',
    background: 'var(--color-black)',
    color: 'var(--color-white)',
    fontSize: '0.5rem',
    fontWeight: 500,
    textTransform: 'uppercase',
    borderRadius: '0',
    zIndex: 2,
  },
  mobileContent: {
    padding: '12px 0',
  },
  mobileCategory: {
    fontSize: '0.55rem',
    color: 'var(--color-text-muted)',
    marginBottom: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  mobileName: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.85rem',
    fontWeight: 400,
    marginBottom: '4px',
    color: 'var(--color-black)',
    lineHeight: 1.3,
  },
  mobilePrice: {
    fontSize: '0.85rem',
    fontWeight: 500,
    color: 'var(--color-black)',
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
          <p style={shopStyles.mobileEyebrow}>The Collection</p>
          <h2 style={shopStyles.mobileH2}>Shop</h2>
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
                  <span style={shopStyles.mobileBadge}>{product.badge}</span>
                )}
              </div>
              <div style={shopStyles.mobileContent}>
                <p style={shopStyles.mobileCategory}>{product.category}</p>
                <h3 style={shopStyles.mobileName}>{product.name}</h3>
                <span style={shopStyles.mobilePrice}>₹{product.price.toLocaleString()}</span>
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
          <p style={shopStyles.eyebrow}>The Collection</p>
          <h2 style={shopStyles.h2}>Shop All</h2>
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
          >
            <div style={shopStyles.imageWrap}>
              {product.images && product.images[0] ? (
                <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ fontSize: '4rem' }}>{product.emoji}</span>
              )}
              {product.badge && <span style={shopStyles.badge}>{product.badge}</span>}
            </div>
            <div style={shopStyles.content}>
              <p style={shopStyles.category}>{product.category}</p>
              <h3 style={shopStyles.name}>{product.name}</h3>
              <p style={shopStyles.price}>₹{product.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}