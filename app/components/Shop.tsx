'use client';

const shopStyles = {
  section: {
    padding: '100px 48px',
    background: 'var(--color-white)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '48px',
    flexWrap: 'wrap',
    gap: '24px',
  },
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
    fontSize: 'clamp(2rem, 4vw, 2.5rem)',
    fontWeight: 300,
    color: 'var(--color-black)',
  },
  filterRow: {
    display: 'flex',
    gap: '0',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: '12px 20px',
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '32px',
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
    position: 'relative',
    overflow: 'hidden',
    marginBottom: '16px',
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s ease',
  },
  badge: {
    position: 'absolute',
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
    fontSize: '1.2rem',
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
    padding: '48px 16px',
    background: 'var(--color-white)',
  },
  mobileHeader: {
    marginBottom: '20px',
    textAlign: 'center',
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
    fontSize: '1.5rem',
    fontWeight: 300,
    color: 'var(--color-black)',
  },
  mobileFilters: {
    display: 'flex',
    gap: '0',
    overflowX: 'auto',
    paddingBottom: '16px',
    marginBottom: '20px',
  },
  mobileFilter: {
    padding: '8px 16px',
    border: 'none',
    background: 'transparent',
    color: 'var(--color-gray-500)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    textTransform: 'uppercase',
  },
  mobileGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  mobileCard: {
    background: 'var(--color-white)',
    cursor: 'pointer',
  },
  mobileImage: {
    aspectRatio: '1/1.2',
    background: 'var(--color-gray-50)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flexShrink: 0,
  },
  mobileContent: {
    padding: '10px 0',
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
    fontSize: '0.85rem',
    fontWeight: 400,
    color: 'var(--color-black)',
    marginBottom: '4px',
  },
  mobilePrice: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
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
  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

  if (isMobile) {
    return (
      <section style={shopStyles.mobileSection}>
        <div style={shopStyles.mobileHeader}>
          <p style={shopStyles.mobileEyebrow}>The Collection</p>
          <h2 style={shopStyles.mobileH2}>Shop</h2>
        </div>
        <div style={shopStyles.mobileFilters}>
          {filters.map(f => (
            <button key={f} onClick={() => onFilterChange(f)} style={{ ...shopStyles.mobileFilter, ...(filter === f ? shopStyles.filterBtnActive : {}) }}>
              {filterLabels[f]}
            </button>
          ))}
        </div>
        <div style={shopStyles.mobileGrid}>
          {filteredProducts.map(product => (
            <div key={product.id} onClick={() => onProductClick(product)} style={shopStyles.mobileCard}>
              <div style={shopStyles.mobileImage}>
                {product.images && product.images[0] ? (
                  <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '2rem' }}>{product.emoji}</span>
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
        <div>
          <p style={shopStyles.eyebrow}>The Collection</p>
          <h2 style={shopStyles.h2}>Shop All</h2>
        </div>
        <div style={shopStyles.filterRow}>
          {filters.map(f => (
            <button key={f} onClick={() => onFilterChange(f)} style={{ ...shopStyles.filterBtn, ...(filter === f ? shopStyles.filterBtnActive : {}) }}>
              {filterLabels[f]}
            </button>
          ))}
        </div>
      </div>
      <div style={shopStyles.grid}>
        {filteredProducts.map(product => (
          <div key={product.id} onClick={() => onProductClick(product)} style={shopStyles.card}>
            <div style={shopStyles.imageWrap}>
              {product.images && product.images[0] ? (
                <img src={product.images[0]} alt={product.name} style={{ ...shopStyles.productImage }} />
              ) : (
                <span style={{ fontSize: '3.5rem', opacity: 0.3 }}>{product.emoji}</span>
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