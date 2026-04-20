'use client';

import { useState, useEffect, useRef } from 'react';

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

const fallbackCategories = [
  {id:1,name:'Duffel Bag',icon:'🧳'},{id:2,name:'Carry Bag',icon:'👜'},{id:3,name:'Backpack',icon:'🎒'},{id:4,name:'Cushion Cover',icon:'🛋️'}
];

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const [products, setProducts] = useState(fallbackProducts);
  const [categories, setCategories] = useState(fallbackCategories);
  const [users, setUsers] = useState([]);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [prodForm, setProdForm] = useState({ id: null, name: '', category_id: '1', price: '', emoji: '', description: '', badge: '', status: 'active', images: [''] });
  const [catForm, setCatForm] = useState({ name: '', icon: '' });
  const [toast, setToast] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    try {
      const [catsRes, prodsRes, usersRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/products'),
        fetch('/api/users')
      ]);
      const cats = await catsRes.json();
      const prods = await prodsRes.json();
      const usersData = await usersRes.json();
      if (cats?.length) setCategories(cats);
      if (prods?.length) setProducts(prods);
      if (usersData?.length) setUsers(usersData);
    } catch (e) { 
      console.error('Load error:', e); 
    }
  }

  useEffect(() => {
    const savedAuth = localStorage.getItem('bostique_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  function handleLogin() {
    if (username === 'admin' && password === 'bostique2026') {
      setIsAuthenticated(true);
      localStorage.setItem('bostique_admin_auth', 'true');
      setError('');
    } else {
      setError('Invalid credentials');
    }
  }

  function handleLogout() {
    setIsAuthenticated(false);
    localStorage.removeItem('bostique_admin_auth');
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  function resetForm() {
    setProdForm({ id: null, name: '', category_id: '1', price: '', emoji: '', description: '', badge: '', status: 'active', images: [''] });
  }

  function editProduct(product) {
    setProdForm({
      id: product.id,
      name: product.name,
      category_id: String(product.category_id),
      price: String(product.price),
      emoji: product.emoji || '',
      description: product.desc || product.description || '',
      badge: product.badge || '',
      status: product.status,
      images: product.images || ['']
    });
    setActiveSection('add-product');
  }

  function openImageModal(product) {
    setSelectedProduct(product);
    setSelectedImageIndex(0);
    setShowImageModal(true);
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file || !selectedProduct) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = String(event.target.result);
      const updatedProducts = products.map(p => {
        if (p.id === selectedProduct.id) {
          const newImages = [...(p.images || [''])];
          newImages[selectedImageIndex] = String(base64);
          return { ...p, images: newImages };
        }
        return p;
      });
      setProducts(updatedProducts);
      showToast('Image uploaded!');
    };
    reader.readAsDataURL(file);
  }

  async function addMoreImages() {
    if (!selectedProduct) return;
    const updatedProducts = products.map(p => {
      if (p.id === selectedProduct.id) {
        return { ...p, images: [...(p.images || ['']), ''] };
      }
      return p;
    });
    setProducts(updatedProducts);
    setSelectedProduct({ ...selectedProduct, images: [...(selectedProduct.images || ['']), ''] });
    setSelectedImageIndex(selectedProduct.images?.length || 0);
  }

  async function removeImage(index: number) {
    if (!selectedProduct) return;
    const updatedProducts = products.map(p => {
      if (p.id === selectedProduct.id) {
        const newImages = (p.images || ['']).filter((_, i) => i !== index);
        return { ...p, images: newImages.length ? newImages : [''] };
      }
      return p;
    });
    setProducts(updatedProducts);
    setSelectedProduct({ ...selectedProduct, images: (selectedProduct.images || ['']).filter((_, i) => i !== index) });
    showToast('Image removed');
  }

  async function saveProduct() {
    if (!prodForm.name || !prodForm.price) {
      showToast('Please fill required fields');
      return;
    }
    
    const productData = {
      name: prodForm.name,
      category_id: parseInt(prodForm.category_id),
      price: parseInt(prodForm.price) || 0,
      emoji: prodForm.emoji,
      description: prodForm.description,
      badge: prodForm.badge,
      status: prodForm.status,
      images: prodForm.images,
      category: categories.find(c => c.id === parseInt(prodForm.category_id))?.name || 'Unknown'
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      const result = await res.json();
      
      if (result.success) {
        showToast('Product saved!');
        loadData();
      } else {
        showToast('Error: ' + (result.error || 'Unknown error'));
      }
    } catch (e) {
      showToast('Error saving product: ' + e.message);
    }
    
    resetForm();
    setActiveSection('products');
  }

  async function deleteProduct(id) {
    if (!confirm('Delete this product?')) return;
    
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      const result = await res.json();
      
      if (result.success) {
        showToast('Product deleted');
        loadData();
      } else {
        showToast('Error: ' + (result.error || 'Failed'));
      }
    } catch (e) {
      showToast('Error deleting product');
    }
  }

  async function deleteCategory(id) {
    if (!confirm('Delete this category?')) return;
    
    try {
      const res = await fetch(`/api/categories?id=${id}`, { method: 'DELETE' });
      const result = await res.json();
      
      if (result.success) {
        showToast('Category deleted');
        loadData();
      } else {
        showToast('Error: ' + (result.error || 'Failed'));
      }
    } catch (e) {
      showToast('Error deleting category');
    }
  }

  async function addCategory() {
    if (!catForm.name) return;
    const newCat = { name: catForm.name, icon: catForm.icon || '📦' };
    
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCat)
      });
      const result = await res.json();
      
      if (result.success) {
        showToast('Category added');
        loadData();
      } else {
        showToast('Error: ' + (result.error || 'Failed'));
      }
    } catch (e) {
      showToast('Error adding category');
    }
    
    setCatForm({ name: '', icon: '' });
  }

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: '350px' }}>
          <h2 style={{ marginBottom: '20px', textAlign: 'center', fontSize: '24px' }}>Admin Login</h2>
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '4px' }} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '4px' }} />
          {error && <p style={{ color: 'red', marginBottom: '15px', fontSize: '14px' }}>{error}</p>}
          <button onClick={handleLogin} style={{ width: '100%', padding: '12px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Sign In</button>
          <a href="/" style={{ display: 'block', textAlign: 'center', marginTop: '15px', color: '#666', fontSize: '14px' }}>← Back to Store</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ background: '#333', color: 'white', padding: isMobile ? '12px 15px' : '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isMobile && (
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer' }}>☰</button>
          )}
          <h1 style={{ fontSize: isMobile ? '1rem' : '20px' }}>Bostique Admin</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <a href="/" style={{ color: 'white', fontSize: isMobile ? '0.75rem' : '14px' }}>View Store →</a>
          <button onClick={handleLogout} style={{ color: 'white', fontSize: isMobile ? '0.75rem' : '14px', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.8 }}>Logout</button>
        </div>
      </header>
      
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)', position: 'relative' }}>
        {!isMobile && (
          <aside style={{ width: '220px', background: 'white', borderRight: '1px solid #ddd', padding: '20px 0', flexShrink: 0 }}>
            {['dashboard', 'products', 'add-product', 'categories', 'orders', 'users'].map(item => (
              <button key={item} onClick={() => { setActiveSection(item); if (item === 'add-product') resetForm(); }} style={{ display: 'block', width: '100%', padding: '12px 20px', textAlign: 'left', border: 'none', background: activeSection === item ? '#f0f0f0' : 'transparent', cursor: 'pointer', fontSize: '14px' }}>
                {item === 'dashboard' && '📊 '}Dashboard
                {item === 'products' && '📦 '}Products
                {item === 'add-product' && '➕ '}Add/Edit Product
                {item === 'categories' && '📁 '}Categories
                {item === 'orders' && '💬 '}Orders
                {item === 'users' && '👥 '}Users
              </button>
            ))}
          </aside>
        )}

        {isMobile && menuOpen && (
          <div style={{ position: 'fixed', top: '60px', left: 0, bottom: 0, width: '250px', background: 'white', boxShadow: '2px 0 10px rgba(0,0,0,0.1)', zIndex: 99, overflow: 'auto' }}>
            {['dashboard', 'products', 'add-product', 'categories', 'orders', 'users'].map(item => (
              <button key={item} onClick={() => { setActiveSection(item); setMenuOpen(false); if (item === 'add-product') resetForm(); }} style={{ display: 'block', width: '100%', padding: '15px 20px', textAlign: 'left', border: 'none', background: activeSection === item ? '#f0f0f0' : 'transparent', cursor: 'pointer', fontSize: '14px', borderBottom: '1px solid #eee' }}>
                {item === 'dashboard' && '📊 '}Dashboard
                {item === 'products' && '📦 '}Products
                {item === 'add-product' && '➕ '}Add/Edit Product
                {item === 'categories' && '📁 '}Categories
                {item === 'orders' && '💬 '}Orders
                {item === 'users' && '👥 '}Users
              </button>
            ))}
          </div>
        )}

        <main style={{ flex: 1, padding: isMobile ? '15px' : '30px', overflowY: 'auto' }}>
          {activeSection === 'dashboard' && (
            <div>
              <h2 style={{ marginBottom: '20px' }}>Dashboard</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{products.filter(p => p.status === 'active').length}</div>
                  <div style={{ color: '#666', fontSize: '14px' }}>Products</div>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{categories.length}</div>
                  <div style={{ color: '#666', fontSize: '14px' }}>Categories</div>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '32px', fontWeight: 'bold' }}>0</div>
                  <div style={{ color: '#666', fontSize: '14px' }}>Users</div>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '32px', fontWeight: 'bold' }}>+91 90847</div>
                  <div style={{ color: '#666', fontSize: '14px' }}>WhatsApp</div>
                </div>
              </div>
              
              <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>Recent Products</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                {products.slice(0, 4).map(p => (
                  <div key={p.id} style={{ background: 'white', padding: '15px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '50px', height: '50px', background: '#f5f5f5', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {p.images && p.images[0] ? <img src={p.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} /> : <span style={{ fontSize: '24px' }}>{p.emoji}</span>}
                    </div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: '14px' }}>{p.name}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>₹{p.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'products' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>All Products</h2>
                <button onClick={() => { resetForm(); setActiveSection('add-product'); }} style={{ padding: '10px 20px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+ Add Product</button>
              </div>
              <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ background: '#f5f5f5' }}>
                    <tr>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', width: '60px' }}>Image</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px' }}>Name</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px' }}>Category</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px' }}>Price</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px' }}>Status</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id} style={{ borderTop: '1px solid #eee' }}>
                        <td style={{ padding: '12px' }}>
                          <div style={{ width: '40px', height: '40px', background: '#f5f5f5', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => openImageModal(p)}>
                            {p.images && p.images[0] ? <img src={p.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} /> : <span style={{ fontSize: '18px' }}>📷</span>}
                          </div>
                        </td>
                        <td style={{ padding: '12px', fontWeight: 500 }}>{p.name}</td>
                        <td style={{ padding: '12px', color: '#666' }}>{p.category}</td>
                        <td style={{ padding: '12px' }}>₹{p.price.toLocaleString()}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ background: p.status === 'active' ? '#d4edda' : '#f8d7da', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                            {p.status === 'active' ? 'Active' : 'Draft'}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => editProduct(p)} style={{ background: '#007bff', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Edit</button>
                            <button onClick={() => deleteProduct(p.id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'add-product' && (
            <div>
              <h2 style={{ marginBottom: '20px' }}>{prodForm.id ? 'Edit Product' : 'Add Product'}</h2>
              <div style={{ background: 'white', padding: '25px', borderRadius: '8px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>Product Name *</label>
                    <input value={prodForm.name} onChange={e => setProdForm({...prodForm, name: e.target.value})} placeholder="e.g. Classic Leather Duffel" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>Category *</label>
                    <select value={prodForm.category_id} onChange={e => setProdForm({...prodForm, category_id: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>Price (₹) *</label>
                    <input type="number" value={prodForm.price} onChange={e => setProdForm({...prodForm, price: e.target.value})} placeholder="1999" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>Emoji Icon</label>
                    <input value={prodForm.emoji} onChange={e => setProdForm({...prodForm, emoji: e.target.value})} placeholder="🧳" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', fontWeight: '500' }}>Product Images (up to 4) - Click image to upload</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '15px' }}>
                    {prodForm.images.map((img, idx) => (
                      <div key={idx} style={{ position: 'relative', aspectRatio: '1', background: '#f5f5f5', borderRadius: '6px', overflow: 'hidden', border: '1px solid #ddd' }}>
                        {img ? (
                          <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999', fontSize: '12px' }}>{idx + 1}</div>
                        )}
                        <input 
                          type="file" 
                          accept="image/*"
                          id={`img-upload-${idx}`}
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const newImages = [...prodForm.images];
                                newImages[idx] = String(event.target.result);
                                setProdForm({...prodForm, images: newImages});
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <label 
                          htmlFor={`img-upload-${idx}`}
                          style={{ position: 'absolute', inset: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', color: 'white', opacity: 0, transition: 'opacity 0.2s' }}
                        onMouseEnter={function() { this.style.opacity = '1'; }}
                        onMouseLeave={function() { this.style.opacity = '0'; }}
                        >
                          📷 Upload
                        </label>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: '12px', color: '#666' }}>Tip: Click on each image box to upload from your device</p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>Description</label>
                  <textarea value={prodForm.description} onChange={e => setProdForm({...prodForm, description: e.target.value})} placeholder="Describe the product..." rows={4} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>Status</label>
                    <select value={prodForm.status} onChange={e => setProdForm({...prodForm, status: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>Badge (optional)</label>
                    <input value={prodForm.badge} onChange={e => setProdForm({...prodForm, badge: e.target.value})} placeholder="New / Sale / Limited" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={saveProduct} style={{ background: '#333', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '4px', cursor: 'pointer' }}>
                    {prodForm.id ? 'Update Product' : 'Save Product'}
                  </button>
                  {prodForm.id && <button onClick={resetForm} style={{ background: 'transparent', color: '#666', border: '1px solid #ddd', padding: '12px 24px', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'categories' && (
            <div>
              <h2 style={{ marginBottom: '20px' }}>Categories</h2>
              <div style={{ background: 'white', borderRadius: '8px', marginBottom: '20px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ background: '#f5f5f5' }}>
                    <tr><th style={{ padding: '12px', textAlign: 'left' }}>Icon</th><th style={{ padding: '12px', textAlign: 'left' }}>Category</th><th style={{ padding: '12px', textAlign: 'left' }}>Products</th><th style={{ padding: '12px', textAlign: 'left' }}>Action</th></tr>
                  </thead>
                  <tbody>
                    {categories.map(c => (
                      <tr key={c.id} style={{ borderTop: '1px solid #eee' }}>
                        <td style={{ padding: '12px', fontSize: '24px' }}>{c.icon}</td>
                        <td style={{ padding: '12px' }}>{c.name}</td>
                        <td style={{ padding: '12px' }}>{products.filter(p => p.category_id === c.id).length}</td>
                        <td style={{ padding: '12px' }}><button onClick={() => deleteCategory(c.id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
                <h3 style={{ marginBottom: '15px', fontSize: '16px' }}>Add Category</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input value={catForm.name} onChange={e => setCatForm({...catForm, name: e.target.value})} placeholder="Category name" style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
                  <input value={catForm.icon} onChange={e => setCatForm({...catForm, icon: e.target.value})} placeholder="Icon" style={{ width: '80px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
                  <button onClick={addCategory} style={{ background: '#333', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>Add</button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'orders' && (
            <div>
              <h2 style={{ marginBottom: '20px' }}>Orders</h2>
              <div style={{ background: 'white', padding: '30px', borderRadius: '8px', textAlign: 'center' }}>
                <p style={{ color: '#666', marginBottom: '15px' }}>Orders come through WhatsApp</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#25D366' }}>+91 90847 36334</p>
                <a href="https://wa.me/919084736334" target="_blank" style={{ display: 'inline-block', marginTop: '15px', background: '#25D366', color: 'white', padding: '10px 20px', borderRadius: '4px', textDecoration: 'none' }}>Open WhatsApp</a>
              </div>
            </div>
          )}

          {activeSection === 'users' && (
            <div>
              <h2 style={{ marginBottom: '20px' }}>Users ({users.length})</h2>
              {users.length === 0 ? (
                <div style={{ background: 'white', padding: '30px', borderRadius: '8px', textAlign: 'center', color: '#666' }}>No registered users yet</div>
              ) : (
                <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f5f5f5' }}>
                      <tr>
                        <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px' }}>ID</th>
                        <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px' }}>Name</th>
                        <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px' }}>Email</th>
                        <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px' }}>Phone</th>
                        <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px' }}>Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(u => (
                        <tr key={u.id} style={{ borderTop: '1px solid #eee' }}>
                          <td style={{ padding: '12px' }}>{u.id}</td>
                          <td style={{ padding: '12px', fontWeight: 500 }}>{u.name}</td>
                          <td style={{ padding: '12px', color: '#666' }}>{u.email}</td>
                          <td style={{ padding: '12px' }}>{u.phone || '-'}</td>
                          <td style={{ padding: '12px', fontSize: '0.85rem', color: '#666' }}>{u.created_at ? new Date(u.created_at).toLocaleDateString() : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {showImageModal && selectedProduct && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }} onClick={() => setShowImageModal(false)}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', maxWidth: '500px', width: '90%' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ marginBottom: '15px' }}>Manage Images - Click to Upload</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
              {(selectedProduct.images || ['']).map((img, idx) => (
                <div key={idx} style={{ position: 'relative', aspectRatio: '1', background: '#f5f5f5', borderRadius: '6px', overflow: 'hidden', border: selectedImageIndex === idx ? '2px solid #007bff' : '1px solid #ddd' }}>
                  {img ? (
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999', fontSize: '12px' }}>Empty</div>
                  )}
                  <input 
                    type="file" 
                    accept="image/*"
                    id={`modal-img-upload-${idx}`}
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const updatedProducts = products.map(p => {
                            if (p.id === selectedProduct.id) {
                              const newImages = [...(p.images || [''])];
                              newImages[idx] = String(event.target.result);
                              return { ...p, images: newImages };
                            }
                            return p;
                          });
                          setProducts(updatedProducts);
                          setSelectedProduct({ ...selectedProduct, images: updatedProducts.find(p => p.id === selectedProduct.id)?.images });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <label 
                    htmlFor={`modal-img-upload-${idx}`}
                    style={{ position: 'absolute', inset: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', color: 'white', opacity: 0, transition: 'opacity 0.2s' }}
                    onMouseEnter={function() { this.style.opacity = '1'; }}
                    onMouseLeave={function() { this.style.opacity = '0'; }}
                  >
                    📷
                  </label>
                  {(selectedProduct.images || []).length > 1 && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                      style={{ position: 'absolute', top: '2px', right: '2px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              {(selectedProduct.images || ['']).length < 4 && (
                <button 
                  onClick={addMoreImages}
                  style={{ aspectRatio: '1', background: '#f5f5f5', border: '2px dashed #ddd', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '24px' }}
                >
                  +
                </button>
              )}
            </div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>Click on each image box to upload from your device</p>
            <button 
              onClick={() => setShowImageModal(false)}
              style={{ width: '100%', padding: '12px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Done
            </button>
          </div>
        </div>
      )}

      {toast && <div style={{ position: 'fixed', bottom: '20px', right: '20px', background: '#333', color: 'white', padding: '12px 24px', borderRadius: '4px', zIndex: 9999 }}>{toast}</div>}
    </div>
  );
}