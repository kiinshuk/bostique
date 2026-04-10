'use client';

export default function Hero({ isMobile }) {
  if (isMobile) {
    return (
      <section style={{ padding: '100px 20px 40px', background: '#F4F1EC', minHeight: 'auto' }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#6B6560', marginBottom: '10px' }}>01 / New Collection 2026</p>
        <h1 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '15px', lineHeight: 1.2 }}>
          <span style={{ display: 'block' }}>Crafted to</span>
          <span style={{ display: 'block', fontStyle: 'italic', color: '#B05C2A' }}>Carry Your Story</span>
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#6B6560', marginBottom: '20px', lineHeight: 1.5 }}>
          Premium bags and leather goods for those who move with intention.
        </p>
        <div style={{ width: '80px', height: '80px', margin: '0 auto 20px', background: '#E8E0D4', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>🧳</div>
        <a href="#shop" style={{ display: 'inline-block', padding: '14px 28px', background: '#0D0D0B', color: 'white', borderRadius: '6px', fontSize: '0.85rem' }}>Explore Collection</a>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #ddd' }}>
          <div style={{ textAlign: 'center' }}><div style={{ fontSize: '1.2rem', fontWeight: 600 }}>100%</div><div style={{ fontSize: '0.65rem', color: '#666' }}>Leather</div></div>
          <div style={{ textAlign: 'center' }}><div style={{ fontSize: '1.2rem', fontWeight: 600 }}>4+</div><div style={{ fontSize: '0.65rem', color: '#666' }}>Collections</div></div>
          <div style={{ textAlign: 'center' }}><div style={{ fontSize: '1.2rem', fontWeight: 600 }}>⚡</div><div style={{ fontSize: '0.65rem', color: '#666' }}>Fast Delivery</div></div>
        </div>
      </section>
    );
  }

  return (
    <section id="hero">
      <div className="hero-bg-pattern"></div>
      <div className="hero-left">
        <p className="hero-number">01 / New Collection 2026</p>
        <h1 className="hero-h1">
          <span className="line"><span>Crafted</span></span>
          <span className="line"><span>to Carry</span></span>
          <span className="line"><span><em>Your Story.</em></span></span>
        </h1>
        <p className="hero-desc">Premium bags and leather goods for those who move with intention. Every stitch is deliberate. Every piece, a companion for life.</p>
        <div className="hero-cta-row">
          <a href="#shop" className="btn-primary">Explore Collection</a>
          <span className="hero-scroll">Scroll to discover</span>
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-visual-wrap">
          <div className="hero-tags">
            <span className="hero-tag">Genuine Leather</span>
            <span className="hero-tag">Artisan Made</span>
            <span className="hero-tag">India · 2026</span>
          </div>
          <div className="hero-bag-art">
            <div className="bag-body">
              <div className="bag-handle"></div>
              <div className="bag-buckle"></div>
              <div className="bag-label">BOSTIQUE</div>
            </div>
          </div>
          <div className="hero-counter">
            <div className="hero-counter-num">04</div>
            <div className="hero-counter-lbl">Collections</div>
          </div>
        </div>
      </div>
    </section>
  );
}