'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

const fallbackProducts = [
  {id:1,name:'Expedition Duffel',category:'Duffel Bag',category_id:1,price:3499,emoji:'🧳',desc:'Full-grain leather weekend bag.',badge:'New',status:'active',images:['']},
  {id:2,name:'City Slicker Duffel',category:'Duffel Bag',category_id:1,price:2799,emoji:'🧳',desc:'Compact leather duffel.',badge:'',status:'active',images:['']},
  {id:3,name:'Heritage Carry Tote',category:'Carry Bag',category_id:2,price:1899,emoji:'👜',desc:'Timeless everyday tote.',badge:'New',status:'active',images:['']},
  {id:4,name:'Market Carry Bag',category:'Carry Bag',category_id:2,price:1299,emoji:'👜',desc:'Durable canvas and leather.',badge:'',status:'active',images:['']},
  {id:5,name:'Urban Pro Backpack',category:'Backpack',category_id:3,price:2999,emoji:'🎒',desc:'Work-ready leather backpack.',badge:'New',status:'active',images:['']},
  {id:6,name:'Trail Backpack',category:'Backpack',category_id:3,price:2199,emoji:'🎒',desc:'Adventure-ready backpack.',badge:'',status:'active',images:['']},
  {id:7,name:'Cognac Cushion Cover',category:'Cuffion Cover',category_id:4,price:899,emoji:'🛋️',desc:'Luxurious leather cushion.',badge:'New',status:'active',images:['']},
  {id:8,name:'Tan Leather Cushion Pair',category:'Cushion Cover',category_id:4,price:1699,emoji:'🪑',desc:'Set of 2 cushion covers.',badge:'Sale',status:'active',images:['']}
];

const CACHE_KEYS = { cart: 'bostique_cart' };

function getCache(key) {
  if (typeof window === 'undefined') return null;
  const cached = localStorage.getItem(key);
  if (!cached) return null;
  try {
    const { data, timestamp } = JSON.parse(cached);
    return data;
  } catch { return null; }
}

function setCache(key, data) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
}

