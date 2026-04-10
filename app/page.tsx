'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Shop from './components/Shop';
import Featured from './components/Featured';
import Philosophy from './components/Philosophy';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import CartPanel from './components/CartPanel';
import UserLogin from './components/UserLogin';
import UserAccount from './components/UserAccount';
import Toast from './components/Toast';

const fallbackProducts = [
  {id:1,name:'Expedition Duffel',category:'Duffel Bag',category_id:1,price:3499,emoji:'🧳',desc:'Full-grain leather weekend bag.',badge:'New',status:'active',image:''},
  {id:2,name:'City Slicker Duffel',category:'Duffel Bag',category_id:1,price:2799,emoji:'🧳',desc:'Compact leather duffel.',badge:'',status:'active',image:''},
  {id:3,name:'Heritage Carry Tote',category:'Carry Bag',category_id:2,price:1899,emoji:'👜',desc:'Timeless everyday tote.',badge:'New',status:'active',image:''},
  {id:4,name:'Market Carry Bag',category:'Carry Bag',category_id:2,price:1299,emoji:'👜',desc:'Durable canvas and leather.',badge:'',status:'active',image:''},
  {id:5,name:'Urban Pro Backpack',category:'Backpack',category_id:3,price:2999,emoji:'🎒',desc:'Work-ready leather backpack.',badge:'New',status:'active',image:''},
  {id:6,name:'Trail Backpack',category:'Backpack',category_id:3,price:2199,emoji:'🎒',desc:'Adventure-ready backpack.',badge:'',status:'active',image:''},
  {id:7,name:'Cognac Cushion Cover',category:'Cushion Cover',category_id:4,price:899,emoji:'🛋️',desc:'Luxurious leather cushion.',badge:'New',status:'active',image:''},
  {id:8,name:'Tan Leather Cushion Pair',category:'Cushion Cover',category_id:4,price:1699,emoji:'🪑',desc:'Set of 2 cushion covers.',badge:'Sale',status:'active',image:''}
];

const fallbackCategories = [
  {id:1,name:'Duffel Bag',icon:'🧳'},{id:2,name:'Carry Bag',icon:'👜'},{id:3,name:'Backpack',icon:'🎒'},{id:4,name:'Cushion Cover',icon:'🛋️'}
];

const CACHE_KEYS = { products: 'bostique_products', categories: 'bostique_categories', cart: 'bostique_cart', user: 'bostique_user' };
const CACHE_DURATION = 15 * 60 * 1000;

function getCache(key) {
  if (typeof window === 'undefined') return null;
  const cached = localStorage.getItem(key);
  if (!cached) return null;
  try {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch { return null; }
}

function setCache(key, data) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
}

function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? JSON.parse(decodeURIComponent(match[2])) : null;
}

function setCookie(name, value, days = 30) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${expires};path=/;SameSite=Lax`;
}

export default function Home() {
  const [products, setProducts] = useState(fallbackProducts);
  const [categories, setCategories] = useState(fallbackCategories);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [showCart, setShowCart] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showUserAccount, setShowUserAccount] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState('');
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const cachedProducts = getCache(CACHE_KEYS.products);
    const cachedCategories = getCache(CACHE_KEYS.categories);
    const cachedCart = getCache(CACHE_KEYS.cart);
    const cookieUser = getCookie(CACHE_KEYS.user);
    
    if (cachedProducts) setProducts(cachedProducts);
    if (cachedCategories) setCategories(cachedCategories);
    if (cachedCart) setCart(cachedCart);
    if (cookieUser) setUser(cookieUser);
    
    loadData();
  }, []);

  useEffect(() => {
    setCache(CACHE_KEYS.cart, cart);
  }, [cart]);

  async function loadData() {
    try {
      const [catsRes, prodsRes] = await Promise.all([
        fetch('/api/categories', { next: { revalidate: 60 } }),
        fetch('/api/products', { next: { revalidate: 60 } })
      ]);
      
      const cats = await catsRes.json();
      const prods = await prodsRes.json();
      
      if (cats?.length) {
        setCategories(cats);
        setCache(CACHE_KEYS.categories, cats);
      }
      if (prods?.length) {
        const mapped = prods.map(p => ({...p, image: p.image || ''}));
        setProducts(mapped);
        setCache(CACHE_KEYS.products, mapped);
      }
    } catch (e) {
      console.error('Failed to load data:', e);
    }
    
    setLoading(false);
    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) loader.classList.add('out');
    }, 500);
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  function addToCart(product, qty = 1) {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? {...item, qty: item.qty + qty} : item
        );
      }
      return [...prev, {...product, qty}];
    });
    showToast(isMobile ? '✓ Added!' : '✓ Added to bag');
  }

  const updateCartQty = useCallback((id, delta) => {
    setCart(prev => prev.map(item => 
      item.id === id ? {...item, qty: Math.max(1, item.qty + delta)} : item
    ).filter(item => item.qty > 0));
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  function handleUserLogin(userData) {
    setUser(userData);
    setCookie(CACHE_KEYS.user, userData);
    setShowUserLogin(false);
    showToast('✓ Welcome back!');
  }

  function handleUserLogout() {
    setUser(null);
    setCookie(CACHE_KEYS.user, '', -1);
    setShowUserAccount(false);
    showToast('✓ Signed out');
  }

  function openProductModal(product) {
    setSelectedProduct(product);
  }

  function closeProductModal() {
    setSelectedProduct(null);
  }

  return (
    <div>
      {!loading && <div id="loader" className="out"></div>}
      {loading && (
        <div id="loader">
          <div className="loader-brand">BOSTIQUE</div>
          <div className="loader-line"></div>
          <p className="loader-sub">Luxury Carry Goods · Est. 2026</p>
        </div>
      )}

      <Nav 
        cartCount={cart.reduce((s, i) => s + i.qty, 0)} 
        onCartClick={() => setShowCart(true)}
        onUserClick={() => user ? setShowUserAccount(true) : setShowUserLogin(true)}
        user={user}
        isMobile={isMobile}
      />

      <Hero isMobile={isMobile} />
      <Categories categories={categories} onCategoryClick={(cat) => {setFilter(cat); document.getElementById('shop')?.scrollIntoView({behavior:'smooth'})}} isMobile={isMobile} />
      <Shop 
        products={products} 
        filter={filter} 
        onFilterChange={setFilter}
        onAddToCart={addToCart}
        onProductClick={openProductModal}
        isMobile={isMobile}
      />
      <Featured onAddToCart={addToCart} isMobile={isMobile} />
      <Philosophy isMobile={isMobile} />
      <Testimonials isMobile={isMobile} />
      <Footer isMobile={isMobile} />

      {showCart && (
        <CartPanel 
          cart={cart} 
          total={cartTotal}
          onClose={() => setShowCart(false)}
          onUpdateQty={updateCartQty}
          onRemove={removeFromCart}
          isMobile={isMobile}
        />
      )}

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          onClose={closeProductModal}
          onAddToCart={addToCart}
        />
      )}

      {showUserLogin && (
        <UserLogin 
          onClose={() => setShowUserLogin(false)}
          onLogin={handleUserLogin}
          showToast={showToast}
        />
      )}

      {showUserAccount && user && (
        <UserAccount 
          user={user}
          onClose={() => setShowUserAccount(false)}
          onLogout={handleUserLogout}
        />
      )}

      {toast && <Toast message={toast} />}
    </div>
  );
}