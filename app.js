const API_BASE = '';

let fallbackProducts = [
  {id:1,name:'Expedition Duffel',category:'Duffel Bag',category_id:1,price:3499,emoji:'🧳',desc:'Full-grain leather weekend bag.',badge:'New',status:'active',image:''},
  {id:2,name:'City Slicker Duffel',category:'Duffel Bag',category_id:1,price:2799,emoji:'🧳',desc:'Compact leather duffel.',badge:'',status:'active',image:''},
  {id:3,name:'Heritage Carry Tote',category:'Carry Bag',category_id:2,price:1899,emoji:'👜',desc:'Timeless everyday tote.',badge:'New',status:'active',image:''},
  {id:4,name:'Market Carry Bag',category:'Carry Bag',category_id:2,price:1299,emoji:'👜',desc:'Durable canvas and leather.',badge:'',status:'active',image:''},
  {id:5,name:'Urban Pro Backpack',category:'Backpack',category_id:3,price:2999,emoji:'🎒',desc:'Work-ready leather backpack.',badge:'New',status:'active',image:''},
  {id:6,name:'Trail Backpack',category:'Backpack',category_id:3,price:2199,emoji:'🎒',desc:'Adventure-ready backpack.',badge:'',status:'active',image:''},
  {id:7,name:'Cognac Cushion Cover',category:'Cushion Cover',category_id:4,price:899,emoji:'🛋️',desc:'Luxurious leather cushion.',badge:'New',status:'active',image:''},
  {id:8,name:'Tan Leather Cushion Pair',category:'Cushion Cover',category_id:4,price:1699,emoji:'🪑',desc:'Set of 2 cushion covers.',badge:'Sale',status:'active',image:''}
];

let fallbackCategories = [
  {id:1,name:'Duffel Bag',icon:'🧳'},{id:2,name:'Carry Bag',icon:'👜'},{id:3,name:'Backpack',icon:'🎒'},{id:4,name:'Cushion Cover',icon:'🛋️'}
];

const WA = '919084736334';
let categories = [];
let products = [];
let cart = [];
let mPid = -1, mQtyN = 1;
let activeFilter = 'All';
let isAdmin = false;
let appliedDiscount = null;
let discountAmount = 0;

// === API FUNCTIONS ===
async function fetchAPI(url, opts = {}) {
  try {
    const res = await fetch(url, { ...opts, credentials: 'include' });
    if (!res.ok && res.status !== 401 && res.status !== 404) throw new Error('HTTP ' + res.status);
    if (res.status === 404) return null;
    return await res.json();
  } catch (e) { console.error('API Error:', url, e.message); return null; }
}

async function loadData() {
  console.log('Loading data...');
  let cats = await fetchAPI('/api/categories');
  let prods = await fetchAPI('/api/products');
  
  console.log('API products:', prods?.map ? prods.map(p => ({id:p.id, name:p.name, image: p.image?.substring(0,30)})) : 'no products');
  
  // Check localStorage for saved products (has custom images)
  const savedProds = localStorage.getItem('bostique_products');
  if (savedProds) {
    try {
      const parsed = JSON.parse(savedProds);
      if (parsed && parsed.length > 0) {
        console.log('Using local products with images:', parsed.filter(p => p.image));
        prods = parsed;
      }
    } catch(e) {}
  }
  
  // Ensure all products have image field
  if (prods && prods.length > 0) {
    prods = prods.map(p => ({...p, image: p.image || ''}));
  }
  
  if (!cats || !cats.length) { 
    const savedCats = localStorage.getItem('bostique_categories');
    if (savedCats) {
      try { cats = JSON.parse(savedCats); } catch(e) {}
    }
    if (!cats || !cats.length) cats = fallbackCategories; 
  }
  if (!prods || !prods.length) { prods = fallbackProducts; }
  
  categories = cats;
  products = prods;
  
  console.log('Products loaded:', products.length, products.filter(p => p.image).length, 'with images');
  
  // Check user session
  await checkUserSession();
  
  renderProds();
  renderAdmCats();
  updateDash();
  
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('out');
  }, 500);
}

