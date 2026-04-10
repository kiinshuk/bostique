'use client';

export default function Shop({ products, filter, onFilterChange, onAddToCart, onProductClick }) {
  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <section id="shop" style={{ padding: '80px 5%', background: '#FAFAF8' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B6560', marginBottom: '8px' }}>The Collection</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 300 }}>
            Shop All <em style={{ fontStyle: 'italic', color: '#B05C2A' }}>Bostique</em>
          </h2>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['All', 'Duffel Bag', 'Carry Bag', 'Backpack', 'Cushion Cover'].map(f => (
            <button 
              key={f} 
              onClick={() => onFilterChange(f)}
              style={{ 
                padding: '10px 20px', 
                border: filter === f ? '1px solid #C8A97A' : '1px solid #ddd',
                background: filter === f ? '#C8A97A' : 'transparent',
                color: filter === f ? 'white' : '#333',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                transition: 'all 0.2s'
              }}
            >
              {f === 'All' ? 'All' : 
               f === 'Duffel Bag' ? 'Duffel' : 
               f === 'Carry Bag' ? 'Carry' : 
               f === 'Cushion Cover' ? 'Cushion' : f}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            onClick={() => onProductClick(product)}
            style={{ 
              background: 'white', 
              borderRadius: '12px', 
              overflow: 'hidden',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)'; }}
          >
            <div style={{ height: '220px', background: '#F4F1EC', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              {product.image ? (
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ fontSize: '5rem' }}>{product.emoji}</span>
              )}
              {product.badge && (
                <span style={{ 
                  position: 'absolute', top: '12px', right: '12px', 
                  background: product.badge === 'Sale' ? '#C0392B' : '#27AE60',
                  color: 'white', padding: '6px 12px', borderRadius: '4px',
                  fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.05em'
                }}>
                  {product.badge}
                </span>
              )}
            </div>
            <div style={{ padding: '20px' }}>
              <p style={{ fontSize: '0.7rem', color: '#6B6560', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{product.category}</p>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '8px', color: '#1C1C1A' }}>{product.name}</h3>
              <p style={{ fontSize: '1rem', fontWeight: 600, color: '#B05C2A', marginBottom: '12px' }}>₹{product.price.toLocaleString()}</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                  style={{ 
                    flex: 1, padding: '12px', background: '#0D0D0B', color: 'white', 
                    border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem'
                  }}
                >
                  Add to Bag
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onProductClick(product); }}
                  style={{ 
                    padding: '12px 16px', background: 'transparent', color: '#0D0D0B',
                    border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer'
                  }}
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