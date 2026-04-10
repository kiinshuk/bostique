'use client';

export default function Hero() {
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