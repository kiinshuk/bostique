'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Nav({ cartCount, user, isMobile }) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
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

  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: isMobile ? '16px 20px' : '20px 48px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
    backdropFilter: scrolled ? 'blur(10px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--color-gray-100)' : 'none',
    transition: 'all 0.3s ease',
  };

  const logoStyle: React.CSSProperties = {
    fontFamily: 'var(--font-display)',
    fontSize: isMobile ? '1.2rem' : '1.5rem',
    letterSpacing: '0.15em',
    color: 'var(--color-black)',
    fontWeight: 400,
  };

  const linkStyle: React.CSSProperties = {
    fontSize: '0.85rem',
    color: 'var(--color-gray-700)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontWeight: 500,
    transition: 'color 0.2s',
  };

  const actionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: isMobile ? '16px' : '24px',
  };

  const iconBtnStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.1rem',
    color: 'var(--color-black)',
    position: 'relative',
  };

  const countStyle: React.CSSProperties = {
    position: 'absolute',
    top: '-6px',
    right: '-8px',
    background: 'var(--color-black)',
    color: 'white',
    fontSize: '0.6rem',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
  };

  const mobileNavStyle: React.CSSProperties = {
    ...navStyle,
    background: 'white',
    borderBottom: '1px solid var(--color-gray-100)',
  };

  const mobileLogoStyle: React.CSSProperties = {
    ...logoStyle,
  };

  const mobileActionsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  };

  if (isMobile) {
    return (
      <nav style={mobileNavStyle}>
        <span style={mobileLogoStyle}>BOSTIQUE</span>
        <div style={mobileActionsStyle}>
          <button onClick={handleUserClick} style={iconBtnStyle}>
            👤
          </button>
          <button onClick={handleCartClick} style={iconBtnStyle}>
            🛒
            {cartCount > 0 && <span style={countStyle}>{cartCount}</span>}
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav style={navStyle}>
      <span style={logoStyle}>BOSTIQUE</span>
      
      <div style={{ display: 'flex', gap: '32px' }}>
        <a href="#shop" style={linkStyle}>Shop</a>
        <a href="#philosophy" style={linkStyle}>About</a>
      </div>
      
      <div style={actionStyle}>
        <button onClick={handleUserClick} style={iconBtnStyle}>
          {user ? user.name : 'Sign In'}
        </button>
        <button onClick={handleCartClick} style={iconBtnStyle}>
          Bag
          {cartCount > 0 && <span style={countStyle}>{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
}