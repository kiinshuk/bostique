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

module.exports = (req, res) => {
  const db = loadDB();
  const { method, url } = req;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (method === 'OPTIONS') return res.status(200).end();

  if (url === '/api/categories') {
    return res.json(db.categories.map(c => ({...c, productCount: db.products.filter(p => p.category_id === c.id && p.status === 'active').length})));
  }

  if (url === '/api/products') {
    return res.json(db.products.map(p => {
      const cat = db.categories.find(c => c.id === p.category_id);
      return {...p, category: cat ? cat.name : 'Unknown'};
    }));
  }

  if (url === '/api/stats') {
    return res.json({
      products: db.products.filter(p => p.status === 'active').length,
      categories: db.categories.length,
      users: db.users.length,
      orders: db.orders.length,
      discounts: db.discounts.filter(d => d.active).length
    });
  }

  if (url === '/api/users') {
    return res.json(db.users.map(u => ({...u, created_at: new Date().toISOString()})));
  }

  if (method === 'POST' && url === '/api/register') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const { name, email, phone, password } = JSON.parse(body);
      if (db.users.find(u => u.email === email)) {
        return res.status(400).json({ success: false, error: 'Email already registered' });
      }
      const user = { id: db.users.length + 1, name, email, phone, password: Buffer.from(password).toString('base64'), created_at: new Date().toISOString() };
      db.users.push(user);
      saveDB(db);
      res.json({ success: true, userId: user.id });
    });
    return;
  }

  if (method === 'POST' && url === '/api/login') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const { email, password } = JSON.parse(body);
      const user = db.users.find(u => u.email === email && u.password === Buffer.from(password).toString('base64'));
      if (!user) return res.status(401).json({ success: false, error: 'Invalid credentials' });
      res.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
    });
    return;
  }

  if (method === 'POST' && url === '/api/products') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const p = JSON.parse(body);
      const newProd = { id: db.nextProdId++, ...p, image: p.image || '' };
      db.products.push(newProd);
      saveDB(db);
      res.json({ success: true, id: newProd.id });
    });
    return;
  }

  if (method === 'PUT' && url.startsWith('/api/products/')) {
    const id = parseInt(url.split('/').pop());
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const data = JSON.parse(body);
      const idx = db.products.findIndex(p => p.id === id);
      if (idx >= 0) {
        db.products[idx] = { ...db.products[idx], ...data };
        saveDB(db);
      }
      res.json({ success: true });
    });
    return;
  }

  if (method === 'DELETE' && url.startsWith('/api/products/')) {
    const id = parseInt(url.split('/').pop());
    db.products = db.products.filter(p => p.id !== id);
    saveDB(db);
    res.json({ success: true });
    return;
  }

  res.status(404).json({ error: 'Not found' });
};