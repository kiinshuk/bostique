'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const reasons = [
  { icon: '✦', title: 'Premium Materials', desc: 'Genuine full-grain leather, quality fabrics.' },
  { icon: '◈', title: 'Handcrafted', desc: 'Made by skilled artisans with decades of experience.' },
  { icon: '↗', title: 'Pan-India Delivery', desc: 'Fast, free shipping across India.' },
  { icon: '✓', title: 'WhatsApp Support', desc: 'Direct support via WhatsApp 9AM-9PM.' },
];

export default function Philosophy({ isMobile }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (isMobile) {
    return (
      <section style={{ padding: '60px 0', background: 'var(--color-ivory)' }}>
        <div style={{ padding: '0 20px', marginBottom: '32px', textAlign: 'center' }}>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '8px' }}
          >
            Why Bostique
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 300, color: 'var(--color-black)' }}
          >
            Four reasons to choose us
          </motion.h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', padding: '0 20px' }}>
          {reasons.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ padding: '24px 16px', background: 'var(--color-white)', textAlign: 'center', borderRadius: '2px' }}
            >
              <div style={{ fontSize: '1.25rem', color: 'var(--color-gold)', marginBottom: '12px' }}>{item.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 400, color: 'var(--color-black)', marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--color-gray-500)', lineHeight: 1.6 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} style={{ padding: '140px 48px', background: 'var(--color-ivory)' }}>
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
          style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '20px' }}
        >
          Why Bostique
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 300, color: 'var(--color-black)', lineHeight: 1.4, maxWidth: '600px', margin: '0 auto' }}
        >
          Four reasons to carry something made to last.
        </motion.h2>
      </motion.div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        {reasons.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            whileHover={{ y: -8, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
            style={{ padding: '48px 32px', background: 'var(--color-white)', textAlign: 'center', borderRadius: '2px', transition: 'box-shadow 0.3s ease' }}
          >
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 + 0.3, type: "spring", stiffness: 200 }}
              style={{ fontSize: '1.75rem', color: 'var(--color-gold)', marginBottom: '24px' }}
            >
              {item.icon}
            </motion.div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 400, color: 'var(--color-black)', marginBottom: '16px' }}>{item.title}</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 400, color: 'var(--color-gray-500)', lineHeight: 1.7 }}>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}