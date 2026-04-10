'use client';

import { useState, useEffect } from 'react';
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
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
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

export default function Home() {
  const [products, setProducts] = useState(fallbackProducts);
  const [categories, setCategories] = useState(fallbackCategories);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [showCart, setShowCart] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showUserAccount, setShowUserAccount] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [catsRes, prodsRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/products')
      ]);
      
      const cats = await catsRes.json();
      const prods = await prodsRes.json();
      
      if (cats?.length) setCategories(cats);
      if (prods?.length) setProducts(prods.map(p => ({...p, image: p.image || ''})));
    } catch (e) {
      console.error('Failed to load data:', e);
    }
    
    setLoading(false);
    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) loader.classList.add('out');
    }, 800);
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
    showToast('✓ Added to bag');
  }

  function updateCartQty(id, delta) {
    setCart(prev => prev.map(item => 
      item.id === id ? {...item, qty: Math.max(1, item.qty + delta)} : item
    ).filter(item => item.qty > 0));
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Admin functions
  function handleAdminLogin(success) {
    setShowAdminLogin(!success);
    setShowAdminPanel(success);
    setIsAdmin(success);
  }

  // User functions
  function handleUserLogin(userData) {
    setUser(userData);
    setShowUserLogin(false);
  }

  function handleUserLogout() {
    setUser(null);
    setShowUserAccount(false);
  }

  // Modal function
  function openProductModal(product) {
    setSelectedProduct(product);
  }

  function closeProductModal() {
    setSelectedProduct(null);
  }

  return (
    <div>
      {/* Loader */}
      {!loading && <div id="loader" className="out"></div>}
      {loading && (
        <div id="loader">
          <div className="loader-brand">BOSTIQUE</div>
          <div className="loader-line"></div>
          <p className="loader-sub">Luxury Carry Goods · Est. 2026</p>
        </div>
      )}

      {/* Cursor */}
      <div className="cursor-dot" id="cdot"></div>
      <div className="cursor-ring" id="cring"></div>

      <Nav 
        cartCount={cart.reduce((s, i) => s + i.qty, 0)} 
        onCartClick={() => setShowCart(true)}
        onAdminClick={() => setShowAdminLogin(true)}
        onUserClick={() => user ? setShowUserAccount(true) : setShowUserLogin(true)}
        user={user}
      />

      <Hero />
      <Categories categories={categories} onCategoryClick={(cat) => {setFilter(cat); document.getElementById('shop')?.scrollIntoView({behavior:'smooth'})}} />
      <Shop 
        products={products} 
        filter={filter} 
        onFilterChange={setFilter}
        onAddToCart={addToCart}
        onProductClick={openProductModal}
      />
      <Featured onAddToCart={addToCart} />
      <Philosophy />
      <Testimonials />
      <Footer />

      {/* Modals and Panels */}
      {showCart && (
        <CartPanel 
          cart={cart} 
          total={cartTotal}
          onClose={() => setShowCart(false)}
          onUpdateQty={updateCartQty}
          onRemove={removeFromCart}
        />
      )}

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          onClose={closeProductModal}
          onAddToCart={addToCart}
        />
      )}

      {showAdminLogin && (
        <AdminLogin 
          onClose={() => setShowAdminLogin(false)}
          onLogin={handleAdminLogin}
        />
      )}

      {showAdminPanel && (
        <AdminPanel 
          products={products}
          categories={categories}
          onClose={() => {setShowAdminPanel(false); setIsAdmin(false)}}
          onProductsChange={setProducts}
          onCategoriesChange={setCategories}
          showToast={showToast}
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