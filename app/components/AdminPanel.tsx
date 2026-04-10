'use client';

import { useState } from 'react';

export default function AdminPanel({ products, categories, onClose, onProductsChange, onCategoriesChange, showToast }) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Product form state
  const [prodForm, setProdForm] = useState({
    name: '', category_id: '1', price: '', emoji: '', description: '', badge: '', status: 'active', image: ''
  });

  // Category form state
  const [catForm, setCatForm] = useState({ name: '', icon: '' });

  const stats = {
    products: products.filter(p => p.status === 'active').length,
    categories: categories.length,
    users: 0,
    orders: 0
  };

  async function saveProduct() {
    const productData = {
      ...prodForm,
      category_id: parseInt(String(prodForm.category_id)),
      price: parseInt(prodForm.price) || 0,
      category: categories.find(c => c.id === parseInt(String(prodForm.category_id)))?.name || 'Unknown'
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      const result = await res.json();
      
      if (result.success) {
        const newProduct = { ...productData, id: result.id, status: 'active', image: '' };
        onProductsChange([...products, newProduct]);
        showToast('✓ Product saved');
        resetProdForm();
      }
    } catch (e) {
      // Fallback: add locally
      const newProduct = { ...productData, id: Date.now(), status: 'active', image: '' };
      onProductsChange([...products, newProduct]);
      showToast('✓ Product saved (local)');
      resetProdForm();
    }
  }

  function resetProdForm() {
    setProdForm({ name: '', category_id: '1', price: '', emoji: '', description: '', badge: '', status: 'active', image: '' });
    setEditingProduct(null);
  }

  async function addCategory() {
    if (!catForm.name) return;
    const newCat = { id: Date.now(), name: catForm.name, icon: catForm.icon || '📦' };
    onCategoriesChange([...categories, newCat]);
    setCatForm({ name: '', icon: '' });
    showToast('✓ Category added');
  }

  async function deleteProduct(id) {
    onProductsChange(products.filter(p => p.id !== id));
    showToast('✓ Product deleted');
  }

  return (
    <div id="admin-panel" className="on">
      <div className="adm-nav">
        <div className="adm-logo">BOSTIQUE <span style={{fontSize:'.6rem',letterSpacing:'.3em',color:'rgba(200,169,122,0.5)'}}>ADMIN</span></div>
        <button className="adm-exit" onClick={onClose}>Exit Admin</button>
      </div>
      <div className="adm-layout">
        <div className="adm-nav-side">
          <div className={`adm-nav-item ${activeSection === 'dashboard' ? 'on' : ''}`} onClick={() => setActiveSection('dashboard')}>📊 Dashboard</div>
          <div className={`adm-nav-item ${activeSection === 'products' ? 'on' : ''}`} onClick={() => setActiveSection('products')}>📦 Products</div>
          <div className={`adm-nav-item ${activeSection === 'addprod' ? 'on' : ''}`} onClick={() => setActiveSection('addprod')}>＋ Add Product</div>
          <div className={`adm-nav-item ${activeSection === 'categories' ? 'on' : ''}`} onClick={() => setActiveSection('categories')}>🗂 Categories</div>
          <div className={`adm-nav-item ${activeSection === 'orders' ? 'on' : ''}`} onClick={() => setActiveSection('orders')}>💬 Orders</div>
          <div className={`adm-nav-item ${activeSection === 'discounts' ? 'on' : ''}`} onClick={() => setActiveSection('discounts')}>🏷️ Discounts</div>
          <div className={`adm-nav-item ${activeSection === 'users' ? 'on' : ''}`} onClick={() => setActiveSection('users')}>👥 Users</div>
        </div>
        <div className="adm-content">
          {activeSection === 'dashboard' && (
            <div className="adm-section on">
              <div className="adm-header"><h2 className="adm-title">Dashboard</h2></div>
              <div className="adm-stats">
                <div className="adm-stat"><div className="big">{stats.products}</div><div className="lbl">Products</div></div>
                <div className="adm-stat"><div className="big">{stats.categories}</div><div className="lbl">Categories</div></div>
                <div className="adm-stat"><div className="big">{stats.users}</div><div className="lbl">Users</div></div>
                <div className="adm-stat"><div className="big">+91 90847</div><div className="lbl">WhatsApp</div></div>
              </div>
            </div>
          )}

          {activeSection === 'products' && (
            <div className="adm-section">
              <div className="adm-header"><h2 className="adm-title">All Products</h2></div>
              <div className="adm-card" style={{overflowX:'auto'}}>
                <table className="adm-table">
                  <thead><tr><th>Icon</th><th>Name</th><th>Category</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id}>
                        <td>{p.emoji}</td>
                        <td>{p.name}</td>
                        <td>{p.category}</td>
                        <td>₹{p.price}</td>
                        <td>{p.status}</td>
                        <td><button className="btn-adm" style={{background:'#C0392B',padding:'4px 8px',fontSize:'.7rem'}} onClick={() => deleteProduct(p.id)}>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'addprod' && (
            <div className="adm-section">
              <div className="adm-header"><h2 className="adm-title">Add Product</h2></div>
              <div className="adm-card">
                <div className="adm-form">
                  <div className="adm-row">
                    <div className="adm-fg">
                      <label>Product Name *</label>
                      <input value={prodForm.name} onChange={e => setProdForm({...prodForm, name: e.target.value})} placeholder="e.g. Classic Leather Duffel" />
                    </div>
                    <div className="adm-fg">
                      <label>Category *</label>
                      <select value={prodForm.category_id} onChange={e => setProdForm({...prodForm, category_id: e.target.value})}>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="adm-row">
                    <div className="adm-fg">
                      <label>Price (₹) *</label>
                      <input type="number" value={prodForm.price} onChange={e => setProdForm({...prodForm, price: e.target.value})} placeholder="1999" />
                    </div>
                    <div className="adm-fg">
                      <label>Emoji Icon</label>
                      <input value={prodForm.emoji} onChange={e => setProdForm({...prodForm, emoji: e.target.value})} placeholder="🧳" />
                    </div>
                  </div>
                  <div className="adm-fg">
                    <label>Description</label>
                    <textarea value={prodForm.description} onChange={e => setProdForm({...prodForm, description: e.target.value})} placeholder="Describe the product..."></textarea>
                  </div>
                  <div className="adm-row">
                    <div className="adm-fg">
                      <label>Status</label>
                      <select value={prodForm.status} onChange={e => setProdForm({...prodForm, status: e.target.value})}>
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                    <div className="adm-fg">
                      <label>Badge (optional)</label>
                      <input value={prodForm.badge} onChange={e => setProdForm({...prodForm, badge: e.target.value})} placeholder="New / Sale / Limited" />
                    </div>
                  </div>
                  <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                    <button className="btn-adm" onClick={saveProduct}>Save Product</button>
                    <button className="btn-adm" style={{background:'transparent',color:'var(--stone)',border:'1px solid var(--line)'}} onClick={resetProdForm}>Reset</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'categories' && (
            <div className="adm-section">
              <div className="adm-header"><h2 className="adm-title">Categories</h2></div>
              <div className="adm-card" style={{overflowX:'auto'}}>
                <table className="adm-table">
                  <thead><tr><th>Icon</th><th>Category</th><th>Products</th></tr></thead>
                  <tbody>
                    {categories.map(c => (
                      <tr key={c.id}>
                        <td>{c.icon}</td>
                        <td>{c.name}</td>
                        <td>{products.filter(p => p.category_id === c.id).length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="adm-card" style={{marginTop:20}}>
                <h3 style={{fontFamily:'var(--f-display)',fontSize:'1.1rem',marginBottom:18}}>Add Category</h3>
                <div style={{display:'flex',gap:12,alignItems:'flex-end',flexWrap:'wrap'}}>
                  <div className="adm-fg" style={{flex:1,minWidth:140}}>
                    <label>Name</label>
                    <input value={catForm.name} onChange={e => setCatForm({...catForm, name: e.target.value})} placeholder="e.g. Wallets" />
                  </div>
                  <div className="adm-fg" style={{width:90}}>
                    <label>Icon</label>
                    <input value={catForm.icon} onChange={e => setCatForm({...catForm, icon: e.target.value})} placeholder="👛" />
                  </div>
                  <button className="btn-adm" onClick={addCategory}>Add</button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'orders' && (
            <div className="adm-section">
              <div className="adm-header"><h2 className="adm-title">Orders</h2></div>
              <div className="adm-card">
                <p style={{color:'var(--stone)',lineHeight:1.8,marginBottom:24,fontSize:'.9rem'}}>All orders are processed via WhatsApp. When customers check out, they're redirected to WhatsApp with a pre-filled order message.</p>
                <div style={{background:'var(--bone)',padding:'20px 24px',borderLeft:'3px solid #25D366',marginBottom:20}}>
                  <p style={{fontSize:'.65rem',letterSpacing:'.2em',textTransform:'uppercase',color:'var(--stone)',marginBottom:6}}>WhatsApp Business Number</p>
                  <p style={{fontSize:'1.4rem',fontWeight:600,color:'#25D366'}}>+91 90847 36334</p>
                </div>
                <a href="https://wa.me/919084736334" target="_blank" className="btn-adm" style={{display:'inline-block',textDecoration:'none',background:'#25D366',color:'white'}}>Open WhatsApp Business</a>
              </div>
            </div>
          )}

          {activeSection === 'discounts' && (
            <div className="adm-section">
              <div className="adm-header"><h2 className="adm-title">Discount Codes</h2></div>
              <div className="adm-card">
                <p style={{color:'var(--stone)'}}>Discount management coming soon...</p>
              </div>
            </div>
          )}

          {activeSection === 'users' && (
            <div className="adm-section">
              <div className="adm-header"><h2 className="adm-title">Registered Users</h2></div>
              <div className="adm-card">
                <p style={{color:'var(--stone)'}}>Users management coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}