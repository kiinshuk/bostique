'use client';

export default function Footer({ isMobile }) {
  if (isMobile) {
    return (
      <footer style={{ padding: '30px 20px', background: '#1C1C1A', color: 'white' }}>
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <h3 style={{ fontSize: '1.3rem', letterSpacing: '0.15em', marginBottom: '5px' }}>BOSTIQUE</h3>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>Crafted to Carry Your Story</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
          <div>
            <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>COLLECTIONS</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><a href="#shop" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>Duffel Bags</a></li>
              <li><a href="#shop" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>Carry Bags</a></li>
              <li><a href="#shop" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>Backpacks</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>CONTACT</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><a href="https://wa.me/919084736334" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>+91 90847 36334</a></li>
              <li><a href="mailto:hello@bostique.in" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>hello@bostique.in</a></li>
            </ul>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
          <a href="https://wa.me/919084736334" style={{ color: 'white', fontSize: '1.5rem' }}>💬</a>
          <a href="#" style={{ color: 'white', fontSize: '1.5rem' }}>📸</a>
          <a href="#" style={{ color: 'white', fontSize: '1.5rem' }}>📘</a>
        </div>
        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>© 2026 Bostique. Made in India.</p>
        <a href="https://wa.me/919084736334?text=Hi%20Bostique!" style={{ 
          position: 'fixed', bottom: '20px', right: '20px', width: '50px', height: '50px', 
          background: '#25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', 
          justifyContent: 'center', fontSize: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>💬</a>
      </footer>
    );
  }

  return (
    <footer>
      <div className="footer-top">
        <div>
          <div className="footer-brand-name">BOSTIQUE</div>
          <div className="footer-tagline">Crafted to Carry Your Story</div>
          <p className="footer-body">Premium bags and leather goods, handcrafted for those who move with purpose. Established 2026, India.</p>
          <div className="footer-socials">
            <a href="https://wa.me/919084736334" className="soc" target="_blank" rel="noopener noreferrer">💬</a>
            <a href="#" className="soc">📸</a>
            <a href="#" className="soc">📘</a>
          </div>
        </div>
        <div>
          <h5>Collections</h5>
          <ul>
            <li><a href="#shop">Duffel Bags</a></li>
            <li><a href="#shop">Carry Bags</a></li>
            <li><a href="#shop">Backpacks</a></li>
            <li><a href="#shop">Cushion Covers</a></li>
          </ul>
        </div>
        <div>
          <h5>Information</h5>
          <ul>
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Returns & Exchange</a></li>
            <li><a href="#">Size & Care Guide</a></li>
          </ul>
        </div>
        <div>
          <h5>Contact</h5>
          <ul>
            <li><a href="https://wa.me/919084736334" target="_blank" rel="noopener noreferrer">+91 90847 36334</a></li>
            <li><a href="mailto:hello@bostique.in">hello@bostique.in</a></li>
            <li><a href="#">India</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Bostique. All rights reserved.</span>
        <span>Crafted with care · Made in India</span>
      </div>
      <a className="wa-float" href="https://wa.me/919084736334?text=Hi%20Bostique!%20I%27d%20like%20to%20place%20an%20order." target="_blank" rel="noopener noreferrer">
        💬
        <span className="wa-tooltip">Order on WhatsApp</span>
      </a>
    </footer>
  );
}