'use client';

import { useState } from 'react';

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [qty, setQty] = useState(1);

  function handleAdd() {
    onAddToCart(product, qty);
    onClose();
  }

  return (
    <>
      <div className="modal-bg on" onClick={onClose}>
        <div className="modal-box" onClick={e => e.stopPropagation()}>
          <div className="modal-art">
            <span style={{fontSize:'8rem'}}>{product.emoji}</span>
          </div>
          <div className="modal-copy">
            <p className="modal-cat">{product.category}</p>
            <h2 className="modal-name">{product.name}</h2>
            <p className="modal-price">₹{product.price.toLocaleString()}</p>
            <p className="modal-desc">{product.desc || product.description}</p>
            <div className="modal-qty-row">
              <span className="modal-qty-label">Qty</span>
              <div className="modal-qty-ctrl">
                <button className="cr-q" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span className="cr-qv">{qty}</span>
                <button className="cr-q" onClick={() => setQty(qty + 1)}>+</button>
              </div>
            </div>
            <button className="modal-add" onClick={handleAdd}>Add to Bag</button>
            <p className="modal-wa-link">
              <a href={`https://wa.me/919084736334?text=Hi%20Bostique!%20I%27m%20interested%20in%20${encodeURIComponent(product.name)}.`} target="_blank" rel="noopener noreferrer">
                Order directly on WhatsApp →
              </a>
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>
      </div>
    </>
  );
}