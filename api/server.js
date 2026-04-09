const fs = require('fs');

const DB_FILE = '/tmp/bostique.json';

function loadDB() {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    }
  } catch(e) {}
  return {
    products: [
      {id:1,name:'Expedition Duffel',category:'Duffel Bag',category_id:1,price:3499,emoji:'🧳',desc:'Full-grain leather weekend bag.',badge:'New',image:'',status:'active'},
      {id:2,name:'City Slicker Duffel',category:'Duffel Bag',category_id:1,price:2799,emoji:'🧳',desc:'Compact leather duffel.',badge:'',image:'',status:'active'},
      {id:3,name:'Heritage Carry Tote',category:'Carry Bag',category_id:2,price:1899,emoji:'👜',desc:'Timeless everyday tote.',badge:'New',image:'',status:'active'},
      {id:4,name:'Market Carry Bag',category:'Carry Bag',category_id:2,price:1299,emoji:'👜',desc:'Durable canvas and leather.',badge:'',image:'',status:'active'},
      {id:5,name:'Urban Pro Backpack',category:'Backpack',category_id:3,price:2999,emoji:'🎒',desc:'Work-ready leather backpack.',badge:'New',image:'',status:'active'},
      {id:6,name:'Trail Backpack',category:'Backpack',category_id:3,price:2199,emoji:'🎒',desc:'Adventure-ready backpack.',badge:'',image:'',status:'active'},
      {id:7,name:'Cognac Cushion Cover',category:'Cushion Cover',category_id:4,price:899,emoji:'🛋️',desc:'Luxurious leather cushion.',badge:'New',image:'',status:'active'},
      {id:8,name:'Tan Leather Cushion Pair',category:'Cushion Cover',category_id:4,price:1699,emoji:'🪑',desc:'Set of 2 cushion covers.',badge:'Sale',image:'',status:'active'}
    ],
    categories: [
      {id:1,name:'Duffel Bag',icon:'🧳'},
      {id:2,name:'Carry Bag',icon:'👜'},
      {id:3,name:'Backpack',icon:'🎒'},
      {id:4,name:'Cushion Cover',icon:'🛋️'}
    ],
    users: [],
    discounts: [],
    orders: [],
    nextProdId: 9,
    nextCatId: 5
  };
}

function saveDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data));
  } catch(e) {}
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => resolve(body));
  });
}

module.exports = async (req, res) => {
  const db = loadDB();
  const { method, url, headers } = req;
  
  // Strip query string from URL
  const path = (headers['x-forwarded-path'] || url).split('?')[0];
  
  // Add unique response header to identify this function
  res.setHeader('X-Bostique-API', 'v2');

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  if (method === 'OPTIONS') return res.status(200).end();

  console.log('REQ:', method, path, 'url:', url);

  // /api/categories - GET
  if (path === '/api/categories' && method === 'GET') {
    return res.json(db.categories.map(c => ({...c, productCount: db.products.filter(p => p.category_id === c.id && p.status === 'active').length})));
  }

  // /api/products - GET
  if (path === '/api/products' && method === 'GET') {
    return res.json(db.products.map(p => {
      const cat = db.categories.find(c => c.id === p.category_id);
      return {...p, category: cat ? cat.name : 'Unknown'};
    }));
  }

  // Test endpoint for product creation
  if (path === '/api/add-product' && method === 'POST') {
    const body = await parseBody(req);
    const p = JSON.parse(body);
    const newProd = { id: db.nextProdId++, ...p, image: p.image || '' };
    db.products.push(newProd);
    saveDB(db);
    console.log('Created product via /api/add-product:', newProd.id, newProd.name);
    return res.json({ success: true, id: newProd.id });
  }

  // /api/products - POST (create)
  if (path === '/api/products' && method === 'POST') {
    const body = await parseBody(req);
    const p = JSON.parse(body);
    const newProd = { id: db.nextProdId++, ...p, image: p.image || '' };
    db.products.push(newProd);
    saveDB(db);
    console.log('Created product:', newProd.id, newProd.name);
    return res.json({ success: true, id: newProd.id });
  }

  // /api/products/:id - PUT
  if (path.match(/^\/api\/products\/\d+$/) && method === 'PUT') {
    const id = parseInt(path.split('/').pop());
    const body = await parseBody(req);
    const data = JSON.parse(body);
    const idx = db.products.findIndex(p => p.id === id);
    if (idx >= 0) {
      db.products[idx] = { ...db.products[idx], ...data };
      saveDB(db);
      console.log('Updated product:', id);
    }
    return res.json({ success: true });
  }

  // /api/products/:id - DELETE
  if (path.match(/^\/api\/products\/\d+$/) && method === 'DELETE') {
    const id = parseInt(path.split('/').pop());
    db.products = db.products.filter(p => p.id !== id);
    saveDB(db);
    console.log('Deleted product:', id);
    return res.json({ success: true });
  }

  // /api/stats - GET
  if (path === '/api/stats' && method === 'GET') {
    return res.json({
      products: db.products.filter(p => p.status === 'active').length,
      categories: db.categories.length,
      users: db.users.length,
      orders: db.orders.length,
      discounts: db.discounts.filter(d => d.active).length
    });
  }

  // /api/users - GET
  if (path === '/api/users' && method === 'GET') {
    return res.json(db.users.map(u => ({...u, created_at: new Date().toISOString()})));
  }

  // /api/register - POST
  if (path === '/api/register' && method === 'POST') {
    const body = await parseBody(req);
    const { name, email, phone, password } = JSON.parse(body);
    if (db.users.find(u => u.email === email)) {
      return res.status(400).json({ success: false, error: 'Email already registered' });
    }
    const user = { id: db.users.length + 1, name, email, phone, password: Buffer.from(password).toString('base64'), created_at: new Date().toISOString() };
    db.users.push(user);
    saveDB(db);
    return res.json({ success: true, userId: user.id });
  }

  // /api/login - POST
  if (path === '/api/login' && method === 'POST') {
    const body = await parseBody(req);
    const { email, password } = JSON.parse(body);
    const user = db.users.find(u => u.email === email && u.password === Buffer.from(password).toString('base64'));
    if (!user) return res.status(401).json({ success: false, error: 'Invalid credentials' });
    return res.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
  }

  console.log('NOT FOUND:', path);
  res.status(404).json({ error: 'Not found', path });
};