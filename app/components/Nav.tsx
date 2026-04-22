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

  function handleCartClick() { router.push('/cart'); }
  function handleUserClick() { router.push(user ? '/account' : '/signin'); }

  if (isMobile) {
    return (
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'var(--color-black)', borderBottom: '1px solid rgba(201,169,98,0.2)',
      }}>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.4rem', cursor: 'pointer' }}>
          {menuOpen ? '✕' : '☰'}
        </button>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 300, letterSpacing: '0.35em', color: 'white', textTransform: 'uppercase' }}>BOSTIQUE</span>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button onClick={handleUserClick} style={{ background: 'none', border: 'none', color: 'white', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em' }}>{user ? user.name : 'Account'}</button>
          <div style={{ position: 'relative' }}>
            <button onClick={handleCartClick} style={{ background: 'none', border: 'none', color: 'white', fontSize: '0.7rem', fontWeight: 500 }}>Bag</button>
            {cartCount > 0 && <span style={{ position: 'absolute', top: '-6px', right: '-8px', background: 'var(--color-gold)', color: 'black', fontSize: '0.55rem', width: '14px', height: '14px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>{cartCount}</span>}
          </div>
        </div>
        {menuOpen && (
          <div style={{ position: 'fixed', top: '58px', left: 0, right: 0, bottom: 0, background: 'var(--color-black)', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', zIndex: 999 }}>
            {['Shop', 'Collections', 'About', 'Contact'].map(item => (
              <a key={item} href={item === 'Shop' ? '#shop' : '#philosophy'} style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 500, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.7)', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{item}</a>
            ))}
          </div>
        )}
      </nav>
    );
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '24px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: scrolled ? 'rgba(0,0,0,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(201,169,98,0.2)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 300, letterSpacing: '0.35em', color: 'white', textTransform: 'uppercase' }}>BOSTIQUE</span>
        <div style={{ display: 'flex', gap: '36px' }}>
          <a href="#shop" style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.7)' }}>Shop</a>
          <a href="#philosophy" style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.7)' }}>About</a>
          <a href="#philosophy" style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.7)' }}>Contact</a>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <button onClick={handleUserClick} style={{ background: 'none', border: 'none', color: 'white', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em' }}>{user ? user.name : 'Sign In'}</button>
        <div style={{ position: 'relative' }}>
          <button onClick={handleCartClick} style={{ background: 'none', border: 'none', color: 'white', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em' }}>Bag</button>
          {cartCount > 0 && <span style={{ position: 'absolute', top: '-8px', right: '-10px', background: 'var(--color-gold)', color: 'black', fontSize: '0.55rem', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>{cartCount}</span>}
        </div>
      </div>
    </nav>
  );
}