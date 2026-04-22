'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const featuredProduct = { id: 1, name: 'Expedition Duffel', category: 'Duffel Bag', price: 3499, emoji: '🧳', desc: 'Full-grain leather weekend bag.' };

const featuredImage = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80";

export default function Featured({ onAddToCart, isMobile }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (isMobile) {
    return (
      <section style={{ padding: '60px 0', background: 'var(--color-black)', color: 'var(--color-white)' }}>
        <div style={{ position: 'relative', height: '300px', marginBottom: '32px' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${featuredImage})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.4)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 20%, var(--color-black) 100%)' }} />
        </div>
        <div style={{ padding: '0 20px' }}>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '12px' }}
          >
            Editor's Pick
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 300, marginBottom: '16px' }}
          >
            The <em style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>Expedition</em> Duffel
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '16px', lineHeight: 1.7 }}
          >
            Full-grain leather weekend bag with refined craftsmanship. Built to last, designed to age beautifully.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 400, color: 'var(--color-gold)', marginBottom: '24px' }}
          >
            ₹3,499
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAddToCart(featuredProduct)}
              style={{ padding: '16px', background: 'var(--color-gold)', color: 'var(--color-black)', border: 'none', fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' }}
            >
              Add to Bag
            </motion.button>
            <a href="https://wa.me/919084736334?text=Hi%20Bostique!" target="_blank" style={{ padding: '16px', background: 'transparent', color: 'var(--color-white)', border: '1px solid rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'center', textDecoration: 'none' }}>
              WhatsApp Order
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '90vh', background: 'var(--color-black)', color: 'var(--color-white)' }}>
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
      >
        <motion.div 
          style={{ position: 'absolute', inset: 0, backgroundImage: `url(${featuredImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }} />
        <motion.span 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'var(--font-display)', fontSize: '18rem', color: 'rgba(201,169,98,0.08)', lineHeight: 1, fontWeight: 300 }}
        >
          01
        </motion.span>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{ position: 'relative', width: '320px', height: '420px', overflow: 'hidden', borderRadius: '2px' }}
        >
          <img src={featuredImage} alt="Expedition Duffel" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px', maxWidth: '600px' }}
      >
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '24px' }}
        >
          Editor's Pick
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: '32px' }}
        >
          The <em style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>Expedition</em><br />Duffel
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 300, color: 'rgba(255,255,255,0.7)', lineHeight: 1.9, marginBottom: '24px' }}
        >
          Full-grain leather weekend bag with refined craftsmanship. Built to last, designed to age beautifully with a rich patina that tells your journey.
        </motion.p>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55 }}
          style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: '32px', fontStyle: 'italic' }}
        >
          "This isn't just a bag. It's the one you'll still be carrying in twenty years."
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 400, color: 'var(--color-gold)', marginBottom: '48px' }}
        >
          ₹3,499
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(201,169,98,0.3)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAddToCart(featuredProduct)}
            style={{ padding: '18px 40px', background: 'var(--color-gold)', color: 'var(--color-black)', border: 'none', fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            Add to Bag
          </motion.button>
          <motion.a 
            href="https://wa.me/919084736334?text=Hi%20Bostique!" 
            target="_blank"
            whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.6)' }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '18px 36px', background: 'transparent', color: 'var(--color-white)', border: '1px solid rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }}
          >
            WhatsApp
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}