// === PRODUCTS ===
const catBgs = {
  'Duffel Bag':'linear-gradient(145deg,#EDE6D8,#D9CFBE)', 
  'Carry Bag':'linear-gradient(145deg,#E8E0D4,#D4CBBC)', 
  'Backpack':'linear-gradient(145deg,#DDD8CC,#CCC5B8)', 
  'Cushion Cover':'linear-gradient(145deg,#F0E8DC,#E0D5C5)'
};

function renderProds() {
  const g = document.getElementById('productsGrid');
  if (!g) return;
  if (!products || !products.length) {
    g.innerHTML = '<p style="color:var(--stone);grid-column:1/-1;padding:40px 0">Loading products...</p>';
    return;
  }
  const list = activeFilter === 'All' ? products.filter(p=>p.status==='active') : products.filter(p=>p.category===activeFilter && p.status==='active');
  g.innerHTML = list.map(p => {
    const hasImage = p.image && p.image.length > 0;
    console.log('Rendering product:', p.id, p.name, 'has image:', hasImage, p.image ? p.image.substring(0,50) : 'none');
    return `
    <div class="product-card">
      <div class="prod-img" style="background:${catBgs[p.category]||'var(--bone)'}">
        ${p.badge ? `<span class="prod-badge-tag">${p.badge}</span>` : ''}
        <div class="prod-img-inner">
          ${hasImage 
            ? `<img src="${p.image}" style="max-width:80%;max-height:80%;object-fit:contain" alt="${p.name}">` 
            : `<span class="prod-emoji">${p.emoji || '🛍️'}</span>`}
        </div>
        <div class="prod-overlay">
          <button class="quick-view" onclick="openModal(${p.id})">Quick View</button>
          <button class="add-bag" onclick="addToCart(${p.id})">Add to Bag</button>
        </div>
      </div>
      <div class="prod-info">
        <p class="prod-cat-tag">${p.category}</p>
        <h3 class="prod-name">${p.name}</h3>
        <div class="prod-price-row">
          <span class="prod-price">₹${p.price.toLocaleString('en-IN')}</span>
          <button class="prod-wishlist" onclick="openModal(${p.id})">↗</button>
        </div>
      </div>
    </div>
  `}).join('');
  if(!list.length) g.innerHTML = '<p style="color:var(--stone);grid-column:1/-1;padding:40px 0">No products in this category.</p>';
}

function filterProds(cat) {
  activeFilter = cat;
  document.querySelectorAll('.filter-tab').forEach(b => {
    b.classList.toggle('on', b.textContent.trim().toLowerCase() === (cat==='All'?'all':cat.toLowerCase().split(' ')[0]) || (cat==='All'&&b.textContent.trim()==='All'));
  });
  renderProds();
}

// === CART ===
function addToCart(id, qty=1) {
  const p = products.find(p=>p.id===id); if(!p) return;
  const ex = cart.find(c=>c.id===id);
  if(ex) ex.qty += qty; else cart.push({...p, qty});
  updateCartUI(); showToast(`${p.emoji}  ${p.name} added to bag`);
}

function updateCartUI() {
  const n = cart.reduce((s,c)=>s+c.qty,0);
  const el = document.getElementById('cartCount');
  if(el) { el.textContent = n; el.classList.toggle('show', n>0); }
  renderCartBody();
}

function renderCartBody() {
  const b = document.getElementById('cartBody'), f = document.getElementById('cartFoot');
  if(!b || !f) return;
  if(!cart.length) {
    b.innerHTML = `<div class="cart-empty-state"><div class="cart-empty-icon">🛍</div><p class="cart-empty-text">Your bag is empty</p></div>`;
    f.style.display='none'; return;
  }
  f.style.display='block';
  const total = cart.reduce((s,c)=>s+c.price*c.qty,0) - discountAmount;
  b.innerHTML = cart.map((c,i)=>`
    <div class="cart-row">
      <div class="cart-row-img">${c.emoji}</div>
      <div style="flex:1">
        <p class="cr-name">${c.name}</p>
        <p class="cr-price">₹${c.price.toLocaleString('en-IN')}</p>
        <div class="cr-qty">
          <button class="cr-q" onclick="chQty(${i},-1)">−</button>
          <span class="cr-qv">${c.qty}</span>
          <button class="cr-q" onclick="chQty(${i},1)">+</button>
        </div>
      </div>
      <button class="cr-rm" onclick="rmItem(${i})">✕</button>
    </div>
  `).join('');
  if(appliedDiscount) {
    b.innerHTML += `<div style="padding:12px 0;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;font-size:.82rem;color:var(--sienna)"><span>Discount (${appliedDiscount})</span><span>-₹${discountAmount.toLocaleString('en-IN')}</span></div>`;
  }
  const t = document.getElementById('cartTotal');
  if(t) t.textContent = '₹' + total.toLocaleString('en-IN');
}

