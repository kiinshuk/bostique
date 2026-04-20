'use client';

const shopStyles = {
  section: {
    padding: '120px 48px',
    background: 'var(--color-white)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '64px',
    flexWrap: 'wrap' as const,
    gap: '24px',
  },
  headerLeft: {},
  eyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    fontWeight: 500,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '12px',
  },
  h2: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 300,
    color: 'var(--color-black)',
    letterSpacing: '-0.02em',
  },
  filterRow: {
    display: 'flex',
    gap: '0',
    flexWrap: 'wrap' as const,
  },
  filterBtn: {
    padding: '12px 24px',
    border: 'none',
    background: 'transparent',
    color: 'var(--color-gray-500)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  filterBtnActive: {
    color: 'var(--color-black)',
    borderBottom: '2px solid var(--color-gold)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '40px',
  },
  card: {
    background: 'var(--color-white)',
    cursor: 'pointer',
    transition: 'transform 0.4s ease',
  },
  imageWrap: {
    aspectRatio: '4/5',
    background: 'var(--color-gray-50)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
    overflow: 'hidden',
    marginBottom: '20px',
  },
  badge: {
    position: 'absolute' as const,
    top: '16px',
    left: '16px',
    padding: '8px 16px',
    background: 'var(--color-black)',
    color: 'var(--color-white)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.6rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    zIndex: 2,
  },
  content: {
    padding: '0',
  },
  category: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    fontWeight: 500,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'var(--color-gray-500)',
    marginBottom: '8px',
  },
  name: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.25rem',
    fontWeight: 400,
    color: 'var(--color-black)',
    marginBottom: '8px',
  },
  price: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    fontWeight: 500,
    color: 'var(--color-black)',
  },
  mobileSection: {
    padding: '60px 20px',
    background: 'var(--color-white)',
  },
  mobileHeader: {
    marginBottom: '24px',
    textAlign: 'center' as const,
  },
  mobileEyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.6rem',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '8px',
  },
  mobileH2: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.75rem',
    fontWeight: 300,
    color: 'var(--color-black)',
  },
  mobileFilters: {
    display: 'flex',
    gap: '0',
    overflowX: 'auto' as React.CSSProperties['overflowX'],
    paddingBottom: '20px',
    marginBottom: '24px',
    scrollbarWidth: 'none' as React.CSSProperties['scrollbarWidth'],
  },
  mobileFilter: {
    padding: '10px 18px',
    border: 'none',
    background: 'transparent',
    color: 'var(--color-gray-500)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    fontWeight: 500,
    whiteSpace: 'nowrap' as const,
    textTransform: 'uppercase',
  },
  mobileGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  mobileCard: {
    background: 'var(--color-white)',
    cursor: 'pointer',
  },
  mobileImage: {
    aspectRatio: '3/4',
    background: 'var(--color-gray-50)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
    flexShrink: 0,
  },
  mobileContent: {
    padding: '12px 0',
  },
  mobileCategory: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.55rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--color-gray-500)',
    marginBottom: '4px',
  },
  mobileName: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.9rem',
    fontWeight: 400,
    color: 'var(--color-black)',
    marginBottom: '4px',
  },
  mobilePrice: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
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
                  <span style={shopStyles.badge}>{product.badge}</span>
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
                <span style={{ fontSize: '4rem', opacity: 0.3 }}>{product.emoji}</span>
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