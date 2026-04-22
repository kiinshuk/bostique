'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const testimonials = [
  { text: "The leather backpack is absolutely stunning. Everyone at the office asks where I got it.", author: 'Rahul Mehta, Delhi' },
  { text: "Ordered the duffel for my Goa trip — held everything perfectly!", author: 'Priya Sharma, Mumbai' },
  { text: "The leather cushion covers transformed my living room. Rich texture!", author: 'Anjali Verma, Bangalore' },
];

export default function Testimonials({ isMobile }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (isMobile) {
    return (
      <section style={{ padding: '60px 0', background: 'var(--color-white)' }}>
        <div style={{ padding: '0 20px', marginBottom: '32px', textAlign: 'center' }}>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '8px' }}
          >
            Customer Stories
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 300, color: 'var(--color-black)' }}
          >
            What our customers say
          </motion.h2>
        </div>
        <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', padding: '0 20px 12px', scrollbarWidth: 'none' }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ minWidth: '260px', padding: '28px', background: 'var(--color-ivory)', borderLeft: '3px solid var(--color-gold)', flexShrink: 0 }}
            >
              <div style={{ fontSize: '0.9rem', color: 'var(--color-gold)', marginBottom: '16px', letterSpacing: '3px' }}>★★★★★</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-black)', marginBottom: '16px', lineHeight: 1.7, fontStyle: 'italic' }}>"{t.text}"</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.1em', color: 'var(--color-gray-500)', textTransform: 'uppercase' }}>{t.author}</p>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} style={{ padding: '140px 48px', background: 'var(--color-white)' }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '72px' }}
      >
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '16px' }}
        >
          Customer Stories
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 300, color: 'var(--color-black)' }}
        >
          What our customers say
        </motion.h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', maxWidth: '1100px', margin: '0 auto' }}>
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(0,0,0,0.08)' }}
            style={{ padding: '40px', background: 'var(--color-ivory)', borderLeft: '3px solid var(--color-gold)', transition: 'box-shadow 0.3s ease' }}
          >
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 + 0.2, type: "spring", stiffness: 150 }}
              style={{ fontSize: '1rem', color: 'var(--color-gold)', marginBottom: '24px', letterSpacing: '4px' }}
            >
              ★★★★★
            </motion.div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 400, color: 'var(--color-black)', lineHeight: 1.8, marginBottom: '24px', fontStyle: 'italic' }}>"{t.text}"</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.15em', color: 'var(--color-gray-500)', textTransform: 'uppercase' }}>{t.author}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '56px', textAlign: 'center' }}
      >
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gray-500)' }}>5.0 Average Rating</p>
      </motion.div>
    </section>
  );
}