function chQty(i,d){ cart[i].qty=Math.max(1,cart[i].qty+d); updateCartUI(); }
function rmItem(i){ cart.splice(i,1); updateCartUI(); }
function openCart(){ document.getElementById('cartPanel').classList.add('on'); document.getElementById('overlay').classList.add('on'); renderCartBody(); }
function closeCart(){ document.getElementById('cartPanel').classList.remove('on'); document.getElementById('overlay').classList.remove('on'); }

async function applyDiscountCode() {
  const code = document.getElementById('discountCode')?.value.trim();
  if(!code) return;
  const total = cart.reduce((s,c)=>s+c.price*c.qty,0);
  const res = await fetchAPI('/api/validate-discount', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ code, cartTotal: total }) });
  if(res?.valid) {
    appliedDiscount = code.toUpperCase();
    discountAmount = res.discountAmount;
    showToast(`✓ Code applied: -₹${discountAmount.toLocaleString('en-IN')}`);
    renderCartBody();
  } else {
    showToast(res?.error || 'Invalid code');
  }
}

function orderWA() {
  if(!cart.length) return;
  const total = cart.reduce((s,c)=>s+c.price*c.qty,0) - discountAmount;
  const lines = cart.map(c=>`• ${c.name} ×${c.qty} = ₹${(c.price*c.qty).toLocaleString('en-IN')}`).join('%0A');
  let msg = `Hi Bostique! I'd like to order:%0A%0A${lines}%0A%0A*Total: ₹${total.toLocaleString('en-IN')}*`;
  if(appliedDiscount) msg += `%0A(Discount: -₹${discountAmount.toLocaleString('en-IN')})`;
  msg += `%0A%0APlease confirm availability, payment, and shipping. Thank you!`;
  window.open(`https://wa.me/${WA}?text=${msg}`,'_blank');
  
  fetchAPI('/api/orders', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({
    items: cart.map(c=>({name:c.name,qty:c.qty,price:c.price})),
    total, discount_code: appliedDiscount, discount_amount: discountAmount, wa_message: msg.replace(/%0A/g,'\n')
  })});
}

// === MODAL ===
function openModal(id) {
  const p = products.find(p=>p.id===id); if(!p) return;
  mPid=id; mQtyN=1;
  document.getElementById('modalArt').innerHTML = `${p.badge?`<span class="modal-art-badge">${p.badge}</span>`:''}${p.image ? `<img src="${p.image}" style="max-width:80%;object-fit:contain">` : `<span style="font-size:7rem">${p.emoji}</span>`}`;
  document.getElementById('modalArt').style.background = catBgs[p.category]||'var(--bone)';
  document.getElementById('modalCat').textContent = p.category;
  document.getElementById('modalName').textContent = p.name;
  document.getElementById('modalPrice').textContent = '₹'+p.price.toLocaleString('en-IN');
  document.getElementById('modalDesc').textContent = p.desc;
  document.getElementById('mQtyVal').textContent = 1;
  document.getElementById('modalWA').href = `https://wa.me/${WA}?text=Hi%20Bostique!%20I%27m%20interested%20in%3A%0A%0A*${encodeURIComponent(p.name)}*%20-%20%E2%82%B9${p.price}`;
  document.getElementById('modalBg').classList.add('on');
}
function closeModal(e){ if(e.target===document.getElementById('modalBg')) document.getElementById('modalBg').classList.remove('on'); }
function mQty(d){ mQtyN=Math.max(1,mQtyN+d); document.getElementById('mQtyVal').textContent=mQtyN; }
function addFromModal(){
  if(mPid<0) return;
  addToCart(mPid, mQtyN);
  document.getElementById('modalBg').classList.remove('on');
  openCart();
}

// === TOAST ===
function showToast(msg){ const t=document.getElementById('toast'); t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2600); }

