'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const testimonials = [
  { text: "The leather backpack is absolutely stunning. Everyone at the office asks where I got it. The quality is exceptional!", author: 'Rahul Mehta, Delhi', rating: 5 },
  { text: "Ordered the duffel for my Goa trip — held everything perfectly! The leather has already developed a beautiful patina.", author: 'Priya Sharma, Mumbai', rating: 5 },
  { text: "The leather cushion covers transformed my living room. Such rich texture and the craftsmanship is top-notch!", author: 'Anjali Verma, Bangalore', rating: 5 },
  { text: "Bought a tote for my wife and she loves it. The attention to detail is remarkable. Will definitely buy again!", author: 'Vikram Singh, Jaipur', rating: 5 },
  { text: "Fast delivery and the packaging was exquisite. The leather wallet I purchased is now my everyday essential.", author: 'Arjun Nair, Kochi', rating: 5 },
  { text: "Excellent customer service via WhatsApp. They helped me choose the perfect bag. Highly recommend!", author: 'Sneha Rao, Hyderabad', rating: 5 },
];

export default function Testimonials({ isMobile }) {
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
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '8px' }}
          >
            Testimonials
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 300, color: 'var(--color-white)' }}
          >
            What Our Customers Say
          </motion.h2>
        </div>
        <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', padding: '0 20px 12px', scrollbarWidth: 'none' }}>
          {testimonials.slice(0, 4).map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ minWidth: '280px', padding: '28px', background: 'var(--color-dark)', borderLeft: '3px solid var(--color-gold)', flexShrink: 0 }}
            >
              <div style={{ fontSize: '0.9rem', color: 'var(--color-gold)', marginBottom: '16px', letterSpacing: '2px' }}>
                {'★'.repeat(t.rating)}
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-white)', marginBottom: '20px', lineHeight: 1.7, fontStyle: 'italic' }}>"{t.text}"</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.1em', color: 'var(--color-gold)', textTransform: 'uppercase' }}>{t.author}</p>
            </motion.div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, color: 'var(--color-white)' }}>4.9/5</p>
          <p style={{ fontSize: '0.7rem', color: 'var(--color-gray-400)', letterSpacing: '0.1em' }}>Based on 150+ reviews</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} style={{ padding: '140px 48px', background: 'var(--color-black)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)' }} />
      
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
          Testimonials
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 300, color: 'var(--color-white)' }}
        >
          What Our Customers Say
        </motion.h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', maxWidth: '1200px', margin: '0 auto' }}>
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            whileHover={{ y: -8, backgroundColor: 'var(--color-charcoal)' }}
            style={{ padding: '40px', background: 'var(--color-dark)', borderLeft: '3px solid var(--color-gold)', transition: 'all 0.3s ease' }}
          >
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.2, type: "spring", stiffness: 150 }}
              style={{ fontSize: '1rem', color: 'var(--color-gold)', marginBottom: '24px', letterSpacing: '4px' }}
            >
              {'★'.repeat(t.rating)}
            </motion.div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 300, color: 'var(--color-white)', lineHeight: 1.85, marginBottom: '24px', fontStyle: 'italic' }}>"{t.text}"</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.15em', color: 'var(--color-gold)', textTransform: 'uppercase' }}>{t.author}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '64px', textAlign: 'center' }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', padding: '24px 48px', background: 'var(--color-dark)', borderRadius: '4px' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 300, color: 'var(--color-gold)', lineHeight: 1 }}>4.9</p>
            <p style={{ fontSize: '0.7rem', color: 'var(--color-gray-400)', letterSpacing: '0.1em', marginTop: '4px' }}>out of 5</p>
          </div>
          <div style={{ width: '1px', height: '50px', background: 'var(--color-gray-700)' }} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
              {[1,2,3,4,5].map(s => (
                <span key={s} style={{ color: 'var(--color-gold)', fontSize: '1.1rem' }}>★</span>
              ))}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-gray-400)' }}>Based on 150+ verified reviews</p>
          </div>
        </div>
      </motion.div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)' }} />
    </section>
  );
}