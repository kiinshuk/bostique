'use client';

export default function Categories({ categories, onCategoryClick }) {
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