// === MOBILE NAV ===
function toggleMobileNav(){
  const ul=document.querySelector('.nav-links');
  const open=ul.style.display==='flex';
  ul.style.cssText=open?'':`display:flex;flex-direction:column;position:fixed;top:60px;left:0;right:0;background:rgba(250,250,248,.97);backdrop-filter:blur(12px);padding:28px;gap:20px;border-bottom:1px solid var(--line);z-index:499`;
}

// === ADMIN ===
async function openAdminLogin(){ document.getElementById('admin-login').classList.add('on'); }

async function doLogin(){
  const u=document.getElementById('lu').value, p=document.getElementById('lp').value;
  const res = await fetchAPI('/api/admin/login', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ username:u, password:p }) });
  
  if(res && res.success) {
    document.getElementById('admin-login').classList.remove('on');
    document.getElementById('admin-panel').classList.add('on');
    isAdmin = true;
    renderAdmProds(); renderAdmCats(); updateDash();
  }
  else if (!res && u==='bostique' && p==='admin2026') {
    isAdmin = true;
    document.getElementById('admin-login').classList.remove('on');
    document.getElementById('admin-panel').classList.add('on');
    renderAdmProds(); renderAdmCats(); updateDash();
  }
  else { document.getElementById('lerr').style.display='block'; }
}

async function logout() {
  await fetchAPI('/api/admin/logout', { method: 'POST' });
  isAdmin = false;
  document.getElementById('admin-panel').classList.remove('on');
}

function admShow(id,el){
  document.querySelectorAll('.adm-section').forEach(s=>s.classList.remove('on'));
  document.getElementById('sec-'+id).classList.add('on');
  document.querySelectorAll('.adm-nav-item').forEach(m=>m.classList.remove('on'));
  if(el) el.classList.add('on');
}

async function updateDash(){
  const stats = await fetchAPI('/api/stats') || {};
  const dp=document.getElementById('dProd'); if(dp) dp.textContent=stats.products || 0;
  const dc=document.getElementById('dCat'); if(dc) dc.textContent=stats.categories || 0;
  const du=document.getElementById('dUsers'); if(du) du.textContent=stats.users || 0;
  // Load users table
  renderAdmUsers();
}

async function renderAdmProds(){
  const tb=document.getElementById('admProdBody'); if(!tb) return;
  const prods = await fetchAPI('/api/products') || [];
  tb.innerHTML=prods.map(p=>`
    <tr>
      <td style="font-size:1.4rem">${p.image ? '📷' : p.emoji}</td>
      <td><strong>${p.name}</strong>${p.badge?` <span style="background:var(--sand);color:var(--ink);font-size:.58rem;padding:2px 8px;font-weight:600">${p.badge}</span>`:''}</td>
      <td>${p.category}</td>
      <td>₹${p.price.toLocaleString('en-IN')}</td>
      <td><span class="${p.status==='active'?'status-on':'status-off'}">${p.status}</span></td>
      <td style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn-adm" style="padding:6px 14px;font-size:.62rem" onclick="editProd(${p.id})">Edit</button>
        <button class="btn-adm btn-red" style="padding:6px 14px;font-size:.62rem" onclick="delProd(${p.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}

async function saveProd(){
  const id=parseInt(document.getElementById('epid').value);
  const name=document.getElementById('epname').value.trim();
  const category_id=parseInt(document.getElementById('epcat').value);
  const price=parseInt(document.getElementById('epprice').value);
  const emoji=document.getElementById('epemoji').value.trim()||'🛍️';
  const desc=document.getElementById('epdesc').value.trim();
  const status=document.getElementById('epstatus').value;
  const badge=document.getElementById('epbadge').value.trim();
  const image=document.getElementById('epimgdata').value;
  
  console.log('Saving product:', { id, name, category_id, price, emoji, desc, status, badge, imageLen: image?.length });
  
  if(!name||!price){showToast('⚠ Fill in Name and Price');return;}
  
  // For static version (Vercel fallback - localStorage)
  if (id === -1 && !categories.find(c=>c.id === category_id)) {
    // Static mode - add to local products array
    const newId = products.length > 0 ? Math.max(...products.map(p=>p.id)) + 1 : 1;
    const cat = categories.find(c=>c.id === category_id) || categories[0];
    products.push({
      id: newId,
      name,
      category: cat.name,
      category_id,
      price,
      emoji,
      desc,
      badge,
      status,
      image
    });
    showToast('✓ Product saved (static)');
    localStorage.setItem('bostique_products', JSON.stringify(products));
    resetProdForm(); renderAdmProds(); renderProds(); updateDash();
    return;
  } else if (id > 0) {
    const idx = products.findIndex(p=>p.id===id);
    if(idx >= 0) {
      const cat = categories.find(c=>c.id === category_id) || categories[0];
      products[idx] = {...products[idx], name, category: cat.name, category_id, price, emoji, desc, badge, status, image};
      showToast('✓ Product updated (static)');
      localStorage.setItem('bostique_products', JSON.stringify(products));
      resetProdForm(); renderAdmProds(); renderProds(); updateDash();
      return;
    }
  }
  
  // Try API
  const apiRes = id===-1 
    ? await fetchAPI('/api/products', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({name,category_id,price,emoji,description:desc,badge,status,image}) })
    : await fetchAPI(`/api/products/${id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({name,category_id,price,emoji,description:desc,badge,status,image}) });
  
  console.log('Save product API response:', apiRes);
  
  if(apiRes && apiRes.success === true) {
    showToast('✓ Product saved');
    resetProdForm(); renderAdmProds(); renderProds(); updateDash();
  } else {
    console.error('API save failed:', apiRes);
    showToast('API not available - saved locally');
  }
}

