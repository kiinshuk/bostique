'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero({ isMobile }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const heroImage = "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1920&q=80";

  if (isMobile) {
    return (
      <section style={{ minHeight: '100vh', background: 'var(--color-black)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.3)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)' }} />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative', zIndex: 2, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 60px', textAlign: 'center' }}
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '24px' }}
          >
            Est. 2026
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 300, lineHeight: 1.15, color: 'var(--color-white)', marginBottom: '20px' }}
          >
            Exquisite Leather<br />
            <em style={{ fontStyle: 'italic', color: 'var(--color-gold)', fontSize: '1.8rem' }}>Crafted for You</em>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 300, color: 'rgba(255,255,255,0.7)', marginBottom: '32px', lineHeight: 1.7, maxWidth: '300px' }}
          >
            Handcrafted luxury leather goods for those who appreciate timeless elegance.
          </motion.p>
          <motion.a 
            href="#shop"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            style={{ display: 'inline-block', padding: '16px 36px', background: 'var(--color-gold)', color: 'var(--color-black)', fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            Explore Collection
          </motion.a>
        </motion.div>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', letterSpacing: '0.2em' }}
        >
          ↓
        </motion.div>
      </section>
    );
  }

  return (
    <section ref={containerRef} style={{ minHeight: '100vh', background: 'var(--color-black)', position: 'relative', overflow: 'hidden' }}>
      <motion.div 
        style={{ position: 'absolute', inset: 0, y, backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.8) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")` }} />
      </motion.div>
      
      <motion.div style={{ position: 'relative', zIndex: 2, opacity, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: '900px', padding: '120px 48px 80px', textAlign: 'center' }}>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '32px' }}
          >
            Est. 2026 · Handcrafted Excellence
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--color-white)', marginBottom: '32px' }}
          >
            Exquisite Leather<br />
            <em style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>Crafted for You</em>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', fontWeight: 300, color: 'rgba(255,255,255,0.75)', lineHeight: 1.9, marginBottom: '48px', maxWidth: '560px', margin: '0 auto 48px' }}
          >
            Each piece tells a story of dedication, quality, and refined taste. 
            Handcrafted by master artisans using time-honored techniques.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <motion.a 
              href="#shop"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(201, 169, 98, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              style={{ display: 'inline-flex', alignItems: 'center', padding: '18px 48px', background: 'var(--color-gold)', color: 'var(--color-black)', fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase' }}
            >
              Explore Collection
            </motion.a>
          </motion.div>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{ width: '80px', height: '1px', background: 'var(--color-gold)', margin: '56px auto 0' }}
          />
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.5)', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}
      >
        <span>Discover</span>
        <span>↓</span>
      </motion.div>
    </section>
  );
}