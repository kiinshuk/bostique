'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const CACHE_KEYS = { cart: 'bostique_cart', user: 'bostique_user' };

function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? JSON.parse(decodeURIComponent(match[2])) : null;
}

function getCache(key) {
  if (typeof window === 'undefined') return null;
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    const parsed = JSON.parse(cached);
    return parsed.data || null;
  } catch { return null; }
}

function setCache(key, data) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify({ data: data, timestamp: Date.now() }));
}

function CartContent() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const cachedCart = getCache(CACHE_KEYS.cart);
    setCart(cachedCart || []);

    const cookieUser = getCookie(CACHE_KEYS.user);
    setUser(cookieUser);

    setLoading(false);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = total > 2000 ? 0 : 150;
  const grandTotal = total + shipping;

  const updateQty = (id, delta) => {
    const updated = cart.map(item => 
      item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
    ).filter(item => item.qty > 0);
    setCart(updated);
    setCache(CACHE_KEYS.cart, updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    setCache(CACHE_KEYS.cart, updated);
  };

  const handleWhatsAppOrder = () => {
    const message = 'Order: ' + cart.map(i => i.name + ' x' + i.qty).join(', ') + ' | Total: ₹' + grandTotal;
    window.open('https://wa.me/919084736334?text=' + encodeURIComponent(message), '_blank');
  };

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  if (cart.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--color-cream-warm)' }}>
        <header style={{ background: 'var(--color-charcoal)', color: 'white', padding: '20px 0', position: 'sticky', top: 0, zIndex: 100 }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1rem', cursor: 'pointer' }}>←</button>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', letterSpacing: '0.1em' }}>BOSTIQUE</h1>
            <div style={{ width: '24px' }}></div>
          </div>
        </header>
        <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🛒</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '12px' }}>Your Bag is Empty</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '30px' }}>Add some beautiful leather goods to your bag</p>
          <button onClick={() => router.push('/')} style={{ padding: '14px 32px', background: 'var(--color-charcoal)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-cream-warm)' }}>
      <header style={{ background: 'var(--color-charcoal)', color: 'white', padding: '20px 0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1rem', cursor: 'pointer' }}>←</button>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', letterSpacing: '0.1em' }}>Your Bag ({cart.reduce((s, i) => s + i.qty, 0)})</h1>
          <div style={{ width: '24px' }}></div>
        </div>
      </header>

      <div className="container" style={{ padding: isMobile ? '20px' : '40px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr', gap: isMobile ? '24px' : '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: isMobile ? '12px' : '20px', padding: isMobile ? '12px' : '20px', background: 'white', borderRadius: '12px', alignItems: 'center' }}>
                <div style={{ width: isMobile ? '80px' : '100px', height: isMobile ? '80px' : '100px', background: 'var(--color-cream-warm)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                  {item.images && item.images[0] ? (
                    <img src={item.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: isMobile ? '2rem' : '2.5rem' }}>{item.emoji}</span>
                  )}
                </div>
                
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: isMobile ? '0.9rem' : '1rem', fontWeight: 600, marginBottom: '4px' }}>{item.name}</h3>
                  <p style={{ fontSize: isMobile ? '1rem' : '1.1rem', fontWeight: 700, color: 'var(--color-cognac)' }}>₹{item.price.toLocaleString()}</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button 
                    onClick={() => updateQty(item.id, -1)}
                    style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'white', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    −
                  </button>
                  <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 600 }}>{item.qty}</span>
                  <button 
                    onClick={() => updateQty(item.id, 1)}
                    style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'white', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    +
                  </button>
                </div>

                <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: 'var(--color-error)', cursor: 'pointer', fontSize: '1.2rem', padding: '8px' }}>
                  🗑
                </button>
              </div>
            ))}
          </div>

          <div style={{ background: 'white', borderRadius: '16px', padding: isMobile ? '20px' : '28px', height: 'fit-content', position: isMobile ? 'relative' : 'sticky', top: isMobile ? 'auto' : '100px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '20px' }}>Order Summary</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--color-line)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Subtotal</span>
                <span style={{ fontWeight: 600 }}>₹{total.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Shipping</span>
                <span style={{ fontWeight: 600 }}>{shipping === 0 ? 'FREE' : '₹' + shipping}</span>
              </div>
              {shipping === 0 && (
                <p style={{ fontSize: '0.8rem', color: 'var(--color-success)' }}>🎉 Free shipping on orders above ₹2000</p>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Total</span>
              <span style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-cognac)' }}>₹{grandTotal.toLocaleString()}</span>
            </div>

            <button 
              onClick={() => router.push('/checkout')}
              style={{ width: '100%', padding: '16px', background: 'var(--color-charcoal)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', marginBottom: '12px' }}
            >
              Proceed to Checkout
            </button>
            
            <button 
              onClick={handleWhatsAppOrder}
              style={{ width: '100%', padding: '16px', background: '#25D366', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}
            >
              💬 Order via WhatsApp
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '16px' }}>
              {user ? 'Signed in' : 'Sign in for faster checkout'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Cart() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <CartContent />
    </Suspense>
  );
}