export default function ProductPage() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState('');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const cachedCart = getCache(CACHE_KEYS.cart) || [];
    setCartCount(cachedCart.reduce((sum, item) => sum + item.qty, 0));

    loadData();
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  async function loadData() {
    try {
      const prodsRes = await fetch('/api/products');
      const prods = await prodsRes.json();
      if (prods?.length) {
        const mapped = prods.map(p => ({...p, images: p.images || [p.image || '']}));
        setProducts(mapped);
      }
    } catch (e) {}
    setLoading(false);
  }

  useEffect(() => {
    const cachedProducts = getCache(CACHE_KEYS.cart.replace('cart', 'products'));
    const allProducts = cachedProducts || products;
    const productId = parseInt(Array.isArray(params.id) ? params.id[0] : params.id);
    const found = allProducts.find(p => p.id === productId);
    if (found) {
      setProduct(found);
      setSelectedImage(0);
    } else {
      const productId = parseInt(Array.isArray(params.id) ? params.id[0] : params.id);
      const fallback = fallbackProducts.find(p => p.id === productId);
      if (fallback) setProduct(fallback);
    }
    setLoading(false);
  }, [params.id]);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  function addToCart() {
    const cachedCart = getCache(CACHE_KEYS.cart) || [];
    const existing = cachedCart.find(item => item.id === product.id);
    let updatedCart;
    if (existing) {
      updatedCart = cachedCart.map(item => 
        item.id === product.id ? {...item, qty: item.qty + qty} : item
      );
    } else {
      updatedCart = [...cachedCart, {...product, qty}];
    }
    setCache(CACHE_KEYS.cart, updatedCart);
    showToast('✓ Added to bag!');
  }

  function handleWhatsAppOrder() {
    const message = `I'm interested in ${product.name} x${qty} - Total: ₹${product.price * qty}`;
    window.open(`https://wa.me/919084736334?text=${encodeURIComponent(message)}`, '_blank');
  }

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Product not found</h2>
        <button onClick={() => router.push('/')} style={{ marginTop: '20px', padding: '12px 24px', background: '#333', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Back to Shop
        </button>
      </div>
    );
  }

  const images = product.images || [];
  const hasMultipleImages = images.length > 1 && images[0];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  if (isMobile) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--color-cream-warm)' }}>
        <header style={{ background: 'var(--color-charcoal)', color: 'white', padding: '15px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer' }}>←</button>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', letterSpacing: '0.1em' }}>BOSTIQUE</span>
          <button onClick={() => router.push('/?cart=true')} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', position: 'relative', cursor: 'pointer' }}>
            🛒
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--color-cognac)', color: 'white', fontSize: '0.65rem', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cartCount}
              </span>
            )}
          </button>
        </header>

        <div style={{ padding: '20px' }}>
          <div style={{ position: 'relative', background: 'white', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px' }}>
            <div style={{ height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              {images[selectedImage] ? (
                <img src={images[selectedImage]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ fontSize: '5rem' }}>{product.emoji}</span>
              )}
              
              {hasMultipleImages && (
                <>
                  <button 
                    onClick={prevImage}
                    style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '36px', height: '36px', borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.9)', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                  >
                    ‹
                  </button>
                  <button 
                    onClick={nextImage}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', width: '36px', height: '36px', borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.9)', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                  >
                    ›
                  </button>
                  <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px' }}>
                    {images.filter(Boolean).map((_, idx) => (
                      <div 
                        key={idx}
                        style={{ width: '8px', height: '8px', borderRadius: '50%', background: selectedImage === idx ? 'var(--color-cognac)' : 'rgba(255,255,255,0.5)' }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            {product.badge && (
              <span style={{ position: 'absolute', top: '12px', left: '12px', background: product.badge === 'Sale' ? 'var(--color-error)' : 'var(--color-success)', color: 'white', padding: '6px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                {product.badge}
              </span>
            )}
          </div>

          {hasMultipleImages && (
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', overflowX: 'auto' }}>
              {images.filter(Boolean).map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', border: selectedImage === idx ? '2px solid var(--color-cognac)' : '2px solid transparent', flexShrink: 0, padding: 0 }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}

          <div style={{ background: 'white', borderRadius: '12px', padding: '20px' }}>
            <p style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{product.category}</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 400, marginBottom: '12px' }}>{product.name}</h1>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-cognac)', marginBottom: '20px' }}>₹{product.price.toLocaleString()}</p>
            
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
              {product.desc || product.description || 'Premium quality leather product from Bostique.'}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Quantity:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '4px' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: '32px', height: '32px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.2rem' }}>−</button>
                <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 600 }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ width: '32px', height: '32px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.2rem' }}>+</button>
              </div>
            </div>

            <button onClick={addToCart} style={{ width: '100%', padding: '14px', background: 'var(--color-charcoal)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', marginBottom: '12px' }}>
              Add to Bag - ₹{(product.price * qty).toLocaleString()}
            </button>
            
            <button onClick={handleWhatsAppOrder} style={{ width: '100%', padding: '14px', background: '#25D366', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>
              💬 Order on WhatsApp
            </button>
          </div>
        </div>

        {toast && (
          <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: 'var(--color-charcoal)', color: 'white', padding: '12px 24px', borderRadius: '8px', zIndex: 1000 }}>
            {toast}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-cream-warm)', padding: '40px 0' }}>
      <header style={{ background: 'var(--color-charcoal)', color: 'white', padding: '15px 0', position: 'sticky', top: 0, zIndex: 100, marginBottom: '40px' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ← Back
          </button>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', letterSpacing: '0.1em' }}>BOSTIQUE</span>
          <button onClick={() => router.push('/?cart=true')} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', position: 'relative', cursor: 'pointer' }}>
            🛒
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--color-cognac)', color: 'white', fontSize: '0.65rem', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
          <div>
            <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px', position: 'relative' }}>
              <div style={{ aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {images[selectedImage] ? (
                  <img src={images[selectedImage]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '10rem' }}>{product.emoji}</span>
                )}

                {hasMultipleImages && (
                  <>
                    <button 
                      onClick={prevImage}
                      style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '44px', height: '44px', borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.9)', cursor: 'pointer', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    >
                      ‹
                    </button>
                    <button 
                      onClick={nextImage}
                      style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', width: '44px', height: '44px', borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.9)', cursor: 'pointer', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    >
                      ›
                    </button>
                    <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
                      {images.filter(Boolean).map((_, idx) => (
                        <div 
                          key={idx}
                          style={{ width: '10px', height: '10px', borderRadius: '50%', background: selectedImage === idx ? 'var(--color-cognac)' : 'rgba(0,0,0,0.2)', cursor: 'pointer' }}
                          onClick={() => setSelectedImage(idx)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              {product.badge && (
                <span style={{ position: 'absolute', top: '20px', left: '20px', background: product.badge === 'Sale' ? 'var(--color-error)' : 'var(--color-success)', color: 'white', padding: '8px 16px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                  {product.badge}
                </span>
              )}
            </div>

            {/* Optional: Show thumbnails below for desktop */}
            {hasMultipleImages && !isMobile && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {images.filter(Boolean).map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    style={{ aspectRatio: '1', borderRadius: '10px', overflow: 'hidden', border: selectedImage === idx ? '3px solid var(--color-cognac)' : '3px solid transparent', padding: 0, cursor: 'pointer' }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>{product.category}</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 400, marginBottom: '16px', lineHeight: 1.2 }}>{product.name}</h1>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-cognac)', marginBottom: '32px' }}>₹{product.price.toLocaleString()}</p>
            
            <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: '32px' }}>
              {product.desc || product.description || 'Premium quality leather product from Bostique. Crafted with attention to detail and made from the finest materials.'}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <span style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>Quantity</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '6px' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: '40px', height: '40px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.3rem' }}>−</button>
                <span style={{ minWidth: '30px', textAlign: 'center', fontSize: '1.1rem', fontWeight: 600 }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ width: '40px', height: '40px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.3rem' }}>+</button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button onClick={addToCart} style={{ flex: 1, padding: '18px 32px', background: 'var(--color-charcoal)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>
                Add to Bag
              </button>
              <button onClick={handleWhatsAppOrder} style={{ padding: '18px 24px', background: '#25D366', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1.5rem', cursor: 'pointer' }}>
                💬
              </button>
            </div>

            <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(139, 69, 19, 0.05)', borderRadius: '10px', border: '1px solid var(--color-cognac)' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-cognac)', fontWeight: 500 }}>Free shipping on orders above ₹2000</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '8px' }}>Pan-India delivery • Quality assured • WhatsApp support</p>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: '30px', right: '30px', background: 'var(--color-charcoal)', color: 'white', padding: '14px 28px', borderRadius: '8px', zIndex: 1000 }}>
          {toast}
        </div>
      )}
    </div>
  );
}