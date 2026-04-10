'use client';

import { useRouter } from 'next/navigation';

export default function CartPanel({ cart, total, onClose, onUpdateQty, onRemove, isMobile }) {
  const router = useRouter();
  const waNumber = '919084736334';
  
  function handleOrder() {
    const message = 'Order: ' + cart.map(i => `${i.name} x${i.qty}`).join(', ') + ` | Total: ₹${total}`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, '_blank');
  }

  function handleCheckout() {
    onClose();
    router.push('/checkout');
  }

  return (
    <>
      <div onClick={onClose} style={{ 
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999,
        display: 'flex', alignItems: 'flex-end'
      }}></div>
      <div style={{ 
        position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', 
        borderRadius: isMobile ? '20px 20px 0 0' : '20px 20px 0 0', 
        maxHeight: isMobile ? '85vh' : '80vh', zIndex: 10000,
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 -10px 40px rgba(0,0,0,0.1)'
      }}>
        <div style={{ padding: isMobile ? '20px' : '25px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: isMobile ? '1.1rem' : '1.25rem', fontWeight: 600 }}>Your Bag ({cart.reduce((s, i) => s + i.qty, 0)})</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
        </div>
        
        <div style={{ flex: 1, overflow: 'auto', padding: isMobile ? '15px' : '20px' }}>
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '40px 20px' }}>Your bag is empty</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '10px' : '15px' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: isMobile ? '10px' : '15px', padding: isMobile ? '10px' : '15px', background: '#f9f9f9', borderRadius: '10px', alignItems: 'center' }}>
                  <div style={{ width: isMobile ? '50px' : '70px', height: isMobile ? '50px' : '70px', background: '#eee', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {item.images && item.images[0] ? <img src={item.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} /> : item.image ? <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} /> : <span style={{ fontSize: isMobile ? '1.5rem' : '2rem' }}>{item.emoji}</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: isMobile ? '0.85rem' : '1rem', fontWeight: 500, marginBottom: '4px' }}>{item.name}</h4>
                    <p style={{ fontSize: isMobile ? '0.9rem' : '1.1rem', fontWeight: 600, color: '#B05C2A' }}>₹{item.price.toLocaleString()}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '12px' }}>
                    <button onClick={() => onUpdateQty(item.id, -1)} style={{ width: isMobile ? '28px' : '32px', height: isMobile ? '28px' : '32px', borderRadius: '50%', border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontSize: isMobile ? '1rem' : '1.2rem' }}>−</button>
                    <span style={{ minWidth: '20px', textAlign: 'center', fontSize: isMobile ? '0.9rem' : '1rem' }}>{item.qty}</span>
                    <button onClick={() => onUpdateQty(item.id, 1)} style={{ width: isMobile ? '28px' : '32px', height: isMobile ? '28px' : '32px', borderRadius: '50%', border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontSize: isMobile ? '1rem' : '1.2rem' }}>+</button>
                  </div>
                  <button onClick={() => onRemove(item.id)} style={{ background: 'none', border: 'none', color: '#C0392B', cursor: 'pointer', fontSize: '1rem' }}>🗑</button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cart.length > 0 && (
          <div style={{ padding: isMobile ? '20px' : '25px', borderTop: '1px solid #eee', background: '#fafafa' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: isMobile ? '1rem' : '1.1rem' }}>
              <span style={{ color: '#666' }}>Total</span>
              <span style={{ fontWeight: 700, fontSize: isMobile ? '1.2rem' : '1.3rem' }}>₹{total.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handleCheckout} style={{ flex: 1, padding: isMobile ? '14px' : '16px', background: '#333', color: 'white', border: 'none', borderRadius: isMobile ? '8px' : '10px', fontSize: isMobile ? '0.95rem' : '1rem', fontWeight: 600, cursor: 'pointer' }}>
                Checkout
              </button>
              <button onClick={handleOrder} style={{ flex: 1, padding: isMobile ? '14px' : '16px', background: '#25D366', color: 'white', border: 'none', borderRadius: isMobile ? '8px' : '10px', fontSize: isMobile ? '0.95rem' : '1rem', fontWeight: 600, cursor: 'pointer' }}>
                💬 WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}