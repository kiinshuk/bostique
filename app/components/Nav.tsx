'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

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
      <motion.nav 
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-black)', borderBottom: '1px solid rgba(201,169,98,0.2)' }}
      >
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.4rem', cursor: 'pointer' }}>{menuOpen ? '✕' : '☰'}</button>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 300, letterSpacing: '0.35em', color: 'white', textTransform: 'uppercase' }}>BOSTIQUE</span>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button onClick={handleUserClick} style={{ background: 'none', border: 'none', color: 'white', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em' }}>{user ? user.name : 'Account'}</button>
          <div style={{ position: 'relative' }}>
            <button onClick={handleCartClick} style={{ background: 'none', border: 'none', color: 'white', fontSize: '0.7rem', fontWeight: 500 }}>Bag</button>
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{ position: 'absolute', top: '-6px', right: '-8px', background: 'var(--color-gold)', color: 'black', fontSize: '0.55rem', width: '14px', height: '14px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}
              >
                {cartCount}
              </motion.span>
            )}
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{ position: 'fixed', top: '58px', left: 0, right: 0, bottom: 0, background: 'var(--color-black)', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', zIndex: 999 }}
            >
              {['Shop', 'Collections', 'About', 'Contact'].map((item, i) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={item === 'Shop' ? '#shop' : '#philosophy'}
                  style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 500, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.7)', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    );
  }

  return (
    <motion.nav 
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000, 
        padding: scrolled ? '16px 60px' : '28px 60px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        background: scrolled ? 'rgba(0,0,0,0.95)' : 'transparent', 
        backdropFilter: scrolled ? 'blur(20px)' : 'none', 
        borderBottom: scrolled ? '1px solid rgba(201,169,98,0.15)' : 'none', 
        transition: 'all 0.4s ease' 
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '56px' }}>
        <motion.span 
          whileHover={{ scale: 1.02 }}
          style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 300, letterSpacing: '0.4em', color: 'white', textTransform: 'uppercase', cursor: 'pointer' }}
        >
          BOSTIQUE
        </motion.span>
        <div style={{ display: 'flex', gap: '40px' }}>
          {['Shop', 'About', 'Contact'].map((item) => (
            <motion.a
              key={item}
              href={item === 'Shop' ? '#shop' : '#philosophy'}
              whileHover={{ y: -2, color: 'var(--color-gold)' }}
              style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.75)', transition: 'color 0.3s ease' }}
            >
              {item}
            </motion.a>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
        <motion.button
          whileHover={{ y: -2, color: 'var(--color-gold)' }}
          onClick={handleUserClick}
          style={{ background: 'none', border: 'none', color: 'white', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em', transition: 'color 0.3s ease' }}
        >
          {user ? user.name : 'Sign In'}
        </motion.button>
        <div style={{ position: 'relative' }}>
          <motion.button
            whileHover={{ y: -2 }}
            onClick={handleCartClick}
            style={{ background: 'none', border: 'none', color: 'white', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em' }}
          >
            Bag
          </motion.button>
          {cartCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
              style={{ position: 'absolute', top: '-8px', right: '-10px', background: 'var(--color-gold)', color: 'black', fontSize: '0.55rem', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}
            >
              {cartCount}
            </motion.span>
          )}
        </div>
      </div>
    </motion.nav>
  );
}