function editProd(id){
  const p=products.find(p=>p.id===id); 
  if(!p) {
    console.log('Product not found, id:', id, 'products:', products);
    return;
  }
  document.getElementById('epid').value=id;
  document.getElementById('epname').value=p.name;
  document.getElementById('epcat').value=p.category_id;
  document.getElementById('epprice').value=p.price;
  document.getElementById('epemoji').value=p.emoji;
  document.getElementById('epdesc').value=p.desc || '';
  document.getElementById('epstatus').value=p.status;
  document.getElementById('epbadge').value=p.badge||'';
  document.getElementById('epimgdata').value=p.image||'';
  if(p.image){
    const img=document.getElementById('epimgpreview');
    img.src=p.image;img.style.display='block';
  }
  document.getElementById('addProdTitle').textContent='Edit Product';
  admShow('addprod',document.querySelectorAll('.adm-nav-item')[2]);
  console.log('Editing product:', p);
}

async function delProd(id){
  if(!confirm('Delete this product?')) return;
  products = products.filter(p=>p.id !== id);
  localStorage.setItem('bostique_products', JSON.stringify(products));
  cart = cart.filter(c=>c.id !== id);
  renderAdmProds(); renderProds(); updateDash(); showToast('Product deleted');
}

function resetProdForm(){
  document.getElementById('epid').value=-1;
  ['epname','epprice','epemoji','epdesc','epbadge'].forEach(i=>document.getElementById(i).value='');
  document.getElementById('epstatus').value='active';
  document.getElementById('addProdTitle').textContent='Add Product';
  document.getElementById('epimgdata').value='';
  const p=document.getElementById('epimgpreview');p.src='';p.style.display='none';
  document.getElementById('epimg').value='';
}

function previewImg(input){
  if(input.files&&input.files[0]){
    const file = input.files[0];
    if (file.size > 500000) {
      showToast('Image too large (max 500KB)');
      return;
    }
    const r=new FileReader();
    r.onload=e=>{
      const imgData = e.target.result;
      document.getElementById('epimgdata').value=imgData;
      const p=document.getElementById('epimgpreview');
      p.src=imgData;p.style.display='block';
      console.log('Image loaded, size:', imgData.length);
    };
    r.readAsDataURL(file);
  }
}

async function renderAdmCats(){
  const tb=document.getElementById('admCatBody'); if(!tb) return;
  const cats = await fetchAPI('/api/categories') || categories;
  const prodCounts = {};
  products.forEach(p => {
    prodCounts[p.category_id] = (prodCounts[p.category_id] || 0) + 1;
  });
  tb.innerHTML=cats.map((c,i)=>`
    <tr>
      <td style="font-size:1.4rem">${c.icon}</td>
      <td><strong>${c.name}</strong></td>
      <td>${prodCounts[c.id] || 0}</td>
      <td><button class="btn-adm btn-red" style="padding:6px 14px;font-size:.62rem" onclick="delCat(${c.id})">Remove</button></td>
    </tr>
  `).join('');
  const sel=document.getElementById('epcat');
  if(sel) sel.innerHTML=categories.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
}

