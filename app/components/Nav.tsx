'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Nav({ cartCount, user, isMobile }) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleCartClick() {
    router.push('/cart');
  }

  function handleUserClick() {
    if (user) {
      router.push('/account');
    } else {
      router.push('/signin');
    }
  }

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: isMobile ? '20px 24px' : '24px 60px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: scrolled ? 'rgba(0,0,0,0.95)' : 'transparent',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(201,169,98,0.2)' : 'none',
    transition: 'all 0.4s ease',
  };

  const logoStyle = {
    fontFamily: 'var(--font-display)',
    fontSize: isMobile ? '1.4rem' : '1.75rem',
    fontWeight: 300,
    letterSpacing: '0.35em',
    color: 'var(--color-white)',
    textTransform: 'uppercase',
  };

  const linkStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.7)',
    transition: 'color 0.3s',
    position: 'relative',
  };

  const actionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: isMobile ? '20px' : '32px',
  };

  const iconBtnStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.7rem',
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--color-white)',
    transition: 'color 0.3s',
  };

  const cartCountStyle = {
    position: 'absolute',
    top: '-8px',
    right: '-10px',
    background: 'var(--color-gold)',
    color: 'var(--color-black)',
    fontSize: '0.55rem',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
  };

  const mobileNavStyle = {
    ...navStyle,
    background: 'var(--color-black)',
    borderBottom: '1px solid rgba(201,169,98,0.2)',
    padding: '16px 20px',
  };

  if (isMobile) {
    return (
      <nav style={mobileNavStyle}>
        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          style={{ ...iconBtnStyle, fontSize: '1.2rem', letterSpacing: 0 }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
        
        <span style={logoStyle}>BOSTIQUE</span>
        
        <div style={actionStyle}>
          <button onClick={handleUserClick} style={iconBtnStyle}>
            {user ? user.name : 'Account'}
          </button>
          <div style={{ position: 'relative' }}>
            <button onClick={handleCartClick} style={iconBtnStyle}>
              Bag
            </button>
            {cartCount > 0 && <span style={cartCountStyle}>{cartCount}</span>}
          </div>
        </div>

        {menuOpen && (
          <div style={{
            position: 'fixed',
            top: '60px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--color-black)',
            padding: '40px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            zIndex: 999,
          }}>
            {['Shop', 'Collections', 'About', 'Contact'].map(item => (
              <a 
                key={item} 
                href={item === 'Shop' ? '#shop' : '#philosophy'}
                style={{ 
                  ...linkStyle, 
                  fontSize: '1.25rem', 
                  letterSpacing: '0.2em',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>
    );
  }

  return (
    <nav style={navStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
        <span style={logoStyle}>BOSTIQUE</span>
        <div style={{ display: 'flex', gap: '36px' }}>
          <a href="#shop" style={linkStyle}>Shop</a>
          <a href="#philosophy" style={linkStyle}>About</a>
          <a href="#philosophy" style={linkStyle}>Contact</a>
        </div>
      </div>
      
      <div style={actionStyle}>
        <button onClick={handleUserClick} style={iconBtnStyle}>
          {user ? user.name : 'Sign In'}
        </button>
        <div style={{ position: 'relative' }}>
          <button onClick={handleCartClick} style={iconBtnStyle}>
            Bag
          </button>
          {cartCount > 0 && <span style={cartCountStyle}>{cartCount}</span>}
        </div>
      </div>
    </nav>
  );
}