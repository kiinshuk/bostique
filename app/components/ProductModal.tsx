'use client';

import { useState } from 'react';

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [qty, setQty] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = product.image ? [product.image] : [];
  
  const handleAdd = () => {
    onAddToCart(product, qty);
    onClose();
  };

  return (
    <>
      <div 
        onClick={onClose}
        style={{ 
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}
      >
        <div 
          onClick={e => e.stopPropagation()}
          style={{ 
            background: 'white', borderRadius: '16px', maxWidth: '900px', width: '100%',
            display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden',
            boxShadow: '0 25px 50px rgba(0,0,0,0.25)', maxHeight: '90vh'
          }}
        >
          <div style={{ background: '#F4F1EC', position: 'relative', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {images.length > 0 ? (
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <img 
                  src={images[currentImageIndex]} 
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '20px' }}
                />
                {images.length > 1 && (
                  <>
                    <button 
                      onClick={() => setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length)}
                      style={{ 
                        position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
                        width: '40px', height: '40px', borderRadius: '50%', border: 'none', 
                        background: 'white', cursor: 'pointer', fontSize: '18px'
                      }}
                    >‹</button>
                    <button 
                      onClick={() => setCurrentImageIndex((currentImageIndex + 1) % images.length)}
                      style={{ 
                        position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                        width: '40px', height: '40px', borderRadius: '50%', border: 'none', 
                        background: 'white', cursor: 'pointer', fontSize: '18px'
                      }}
                    >›</button>
                  </>
                )}
                <div style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      style={{ 
                        width: idx === currentImageIndex ? '24px' : '8px', 
                        height: '8px', borderRadius: '4px', border: 'none',
                        background: idx === currentImageIndex ? '#C8A97A' : '#ccc',
                        cursor: 'pointer', transition: 'all 0.2s'
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <span style={{ fontSize: '8rem' }}>{product.emoji}</span>
            )}
          </div>
          
          <div style={{ padding: '40px', overflow: 'auto' }}>
            <button 
              onClick={onClose}
              style={{ 
                position: 'absolute', top: '20px', right: '20px', 
                background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#666'
              }}
            >✕</button>
            
            <p style={{ fontSize: '0.75rem', color: '#6B6560', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>
              {product.category}
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 400, marginBottom: '12px', color: '#1C1C1A' }}>
              {product.name}
            </h2>
            <p style={{ fontSize: '1.75rem', fontWeight: 600, color: '#B05C2A', marginBottom: '20px' }}>
              ₹{product.price.toLocaleString()}
            </p>
            
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', color: '#333' }}>Description</h4>
              <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.7 }}>
                {product.desc || product.description || 'Premium quality leather product, crafted with attention to detail and made to last.'}
              </p>
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', color: '#333' }}>Details</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.85rem', color: '#666' }}>
                <div><strong>Category:</strong> {product.category}</div>
                <div><strong>Status:</strong> {product.status === 'active' ? 'In Stock' : 'Out of Stock'}</div>
                {product.badge && <div><strong>Badge:</strong> {product.badge}</div>}
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.85rem', color: '#666' }}>Quantity:</span>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '6px' }}>
                  <button 
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    style={{ width: '36px', height: '36px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '18px' }}
                  >−</button>
                  <span style={{ width: '40px', textAlign: 'center', fontSize: '1rem' }}>{qty}</span>
                  <button 
                    onClick={() => setQty(qty + 1)}
                    style={{ width: '36px', height: '36px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '18px' }}
                  >+</button>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button 
                onClick={handleAdd}
                style={{ 
                  padding: '16px 32px', background: '#0D0D0B', color: 'white', 
                  border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem',
                  flex: '1 1 200px'
                }}
              >
                Add to Bag
              </button>
              <a 
                href={`https://wa.me/919084736334?text=Hi%20Bostique!%20I%27m%20interested%20in%20${encodeURIComponent(product.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  padding: '16px 24px', background: '#25D366', color: 'white', 
                  border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem',
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px'
                }}
              >
                💬 Order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}