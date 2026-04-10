'use client';

export default function Footer() {
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
            <li><a href="#shop" onClick={() => document.querySelector('.filter-tab:nth-child(2)')?.dispatchEvent(new Event('click', {bubbles: true}))}>Duffel Bags</a></li>
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
      {/* WhatsApp Float */}
      <a className="wa-float" href="https://wa.me/919084736334?text=Hi%20Bostique!%20I%27d%20like%20to%20place%20an%20order." target="_blank" rel="noopener noreferrer">
        💬
        <span className="wa-tooltip">Order on WhatsApp</span>
      </a>
    </footer>
  );
}