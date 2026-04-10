'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const navStyles: Record<string, React.CSSProperties> = {
  nav: {
    position: 'fixed' as React.CSSProperties['position'],
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 48px',
    transition: 'all var(--transition-base)',
  },
  navScrolled: {
    background: 'rgba(244, 241, 236, 0.95)',
    backdropFilter: 'blur(12px)',
    padding: '16px 48px',
    boxShadow: 'var(--shadow-sm)',
  },
  logo: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    fontWeight: 500,
    letterSpacing: '0.2em',
    color: 'var(--color-charcoal)',
  },
  links: {
    display: 'flex',
    gap: '40px',
    listStyle: 'none',
  },
  link: {
    fontSize: '0.875rem',
    fontWeight: 400,
    letterSpacing: '0.05em',
    color: 'var(--color-text-secondary)',
    transition: 'color var(--transition-fast)',
    position: 'relative' as const,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  accountBtn: {
    fontSize: '0.875rem',
    color: 'var(--color-text-primary)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px 16px',
  },
  cartPill: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    background: 'var(--color-charcoal)',
    color: 'var(--color-white)',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.875rem',
    fontWeight: 500,
    cursor: 'pointer',
    border: 'none',
    transition: 'all var(--transition-base)',
  },
  count: {
    background: 'var(--color-cognac)',
    color: 'var(--color-white)',
    fontSize: '0.75rem',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileNav: {
    position: 'fixed' as React.CSSProperties['position'],
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: 'rgba(250, 250, 248, 0.95)',
    backdropFilter: 'blur(10px)',
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: 'var(--shadow-sm)',
  },
  mobileLogo: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.2rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    color: 'var(--color-charcoal)',
  },
  mobileActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  cartBtn: {
    position: 'relative',
    background: 'none',
    border: 'none',
    fontSize: '1.3rem',
    cursor: 'pointer',
  },
  cartBadge: {
    position: 'absolute',
    top: '-6px',
    right: '-8px',
    background: 'var(--color-cognac)',
    color: 'var(--color-white)',
    fontSize: '0.65rem',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.3rem',
    cursor: 'pointer',
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: 'var(--color-surface)',
    padding: '20px',
    boxShadow: 'var(--shadow-lg)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  menuLink: {
    padding: '14px 0',
    borderBottom: '1px solid var(--color-line)',
    fontSize: '0.9rem',
    color: 'var(--color-text-primary)',
  },
  menuBtnItem: {
    textAlign: 'left',
    padding: '14px 0',
    borderBottom: '1px solid var(--color-line)',
    background: 'none',
    border: 'none',
    fontSize: '0.9rem',
    color: 'var(--color-text-primary)',
    cursor: 'pointer',
  },
};

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

  if (isMobile) {
    return (
      <nav style={navStyles.mobileNav}>
        <a href="#" style={navStyles.mobileLogo}>BOSTIQUE</a>
        <div style={navStyles.mobileActions}>
          <button onClick={handleCartClick} style={navStyles.cartBtn}>
            🛒
            {cartCount > 0 && <span style={navStyles.cartBadge}>{cartCount}</span>}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} style={navStyles.menuBtn}>☰</button>
        </div>
        {menuOpen && (
          <div style={navStyles.mobileMenu}>
            <a href="#shop" onClick={() => setMenuOpen(false)} style={navStyles.menuLink}>Shop</a>
            <a href="#philosophy" onClick={() => setMenuOpen(false)} style={navStyles.menuLink}>About</a>
            <button onClick={() => { setMenuOpen(false); handleUserClick(); }} style={navStyles.menuBtnItem}>
              {user ? `👤 ${user.name}` : '👤 Account'}
            </button>
          </div>
        )}
      </nav>
    );
  }

  return (
    <nav style={{...navStyles.nav, ...(scrolled ? navStyles.navScrolled : {})}}>
      <a href="/" style={navStyles.logo}>BOSTIQUE</a>
      <ul style={navStyles.links}>
        <li><a href="#shop" style={navStyles.link}>Shop</a></li>
        <li><a href="#philosophy" style={navStyles.link}>About</a></li>
      </ul>
      <div style={navStyles.actions}>
        <button onClick={handleUserClick} style={navStyles.accountBtn}>
          {user ? `👤 ${user.name}` : '👤 Account'}
        </button>
        <button onClick={handleCartClick} style={navStyles.cartPill}>
          Bag <span style={navStyles.count}>{cartCount}</span>
        </button>
      </div>
    </nav>
  );
}