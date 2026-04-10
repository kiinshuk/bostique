'use client';

export default function Featured({ onAddToCart }) {
  return (
    <section id="feature">
      <div className="feat-art">
        <div className="feat-deco-num">01</div>
        <div className="feat-label-tag">Bestseller</div>
        <div className="feat-art-bag"></div>
      </div>
      <div className="feat-copy">
        <p className="eyebrow" style={{color:'rgba(250,250,248,0.5)'}}>Editor's Pick</p>
        <h2 className="feat-title">The <em>Expedition</em><br/>Duffel</h2>
        <p className="feat-body">Our flagship piece — built for the journey, whatever it looks like. Full-grain leather with weatherproof canvas base, YKK zippers, and a padded shoulder strap that distributes weight like it was made for you. Because it was.</p>
        <p className="feat-body" style={{marginTop:12}}>This isn't just a bag. It's the one you'll still be carrying in twenty years.</p>
        <div className="feat-price-wrap">
          <div className="feat-price">₹3,499</div>
        </div>
        <div className="feat-cta-row">
          <button className="btn-primary" onClick={() => onAddToCart({id:1,name:'Expedition Duffel',category:'Duffel Bag',price:3499,emoji:'🧳',desc:'Full-grain leather weekend bag.'})}>Add to Bag</button>
          <a className="btn-ghost" href="https://wa.me/919084736334?text=Hi%20Bostique!%20I%27m%20interested%20in%20the%20Expedition%20Duffel." target="_blank" rel="noopener noreferrer">Order on WhatsApp</a>
        </div>
      </div>
    </section>
  );
}