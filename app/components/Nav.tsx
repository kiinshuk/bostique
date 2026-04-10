'use client';

import { useEffect, useState } from 'react';

export default function Nav({ cartCount, onCartClick, onUserClick, user, isMobile }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isMobile) {
    return (
      <nav style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(250,250,248,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        transition: 'all 0.3s'
      }}>
        <a href="#" style={{ fontSize: '1.2rem', fontWeight: 600, letterSpacing: '0.1em', color: '#0D0D0B' }}>BOSTIQUE</a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button onClick={onCartClick} style={{ position: 'relative', background: 'none', border: 'none', fontSize: '1.3rem' }}>
            🛒
            {cartCount > 0 && <span style={{ 
              position: 'absolute', top: '-5px', right: '-8px', 
              background: '#B05C2A', color: 'white', fontSize: '0.65rem',
              width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>{cartCount}</span>}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', fontSize: '1.3rem' }}>☰</button>
        </div>
        {menuOpen && (
          <div style={{ 
            position: 'absolute', top: '100%', left: 0, right: 0, 
            background: 'white', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            display: 'flex', flexDirection: 'column', gap: '15px'
          }}>
            <a href="#categories" onClick={() => setMenuOpen(false)} style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>Collections</a>
            <a href="#shop" onClick={() => setMenuOpen(false)} style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>Shop</a>
            <a href="#feature" onClick={() => setMenuOpen(false)} style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>Featured</a>
            <a href="#philosophy" onClick={() => setMenuOpen(false)} style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>Story</a>
            <button onClick={() => { setMenuOpen(false); onUserClick(); }} style={{ textAlign: 'left', padding: '10px 0', background: 'none', border: 'none' }}>
              {user ? `👤 ${user.name}` : '👤 Account'}
            </button>
          </div>
        )}
      </nav>
    );
  }

  return (
    <nav id="nav" className={scrolled ? 'scrolled' : ''}>
      <a className="nav-logo" href="#">BOSTIQUE</a>
      <ul className="nav-links">
        <li><a href="#categories">Collections</a></li>
        <li><a href="#shop">Shop</a></li>
        <li><a href="#feature">Featured</a></li>
        <li><a href="#philosophy">Story</a></li>
        <li><a href="#testimonials">Reviews</a></li>
      </ul>
      <div className="nav-actions">
        <button className="nav-btn" onClick={onUserClick}>
          {user ? `👤 ${user.name}` : '👤 Account'}
        </button>
        <button className="cart-pill" onClick={onCartClick}>
          Bag <span className="cart-pill-count">{cartCount}</span>
        </button>
      </div>
    </nav>
  );
}