'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const catImages: Record<string, string> = {
  'Duffel Bag': 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
  'Carry Bag': 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80',
  'Backpack': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
  'Cushion Cover': 'https://images.unsplash.com/photo-1584100936595-c7654e5c7f39?w=800&q=80',
};

const catSubtitles: Record<string, string> = {
  'Duffel Bag': 'Weekend Travel',
  'Carry Bag': 'Everyday Elegance',
  'Backpack': 'Professional Carry',
  'Cushion Cover': 'Home Accents',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

export default function Categories({ categories, onCategoryClick, isMobile }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (isMobile) {
    return (
      <section style={{ padding: '60px 0', background: 'var(--color-black)' }}>
        <div style={{ padding: '0 20px', marginBottom: '32px' }}>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '8px' }}
          >
            Collections
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 300, color: 'var(--color-white)' }}
          >
            Browse by Category
          </motion.h2>
        </div>
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', padding: '0 20px 20px', scrollSnapType: 'x mandatory' }}>
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => onCategoryClick(cat.name)}
              style={{ 
                minWidth: '160px', 
                height: '200px', 
                position: 'relative', 
                borderRadius: '4px', 
                overflow: 'hidden', 
                cursor: 'pointer',
                scrollSnapAlign: 'start',
                background: 'var(--color-charcoal)'
              }}
            >
              <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${catImages[cat.name] || catImages['Duffel Bag']})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.6s ease' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.85) 100%)' }} />
              <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '20px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 400, color: 'var(--color-white)', marginBottom: '4px' }}>{cat.name}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'var(--color-gold)', letterSpacing: '0.1em' }}>{catSubtitles[cat.name] || ''}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} id="categories" style={{ padding: '120px 48px', background: 'var(--color-black)' }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', flexWrap: 'wrap', gap: '24px' }}
      >
        <div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '16px' }}
          >
            Collections
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, color: 'var(--color-white)' }}
          >
            Browse by Category
          </motion.h2>
        </div>
        <motion.a 
          href="#shop"
          whileHover={{ x: 5 }}
          style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gray-400)', cursor: 'pointer' }}
        >
          View All →
        </motion.a>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}
      >
        {categories.map((cat) => (
          <motion.div
            key={cat.id}
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.4 } }}
            onClick={() => onCategoryClick(cat.name)}
            style={{ 
              position: 'relative', 
              aspectRatio: '3/4', 
              cursor: 'pointer', 
              overflow: 'hidden', 
              borderRadius: '2px',
              background: 'var(--color-dark)'
            }}
          >
            <motion.div 
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6 }}
              style={{ position: 'absolute', inset: 0, backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(${catImages[cat.name] || catImages['Duffel Bag']})` }} 
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.9) 100%)' }} />
            <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '32px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.55rem', fontWeight: 500, letterSpacing: '0.25em', color: 'var(--color-gold)', marginBottom: '12px', display: 'block', textTransform: 'uppercase' }}>
                0{cat.id}
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 400, color: 'var(--color-white)', lineHeight: 1.3, marginBottom: '8px' }}>{cat.name}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 400, color: 'rgba(255,255,255,0.6)' }}>{catSubtitles[cat.name] || ''}</p>
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              style={{ position: 'absolute', inset: 0, border: '1px solid var(--color-gold)', opacity: 0, margin: '16px', pointerEvents: 'none' }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}