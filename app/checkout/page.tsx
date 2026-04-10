'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CACHE_KEYS = { cart: 'bostique_cart', user: 'bostique_user' };

function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? JSON.parse(decodeURIComponent(match[2])) : null;
}

export default function Checkout() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [user, setUser] = useState(null);
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const cachedCart = localStorage.getItem(CACHE_KEYS.cart);
    if (cachedCart) {
      try {
        const { data } = JSON.parse(cachedCart);
        setCart(data || []);
      } catch {}
    }

    const cookieUser = getCookie(CACHE_KEYS.user);
    if (cookieUser) {
      setUser(cookieUser);
      setForm(prev => ({ ...prev, name: cookieUser.name || '', email: cookieUser.email || '', phone: cookieUser.phone || '' }));
    }

    setLoading(false);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = total > 2000 ? 0 : 150;
  const grandTotal = total + shipping;

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    if (!form.name || !form.phone || !form.address) {
      alert('Please fill required fields');
      return;
    }
    setStep(2);
  }

  function handlePlaceOrder() {
    const orderDetails = {
      items: cart,
      total,
      shipping,
      grandTotal,
      customer: form,
      date: new Date().toISOString()
    };
    
    console.log('Order placed:', orderDetails);
    
    if (form.paymentMethod === 'whatsapp') {
      const message = `New Order:\n${cart.map(i => `${i.name} x${i.qty}`).join(', ')}\nTotal: ₹${grandTotal}\n\nCustomer: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}, ${form.city}, ${form.state} ${form.pincode}`;
      window.open(`https://wa.me/919084736334?text=${encodeURIComponent(message)}`, '_blank');
    }
    
    localStorage.removeItem(CACHE_KEYS.cart);
    setOrderPlaced(true);
  }

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <h2 style={{ marginBottom: '20px' }}>Your bag is empty</h2>
        <button onClick={() => router.push('/')} style={{ padding: '14px 28px', background: '#333', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Continue Shopping
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: '#F4F1EC' }}>
        <div style={{ textAlign: 'center', maxWidth: '350px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔐</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '16px' }}>Please Sign In</h2>
          <p style={{ color: '#666', marginBottom: '30px' }}>You need to be logged in to complete your purchase.</p>
          <button onClick={() => router.push('/?login=true')} style={{ padding: '14px 28px', background: '#333', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginBottom: '12px' }}>
            Sign In
          </button>
          <button onClick={() => router.push('/?register=true')} style={{ display: 'block', width: '100%', padding: '12px', background: 'transparent', color: '#333', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
            Create Account
          </button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: '#F4F1EC' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✅</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '16px' }}>Order Placed!</h2>
          <p style={{ color: '#666', marginBottom: '30px' }}>Thank you for your order. We will contact you shortly.</p>
          <button onClick={() => router.push('/')} style={{ padding: '14px 28px', background: '#333', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F4F1EC' }}>
      <header style={{ background: '#1C1C1A', color: 'white', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer' }}>←</button>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '0.1em' }}>BOSTIQUE</h1>
        <div style={{ width: '24px' }}></div>
      </header>

      <div style={{ padding: isMobile ? '20px' : '40px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '40px', flexDirection: isMobile ? 'column' : 'row' }}>
          <div style={{ flex: isMobile ? 'none' : 1.5 }}>
            <div style={{ background: 'white', borderRadius: '12px', padding: isMobile ? '20px' : '30px', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '20px', fontWeight: 600 }}>{step === 1 ? 'Shipping Address' : 'Payment Method'}</h2>
              
              {step === 1 ? (
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 500 }}>Full Name *</label>
                    <input name="name" value={form.name} onChange={handleInput} placeholder="Enter your name" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 500 }}>Email</label>
                      <input name="email" type="email" value={form.email} onChange={handleInput} placeholder="email@example.com" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 500 }}>Phone *</label>
                      <input name="phone" value={form.phone} onChange={handleInput} placeholder="+91 98765 43210" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 500 }}>Address *</label>
                    <textarea name="address" value={form.address} onChange={handleInput} placeholder="House No, Street, Landmark" rows={2} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', resize: 'none' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 500 }}>City</label>
                      <input name="city" value={form.city} onChange={handleInput} placeholder="City" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 500 }}>State</label>
                      <input name="state" value={form.state} onChange={handleInput} placeholder="State" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 500 }}>Pincode</label>
                      <input name="pincode" value={form.pincode} onChange={handleInput} placeholder="123456" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                    </div>
                  </div>
                  <button onClick={handleSubmit} style={{ width: '100%', padding: '14px', background: '#333', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', marginTop: '10px' }}>
                    Continue to Payment
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: '2px solid #ddd', borderRadius: '8px', cursor: 'pointer', background: form.paymentMethod === 'cod' ? '#f8f9fa' : 'white' }}>
                    <input type="radio" name="paymentMethod" value="cod" checked={form.paymentMethod === 'cod'} onChange={handleInput} />
                    <div>
                      <div style={{ fontWeight: 600 }}>Cash on Delivery</div>
                      <div style={{ fontSize: '0.85rem', color: '#666' }}>Pay when you receive</div>
                    </div>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: '2px solid #ddd', borderRadius: '8px', cursor: 'pointer', background: form.paymentMethod === 'whatsapp' ? '#f8f9fa' : 'white' }}>
                    <input type="radio" name="paymentMethod" value="whatsapp" checked={form.paymentMethod === 'whatsapp'} onChange={handleInput} />
                    <div>
                      <div style={{ fontWeight: 600 }}>WhatsApp Payment Link</div>
                      <div style={{ fontSize: '0.85rem', color: '#666' }}>Receive payment link on WhatsApp</div>
                    </div>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: '2px solid #ddd', borderRadius: '8px', cursor: 'pointer', background: form.paymentMethod === 'bank' ? '#f8f9fa' : 'white' }}>
                    <input type="radio" name="paymentMethod" value="bank" checked={form.paymentMethod === 'bank'} onChange={handleInput} />
                    <div>
                      <div style={{ fontWeight: 600 }}>Bank Transfer</div>
                      <div style={{ fontSize: '0.85rem', color: '#666' }}>UPI / NEFT / RTGS</div>
                    </div>
                  </label>

                  {form.paymentMethod === 'bank' && (
                    <div style={{ padding: '16px', background: '#f8f9fa', borderRadius: '8px', marginTop: '10px' }}>
                      <p style={{ fontSize: '0.85rem', marginBottom: '8px', fontWeight: 500 }}>Bank Details:</p>
                      <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.6 }}>
                        Account Name: Bostique<br />
                        Account No: 1234567890<br />
                        Bank: HDFC Bank<br />
                        IFSC: HDFC0001234<br />
                        UPI: bostique@upi
                      </p>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                    <button onClick={() => setStep(1)} style={{ flex: 1, padding: '14px', background: 'transparent', color: '#333', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' }}>
                      Back
                    </button>
                    <button onClick={handlePlaceOrder} style={{ flex: 1, padding: '14px', background: '#25D366', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>
                      Place Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ background: 'white', borderRadius: '12px', padding: isMobile ? '20px' : '30px', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', fontWeight: 600 }}>Order Summary</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                {cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '50px', height: '50px', background: '#f5f5f5', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {item.images && item.images[0] ? <img src={item.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} /> : <span style={{ fontSize: '1.5rem' }}>{item.emoji}</span>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>Qty: {item.qty}</div>
                    </div>
                    <div style={{ fontWeight: 600 }}>₹{(item.price * item.qty).toLocaleString()}</div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid #eee', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: '#666' }}>Subtotal</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: '#666' }}>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700, marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #eee' }}>
                  <span>Total</span>
                  <span style={{ color: '#8B4513' }}>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}