'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';

const fallbackProducts = [
  {id:1,name:'Expedition Duffel',category:'Duffel Bag',category_id:1,price:3499,emoji:'🧳',desc:'Full-grain leather weekend bag.',badge:'New',status:'active',images:['']},
  {id:2,name:'City Slicker Duffel',category:'Duffel Bag',category_id:1,price:2799,emoji:'🧳',desc:'Compact leather duffel.',badge:'',status:'active',images:['']},
  {id:3,name:'Heritage Carry Tote',category:'Carry Bag',category_id:2,price:1899,emoji:'👜',desc:'Timeless everyday tote.',badge:'New',status:'active',images:['']},
  {id:4,name:'Market Carry Bag',category:'Carry Bag',category_id:2,price:1299,emoji:'👜',desc:'Durable canvas and leather.',badge:'',status:'active',images:['']},
  {id:5,name:'Urban Pro Backpack',category:'Backpack',category_id:3,price:2999,emoji:'🎒',desc:'Work-ready leather backpack.',badge:'New',status:'active',images:['']},
  {id:6,name:'Trail Backpack',category:'Backpack',category_id:3,price:2199,emoji:'🎒',desc:'Adventure-ready backpack.',badge:'',status:'active',images:['']},
  {id:7,name:'Cognac Cushion Cover',category:'Cushion Cover',category_id:4,price:899,emoji:'🛋️',desc:'Luxurious leather cushion.',badge:'New',status:'active',images:['']},
  {id:8,name:'Tan Leather Cushion Pair',category:'Cushion Cover',category_id:4,price:1699,emoji:'🪑',desc:'Set of 2 cushion covers.',badge:'Sale',status:'active',images:['']}
];

