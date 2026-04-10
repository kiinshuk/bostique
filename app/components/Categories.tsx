'use client';

export default function Categories({ categories, onCategoryClick, isMobile }) {
  if (isMobile) {
    return (
      <section style={{ padding: '40px 20px', background: '#FAFAF8' }}>
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#6B6560', marginBottom: '5px' }}>Browse</p>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 300 }}>Collections</h2>
        </div>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
          {categories.map(cat => (
            <div 
              key={cat.id} 
              onClick={() => onCategoryClick(cat.name)}
              style={{ 
                minWidth: '140px', padding: '15px', background: 'white', borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center', cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{cat.icon}</div>
              <div style={{ fontWeight: 500, fontSize: '0.85rem' }}>{cat.name}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="categories">
      <div className="section-head">
        <div>
          <p className="eyebrow">Browse</p>
          <h2 style={{fontFamily:'var(--f-display)',fontSize:'clamp(2rem,3.5vw,3rem)',fontWeight:300}}>All Collections</h2>
        </div>
        <a href="#shop" style={{fontSize:'.65rem',letterSpacing:'.2em',textTransform:'uppercase',fontWeight:500,color:'var(--stone)',borderBottom:'1px solid var(--line)',paddingBottom:4}}>View All →</a>
      </div>
      <div className="cats-grid">
        {categories.map(cat => (
          <div key={cat.id} className="cat-panel" onClick={() => onCategoryClick(cat.name)}>
            <div className="cat-bg-art"><span style={{fontSize:'6rem'}}>{cat.icon}</span></div>
            <div className="cat-fill"></div>
            <div className="cat-content">
              <div className="cat-num">0{cat.id}</div>
              <h3 className="cat-title">{cat.name.replace(' ', '\n')}</h3>
              <p className="cat-sub">
                {cat.name === 'Duffel Bag' ? 'Weekend & Travel' : 
                 cat.name === 'Carry Bag' ? 'Everyday Essentials' : 
                 cat.name === 'Backpack' ? 'Work & Adventure' : 'Home Luxury'}
              </p>
              <span className="cat-arrow">Shop Now</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}