async function addCat(){
  const name=document.getElementById('ncname').value.trim();
  const icon=document.getElementById('ncicon').value.trim()||'🛍️';
  if(!name){showToast('Enter a category name');return;}
  
  // Check if category already exists
  if(categories.find(c=>c.name.toLowerCase() === name.toLowerCase())) {
    showToast('Category already exists');
    return;
  }
  
  const newId = categories.length > 0 ? Math.max(...categories.map(c=>c.id)) + 1 : 1;
  categories.push({ id: newId, name, icon, productCount: 0 });
  localStorage.setItem('bostique_categories', JSON.stringify(categories));
  
  showToast(`"${name}" added`);
  renderAdmCats();
}

async function delCat(id){
  if(!confirm('Delete this category?')) return;
  categories = categories.filter(c=>c.id !== id);
  localStorage.setItem('bostique_categories', JSON.stringify(categories));
  renderAdmCats(); showToast('Category removed');
}

async function renderAdmDiscs(){
  const tb=document.getElementById('admDiscBody'); if(!tb) return;
  const discs = await fetchAPI('/api/discounts') || [];
  tb.innerHTML=discs.map(d=>`
    <tr>
      <td style="font-weight:600">${d.code}</td>
      <td>${d.type==='percent'?'%':'₹'}</td>
      <td>${d.value}</td>
      <td>₹${d.min_order}</td>
      <td>${d.used_count}/${d.max_uses}</td>
      <td><span class="${d.active?'status-on':'status-off'}">${d.active?'Active':'Inactive'}</span></td>
      <td style="display:flex;gap:8px">
        <button class="btn-adm" style="padding:6px 14px;font-size:.62rem" onclick="toggleDisc(${d.id},${d.active?0:1})">${d.active?'Disable':'Enable'}</button>
        <button class="btn-adm btn-red" style="padding:6px 14px;font-size:.62rem" onclick="delDisc(${d.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}

async function renderAdmUsers(){
  const tb=document.getElementById('admUsersBody'); if(!tb) return;
  const users = await fetchAPI('/api/users') || [];
  tb.innerHTML=users.map(u=>`
    <tr>
      <td><strong>${u.name}</strong></td>
      <td>${u.email}</td>
      <td>${u.phone || '-'}</td>
      <td>${u.created_at ? new Date(u.created_at).toLocaleDateString() : 'N/A'}</td>
      <td><button class="btn-adm btn-red" style="padding:6px 14px;font-size:.62rem" onclick="showToast('User management coming soon')">Manage</button></td>
    </tr>
  `).join('');
  if(!users.length) tb.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--stone)">No users registered yet</td></tr>';
}

async function saveDiscount(){
  const code=document.getElementById('dcode').value.trim();
  const type=document.getElementById('dtype').value;
  const value=parseInt(document.getElementById('dvalue').value);
  const min_order=parseInt(document.getElementById('dmin').value)||0;
  const max_uses=parseInt(document.getElementById('dmax').value)||100;
  const expires_at=document.getElementById('dexp').value||null;
  if(!code||!value){showToast('Enter code and value');return;}
  const res = await fetchAPI('/api/discounts', { method: 'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({code,type,value,min_order,max_uses,expires_at}) });
  if(res?.success){ showToast('✓ Discount created'); renderAdmDiscs(); ['dcode','dvalue','dmin','dmax','dexp'].forEach(i=>document.getElementById(i).value=''); }
  else{showToast(res?.error||'Error creating discount');}
}

async function toggleDisc(id,active){
  await fetchAPI(`/api/discounts/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify({active}) });
  renderAdmDiscs();
}

async function delDisc(id){
  if(!confirm('Delete this discount?')) return;
  await fetchAPI(`/api/discounts/${id}`, { method:'DELETE' });
  renderAdmDiscs(); showToast('Discount deleted');
}