const CACHE_KEYS = { cart: 'bostique_cart', products: 'bostique_products' };

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
    const cachedProducts = getCache(CACHE_KEYS.products);
    const allProducts = cachedProducts || products;
    const productId = parseInt(Array.isArray(params.id) ? params.id[0] : params.id);
    const found = allProducts.find(p => p.id === productId);
    if (found) {
      setProduct(found);
      setSelectedImage(0);
    } else {
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

  const recommendedProducts = products.filter(p => p.id !== product?.id).slice(0, 4);

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-white)' }}><div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-gold)' }}>Loading...</div></div>;
  }

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--color-white)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>Product not found</h2>
        <button onClick={() => router.push('/')} style={{ marginTop: '20px', padding: '12px 24px', background: 'var(--color-black)', color: 'white', border: 'none', fontSize: '0.8rem', letterSpacing: '0.1em', cursor: 'pointer' }}>
          Back to Shop
        </button>
      </div>
    );
  }

  const images = product.images || [];
  const hasMultipleImages = images.length > 1 && images[0];

  const nextImage = () => setSelectedImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + images.length) % images.length);

  if (isMobile) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--color-white)' }}>
        <header style={{ background: 'var(--color-black)', color: 'white', padding: '15px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer' }}>←</button>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', letterSpacing: '0.1em' }}>BOSTIQUE</span>
          <button onClick={() => router.push('/cart')} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', position: 'relative', cursor: 'pointer' }}>
            🛒
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--color-gold)', color: 'var(--color-black)', fontSize: '0.55rem', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
                {cartCount}
              </span>
            )}
          </button>
        </header>

        <div style={{ padding: '20px' }}>
          <div style={{ position: 'relative', background: 'var(--color-gray-50)', borderRadius: '0', overflow: 'hidden', marginBottom: '20px' }}>
            <div style={{ height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              {images[selectedImage] ? (
                <motion.img 
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={images[selectedImage]} 
                  alt={product.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                <span style={{ fontSize: '5rem' }}>{product.emoji}</span>
              )}
              
              {hasMultipleImages && (
                <>
                  <button 
                    onClick={prevImage}
                    style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.9)', cursor: 'pointer', fontSize: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.15)' }}
                  >
                    ‹
                  </button>
                  <button 
                    onClick={nextImage}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.9)', cursor: 'pointer', fontSize: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.15)' }}
                  >
                    ›
                  </button>
                  <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
                    {images.filter(Boolean).map((_, idx) => (
                      <div 
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        style={{ width: '8px', height: '8px', borderRadius: '50%', background: selectedImage === idx ? 'var(--color-gold)' : 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'all 0.3s ease' }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            {product.badge && (
              <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'var(--color-gold)', color: 'var(--color-black)', padding: '6px 12px', borderRadius: '0', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {product.badge}
              </span>
            )}
          </div>

          {hasMultipleImages && (
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
              {images.filter(Boolean).map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  style={{ width: '60px', height: '60px', borderRadius: '4px', overflow: 'hidden', border: selectedImage === idx ? '2px solid var(--color-gold)' : '2px solid transparent', flexShrink: 0, padding: 0, cursor: 'pointer', transition: 'border-color 0.3s ease' }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}

          <div style={{ background: 'var(--color-white)', padding: '0' }}>
            <p style={{ fontSize: '0.7rem', color: 'var(--color-gold)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>{product.category}</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 400, marginBottom: '8px', color: 'var(--color-black)' }}>{product.name}</h1>
            <p style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--color-black)', marginBottom: '20px' }}>₹{product.price.toLocaleString()}</p>
            
            <p style={{ fontSize: '0.9rem', color: 'var(--color-gray-500)', lineHeight: 1.7, marginBottom: '24px' }}>
              {product.desc || product.description || 'Premium quality leather product from Bostique.'}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-gray-500)' }}>Qty:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid var(--color-gray-200)', padding: '4px' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: '36px', height: '36px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--color-black)' }}>−</button>
                <span style={{ minWidth: '28px', textAlign: 'center', fontWeight: 600, fontSize: '1rem' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ width: '36px', height: '36px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--color-black)' }}>+</button>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={addToCart} 
              style={{ width: '100%', padding: '16px', background: 'var(--color-black)', color: 'white', border: 'none', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', marginBottom: '12px' }}
            >
              Add to Bag - ₹{(product.price * qty).toLocaleString()}
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWhatsAppOrder} 
              style={{ width: '100%', padding: '16px', background: '#25D366', color: 'white', border: 'none', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}
            >
              Order via WhatsApp
            </motion.button>
          </div>
        </div>

        {recommendedProducts.length > 0 && (
          <section style={{ padding: '40px 20px', background: 'var(--color-gray-50)', marginTop: '20px' }}>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--color-gold)', textTransform: 'uppercase', marginBottom: '16px' }}>You May Also Like</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 400, color: 'var(--color-black)', marginBottom: '20px' }}>Recommended</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {recommendedProducts.map(p => (
                <div key={p.id} onClick={() => router.push(`/product/${p.id}`)} style={{ cursor: 'pointer' }}>
                  <div style={{ background: 'var(--color-white)', borderRadius: '4px', overflow: 'hidden', marginBottom: '10px' }}>
                    <div style={{ aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-gray-50)' }}>
                      {p.images && p.images[0] ? (
                        <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ fontSize: '2rem' }}>{p.emoji}</span>
                      )}
                    </div>
                  </div>
                  <p style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-black)', marginBottom: '4px' }}>{p.name}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-gray-500)' }}>₹{p.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: 'var(--color-black)', color: 'white', padding: '14px 28px', zIndex: 1000, fontSize: '0.8rem', fontWeight: 500 }}
          >
            {toast}
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-white)' }}>
      <header style={{ background: 'var(--color-black)', color: 'white', padding: '20px 0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'white', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ← Back
          </button>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', letterSpacing: '0.15em' }}>BOSTIQUE</span>
          <button onClick={() => router.push('/cart')} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', position: 'relative', cursor: 'pointer' }}>
            🛒
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--color-gold)', color: 'var(--color-black)', fontSize: '0.55rem', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="container" style={{ padding: '60px var(--space-6)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'start' }}>
          <div>
            <motion.div 
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{ background: 'var(--color-gray-50)', borderRadius: '4px', overflow: 'hidden', marginBottom: '20px', position: 'relative' }}
            >
              <div style={{ aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {images[selectedImage] ? (
                  <img src={images[selectedImage]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '10rem' }}>{product.emoji}</span>
                )}

                {hasMultipleImages && (
                  <>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={prevImage}
                      style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', width: '48px', height: '48px', borderRadius: '50%', border: 'none', background: 'var(--color-white)', cursor: 'pointer', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
                    >
                      ‹
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={nextImage}
                      style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', width: '48px', height: '48px', borderRadius: '50%', border: 'none', background: 'var(--color-white)', cursor: 'pointer', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
                    >
                      ›
                    </motion.button>
                    <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px' }}>
                      {images.filter(Boolean).map((_, idx) => (
                        <motion.div 
                          key={idx}
                          onClick={() => setSelectedImage(idx)}
                          whileHover={{ scale: 1.2 }}
                          style={{ width: '10px', height: '10px', borderRadius: '50%', background: selectedImage === idx ? 'var(--color-gold)' : 'rgba(0,0,0,0.2)', cursor: 'pointer', transition: 'all 0.3s ease' }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              {product.badge && (
                <span style={{ position: 'absolute', top: '20px', left: '20px', background: 'var(--color-gold)', color: 'var(--color-black)', padding: '10px 18px', borderRadius: '0', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {product.badge}
                </span>
              )}
            </motion.div>

            {hasMultipleImages && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {images.filter(Boolean).map((img, idx) => (
                  <motion.button 
                    key={idx}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedImage(idx)}
                    style={{ aspectRatio: '1', borderRadius: '4px', overflow: 'hidden', border: selectedImage === idx ? '2px solid var(--color-gold)' : '2px solid transparent', padding: 0, cursor: 'pointer', transition: 'border-color 0.3s ease' }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ position: 'sticky', top: '100px' }}
          >
            <p style={{ fontSize: '0.7rem', color: 'var(--color-gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>{product.category}</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.75rem', fontWeight: 400, marginBottom: '16px', lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--color-black)' }}>{product.name}</h1>
            <p style={{ fontSize: '2rem', fontWeight: 500, color: 'var(--color-black)', marginBottom: '32px' }}>₹{product.price.toLocaleString()}</p>
            
            <p style={{ fontSize: '1rem', color: 'var(--color-gray-500)', lineHeight: 1.9, marginBottom: '32px' }}>
              {product.desc || product.description || 'Premium quality leather product from Bostique. Crafted with attention to detail and made from the finest materials. Each piece is designed to age beautifully and become a treasured part of your journey.'}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-gray-500)', letterSpacing: '0.05em' }}>Quantity</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid var(--color-gray-200)', padding: '6px' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: '44px', height: '44px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.3rem', color: 'var(--color-black)' }}>−</button>
                <span style={{ minWidth: '32px', textAlign: 'center', fontSize: '1.1rem', fontWeight: 600 }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ width: '44px', height: '44px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.3rem', color: 'var(--color-black)' }}>+</button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(201, 169, 98, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                onClick={addToCart} 
                style={{ flex: 1, padding: '20px 40px', background: 'var(--color-black)', color: 'white', border: 'none', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' }}
              >
                Add to Bag
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, background: '#20BD5A' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsAppOrder} 
                style={{ padding: '20px 28px', background: '#25D366', color: 'white', border: 'none', fontSize: '1.3rem', cursor: 'pointer' }}
              >
                💬
              </motion.button>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ padding: '24px', background: 'var(--color-gray-50)', borderRadius: '4px', borderLeft: '3px solid var(--color-gold)' }}
            >
              <p style={{ fontSize: '0.85rem', color: 'var(--color-black)', fontWeight: 500, marginBottom: '8px' }}>✓ Free shipping on orders above ₹2000</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-gray-500)', marginBottom: '4px' }}>✓ Pan-India delivery</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-gray-500)', marginBottom: '4px' }}>✓ Quality assured with 1-year warranty</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-gray-500)' }}>✓ WhatsApp support available</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {recommendedProducts.length > 0 && (
        <section style={{ padding: '100px 48px', background: 'var(--color-gray-50)', marginTop: '40px' }}>
          <div className="container">
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.25em', color: 'var(--color-gold)', textTransform: 'uppercase', marginBottom: '12px' }}>You May Also Like</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 400, color: 'var(--color-black)', marginBottom: '48px', letterSpacing: '-0.02em' }}>Recommended Products</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
              {recommendedProducts.map((p, idx) => (
                <motion.div 
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => router.push(`/product/${p.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ background: 'var(--color-white)', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
                    <div style={{ aspectRatio: '4/5', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-white)' }}>
                      {p.images && p.images[0] ? (
                        <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} />
                      ) : (
                        <span style={{ fontSize: '4rem' }}>{p.emoji}</span>
                      )}
                    </div>
                  </div>
                  <p style={{ fontSize: '0.65rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>{p.category}</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 400, color: 'var(--color-black)', marginBottom: '8px' }}>{p.name}</p>
                  <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--color-black)' }}>₹{p.price.toLocaleString()}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {toast && (
        <motion.div 
          initial={{ opacity: 0, y: 20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          style={{ position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', background: 'var(--color-black)', color: 'white', padding: '16px 32px', borderRadius: '4px', zIndex: 1000, fontSize: '0.85rem', fontWeight: 500 }}
        >
          {toast}
        </motion.div>
      )}
    </div>
  );
}