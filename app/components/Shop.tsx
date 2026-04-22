'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const productImages: Record<string, string[]> = {
  'Expedition Duffel': ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80'],
  'City Slicker Duffel': ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80'],
  'Heritage Carry Tote': ['https://images.unsplash.com/photo-1590874103328-eac38a6356f1?w=600&q=80'],
  'Market Carry Bag': ['https://images.unsplash.com/photo-1590874103328-eac38a6356f1?w=600&q=80'],
  'Urban Pro Backpack': ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80'],
  'Trail Backpack': ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80'],
  'Cognac Cushion Cover': ['https://images.unsplash.com/photo-1584100936595-c7654e5c7f39?w=600&q=80'],
  'Tan Leather Cushion Pair': ['https://images.unsplash.com/photo-1584100936595-c7654e5c7f39?w=600&q=80'],
};

export default function Shop({ products, filter, onFilterChange, onAddToCart, onProductClick, isMobile }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

  const filters = ['All', 'Duffel Bag', 'Carry Bag', 'Backpack', 'Cushion Cover'];
  const filterLabels: Record<string, string> = { 'All': 'All', 'Duffel Bag': 'Duffel', 'Carry Bag': 'Carry', 'Backpack': 'Backpack', 'Cushion Cover': 'Cushion' };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

  if (isMobile) {
    return (
      <section style={{ padding: '48px 0', background: 'var(--color-white)' }}>
        <div style={{ padding: '0 20px', marginBottom: '24px' }}>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '8px' }}
          >
            The Collection
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 300, color: 'var(--color-black)' }}
          >
            Shop
          </motion.h2>
        </div>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '0 20px 16px', marginBottom: '8px' }}>
          {filters.map(f => (
            <button 
              key={f} 
              onClick={() => onFilterChange(f)} 
              style={{ 
                padding: '10px 18px', 
                border: 'none', 
                background: filter === f ? 'var(--color-black)' : 'transparent', 
                color: filter === f ? 'white' : 'var(--color-gray-500)', 
                fontFamily: 'var(--font-body)', 
                fontSize: '0.65rem', 
                fontWeight: 500, 
                whiteSpace: 'nowrap', 
                textTransform: 'uppercase', 
                cursor: 'pointer',
                borderRadius: '2px'
              }}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', padding: '0 20px' }}>
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onProductClick(product)}
              style={{ background: 'var(--color-white)', cursor: 'pointer' }}
            >
              <div style={{ aspectRatio: '1/1.2', background: 'var(--color-gray-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', marginBottom: '12px' }}>
                {product.images && product.images[0] ? (
                  <motion.img 
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                    src={product.images[0]} 
                    alt={product.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                ) : (
                  <span style={{ fontSize: '2.5rem', opacity: 0.2 }}>{product.emoji}</span>
                )}
                {product.badge && (
                  <span style={{ position: 'absolute', top: '10px', left: '10px', padding: '6px 10px', background: 'var(--color-black)', color: 'var(--color-white)', fontFamily: 'var(--font-body)', fontSize: '0.5rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {product.badge}
                  </span>
                )}
              </div>
              <div style={{ padding: '0' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gray-500)', marginBottom: '4px' }}>{product.category}</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 400, color: 'var(--color-black)', marginBottom: '4px' }}>{product.name}</h3>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-black)' }}>₹{product.price.toLocaleString()}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} id="shop" style={{ padding: '120px 48px', background: 'var(--color-white)' }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px', flexWrap: 'wrap', gap: '24px' }}
      >
        <div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '16px' }}
          >
            The Collection
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 300, color: 'var(--color-black)' }}
          >
            Shop All
          </motion.h2>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {filters.map(f => (
            <motion.button
              key={f}
              onClick={() => onFilterChange(f)}
              whileHover={{ y: -2 }}
              style={{ 
                padding: '14px 24px', 
                border: 'none', 
                background: 'transparent', 
                color: filter === f ? 'var(--color-black)' : 'var(--color-gray-500)', 
                fontFamily: 'var(--font-body)', 
                fontSize: '0.7rem', 
                fontWeight: 500, 
                letterSpacing: '0.15em', 
                textTransform: 'uppercase', 
                cursor: 'pointer', 
                borderBottom: filter === f ? '2px solid var(--color-gold)' : '2px solid transparent',
                transition: 'all 0.3s ease'
              }}
            >
              {filterLabels[f]}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px' }}
      >
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            whileHover={{ y: -12 }}
            onClick={() => onProductClick(product)}
            style={{ background: 'var(--color-white)', cursor: 'pointer' }}
          >
            <div style={{ aspectRatio: '4/5', background: 'var(--color-gray-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', marginBottom: '20px' }}>
              {product.images && product.images[0] ? (
                <motion.img 
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5 }}
                  src={product.images[0]} 
                  alt={product.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                <span style={{ fontSize: '4rem', opacity: 0.15 }}>{product.emoji}</span>
              )}
              {product.badge && (
                <span style={{ position: 'absolute', top: '20px', left: '20px', padding: '10px 18px', background: 'var(--color-black)', color: 'var(--color-white)', fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', zIndex: 2 }}>
                  {product.badge}
                </span>
              )}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', padding: '14px 32px', background: 'var(--color-white)', color: 'var(--color-black)', fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
              >
                Add to Bag
              </motion.button>
            </div>
            <div style={{ padding: '0' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gray-500)', marginBottom: '10px' }}>{product.category}</p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 400, color: 'var(--color-black)', marginBottom: '10px' }}>{product.name}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 500, color: 'var(--color-black)' }}>₹{product.price.toLocaleString()}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}