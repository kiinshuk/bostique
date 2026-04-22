'use client';

export default function Shop({ products, filter, onFilterChange, onAddToCart, onProductClick, isMobile }) {
  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

  const filters = ['All', 'Duffel Bag', 'Carry Bag', 'Backpack', 'Cushion Cover'];
  const filterLabels: Record<string, string> = { 'All': 'All', 'Duffel Bag': 'Duffel', 'Carry Bag': 'Carry', 'Backpack': 'Backpack', 'Cushion Cover': 'Cushion' };

  if (isMobile) {
    return (
      <section style={{ padding: '48px 16px', background: 'var(--color-white)' }}>
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '8px' }}>The Collection</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 300, color: 'var(--color-black)' }}>Shop</h2>
        </div>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '20px' }}>
          {filters.map(f => (
            <button key={f} onClick={() => onFilterChange(f)} style={{ padding: '8px 16px', border: 'none', background: filter === f ? 'var(--color-black)' : 'transparent', color: filter === f ? 'white' : 'var(--color-gray-500)', fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, whiteSpace: 'nowrap', textTransform: 'uppercase', cursor: 'pointer' }}>
              {filterLabels[f]}
            </button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {filteredProducts.map(product => (
            <div key={product.id} onClick={() => onProductClick(product)} style={{ background: 'var(--color-white)', cursor: 'pointer' }}>
              <div style={{ aspectRatio: '1/1.2', background: 'var(--color-gray-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {product.images && product.images[0] ? (
                  <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '2rem' }}>{product.emoji}</span>
                )}
              </div>
              <div style={{ padding: '10px 0' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gray-500)', marginBottom: '4px' }}>{product.category}</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 400, color: 'var(--color-black)', marginBottom: '4px' }}>{product.name}</h3>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-black)' }}>₹{product.price.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="shop" style={{ padding: '100px 48px', background: 'var(--color-white)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px', flexWrap: 'wrap', gap: '24px' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '12px' }}>The Collection</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 300, color: 'var(--color-black)' }}>Shop All</h2>
        </div>
        <div style={{ display: 'flex', gap: '0' }}>
          {filters.map(f => (
            <button key={f} onClick={() => onFilterChange(f)} style={{ padding: '12px 20px', border: 'none', background: 'transparent', color: filter === f ? 'var(--color-black)' : 'var(--color-gray-500)', fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', borderBottom: filter === f ? '2px solid var(--color-gold)' : 'none' }}>
              {filterLabels[f]}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '32px' }}>
        {filteredProducts.map(product => (
          <div key={product.id} onClick={() => onProductClick(product)} style={{ background: 'var(--color-white)', cursor: 'pointer' }}>
            <div style={{ aspectRatio: '4/5', background: 'var(--color-gray-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', marginBottom: '16px' }}>
              {product.images && product.images[0] ? (
                <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} />
              ) : (
                <span style={{ fontSize: '3.5rem', opacity: 0.3 }}>{product.emoji}</span>
              )}
              {product.badge && <span style={{ position: 'absolute', top: '16px', left: '16px', padding: '8px 16px', background: 'var(--color-black)', color: 'var(--color-white)', fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', zIndex: 2 }}>{product.badge}</span>}
            </div>
            <div style={{ padding: '0' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gray-500)', marginBottom: '8px' }}>{product.category}</p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 400, color: 'var(--color-black)', marginBottom: '8px' }}>{product.name}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-black)' }}>₹{product.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}