// === CURSOR ===
const dot = document.getElementById('cdot'), ring = document.getElementById('cring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; dot.style.left=mx+'px'; dot.style.top=my+'px'; });
(function animRing() { rx+=(mx-rx)*.12; ry+=(my-ry)*.12; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(animRing); })();

// === USER AUTH ===
let currentUser = null;

function openUserLogin() {
  document.getElementById('user-login').style.display = 'flex';
}
function closeUserLogin() {
  document.getElementById('user-login').style.display = 'none';
  document.getElementById('userErr').style.display = 'none';
}
function showUserSignup() {
  document.getElementById('userLoginForm').style.display = 'none';
  document.getElementById('userSignupForm').style.display = 'block';
}
function showUserLogin() {
  document.getElementById('userSignupForm').style.display = 'none';
  document.getElementById('userLoginForm').style.display = 'block';
}
function closeUserAccount() {
  document.getElementById('user-account').style.display = 'none';
}

async function doUserLogin() {
  const email = document.getElementById('userEmail').value.trim();
  const password = document.getElementById('userPass').value;
  const errEl = document.getElementById('userErr');
  
  if (!email || !password) {
    errEl.textContent = 'Please enter email and password';
    errEl.style.display = 'block';
    return;
  }
  
  const res = await fetchAPI('/api/login', { 
    method: 'POST', 
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({ email, password }) 
  });
  
  if (res?.success) {
    currentUser = res.user;
    localStorage.setItem('bostique_user', JSON.stringify(res.user));
    closeUserLogin();
    updateUserUI();
    showToast(`Welcome back, ${res.user.name}!`);
  } else {
    errEl.textContent = res?.error || 'Login failed';
    errEl.style.display = 'block';
  }
}

async function doUserSignup() {
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const password = document.getElementById('regPass').value;
  const errEl = document.getElementById('userErr');
  
  if (!name || !email || !password) {
    errEl.textContent = 'Please fill in all required fields';
    errEl.style.display = 'block';
    return;
  }
  
  const res = await fetchAPI('/api/register', { 
    method: 'POST', 
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({ name, email, phone, password }) 
  });
  
  if (res?.success) {
    // Auto login after registration
    currentUser = { id: res.userId, name, email };
    localStorage.setItem('bostique_user', JSON.stringify(currentUser));
    closeUserLogin();
    updateUserUI();
    showToast(`Welcome to Bostique, ${name}!`);
  } else {
    errEl.textContent = res?.error || 'Registration failed';
    errEl.style.display = 'block';
  }
}

async function userLogout() {
  await fetchAPI('/api/logout', { method: 'POST' });
  currentUser = null;
  localStorage.removeItem('bostique_user');
  closeUserAccount();
  updateUserUI();
  showToast('Signed out successfully');
}

async function checkUserSession() {
  // First try localStorage
  const saved = localStorage.getItem('bostique_user');
  if (saved) {
    try {
      currentUser = JSON.parse(saved);
    } catch(e) {}
  }
  
  // Then try API (won't work on Vercel without backend)
  try {
    const res = await fetch('/api/user', { credentials: 'include' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.loggedIn) {
        currentUser = data.user;
        localStorage.setItem('bostique_user', JSON.stringify(data.user));
      }
    }
  } catch(e) {
    // API not available - will use localStorage only
    console.log('Using local user session');
  }
  
  updateUserUI();
}

function updateUserUI() {
  const btn = document.getElementById('userBtn');
  if (btn) {
    if (currentUser?.name && currentUser.name !== 'bostique') {
      btn.textContent = currentUser.name.split(' ')[0];
      btn.onclick = openUserAccount;
      btn.setAttribute('onclick', ''); // Clear inline handler
      btn.addEventListener('click', openUserAccount);
    } else {
      btn.textContent = '👤 Account';
      btn.onclick = openUserLogin;
    }
  }
}

function openUserAccount() {
  document.getElementById('userNameDisplay').textContent = currentUser?.email || currentUser?.name || '';
  document.getElementById('user-account').style.display = 'flex';
}

// === INIT ===
console.log('Initializing Bostique...');
loadData().then(() => {
  console.log('Data loaded:', { products: products.length, categories: categories.length });
  document.getElementById('loader').classList.add('out');
}).catch(e => console.error('Load error:', e));