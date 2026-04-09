const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const db = new Database('bostique.db');

db.pragma('journal_mode = WAL');

app.use(cors({ 
  origin: function(origin, callback) {
    callback(null, true);
  },
  credentials: true 
}));
app.use(express.json({ limit: '10mb' }));
app.use(session({
  secret: 'bostique-admin-2026-key',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }
}));

db.exec(`
  CREATE TABLE IF NOT EXISTS admin (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    password TEXT NOT NULL,
    verified INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    icon TEXT DEFAULT '🛍️',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category_id INTEGER NOT NULL,
    price INTEGER NOT NULL,
    emoji TEXT DEFAULT '🛍️',
    description TEXT DEFAULT '',
    badge TEXT DEFAULT '',
    image TEXT DEFAULT '',
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
  );

  CREATE TABLE IF NOT EXISTS discounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    type TEXT DEFAULT 'percent',
    value INTEGER NOT NULL,
    min_order INTEGER DEFAULT 0,
    max_uses INTEGER DEFAULT 100,
    used_count INTEGER DEFAULT 0,
    expires_at TEXT,
    active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT,
    customer_phone TEXT,
    items TEXT NOT NULL,
    total INTEGER NOT NULL,
    discount_code TEXT,
    discount_amount INTEGER DEFAULT 0,
    status TEXT DEFAULT 'pending',
    wa_message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sessions (
    sid TEXT PRIMARY KEY,
    sess TEXT NOT NULL,
    expired DATETIME NOT NULL
  );
`);

const adminExists = db.prepare('SELECT id FROM admin WHERE username = ?').get('bostique');
if (!adminExists) {
  const hash = bcrypt.hashSync('admin2026', 10);
  db.prepare('INSERT INTO admin (username, password) VALUES (?, ?)').run('bostique', hash);
  console.log('Admin user created: bostique / admin2026');
}

try {
  const catCount = db.prepare('SELECT COUNT(*) as c FROM categories').get().c;
  if (catCount === 0) {
    const insertCat = db.prepare('INSERT INTO categories (name, icon) VALUES (?, ?)');
    insertCat.run('Duffel Bag', '🧳');
    insertCat.run('Carry Bag', '👜');
    insertCat.run('Backpack', '🎒');
    insertCat.run('Cushion Cover', '🛋️');
    console.log('Categories seeded');
  }

  const prodCount = db.prepare('SELECT COUNT(*) as c FROM products').get().c;
  if (prodCount === 0) {
    const insertProd = db.prepare(`INSERT INTO products (name, category_id, price, emoji, description, badge, status, image) VALUES (?, ?, ?, ?, ?, ?, ?, '')`);
    
    const duffel = db.prepare('SELECT id FROM categories WHERE name = ?').get('Duffel Bag');
    const carry = db.prepare('SELECT id FROM categories WHERE name = ?').get('Carry Bag');
    const backpack = db.prepare('SELECT id FROM categories WHERE name = ?').get('Backpack');
    const cushion = db.prepare('SELECT id FROM categories WHERE name = ?').get('Cushion Cover');
    
    if (duffel) insertProd.run('Expedition Duffel', duffel.id, 3499, '🧳', 'Full-grain leather weekend bag with weatherproof canvas base.', 'New', 'active');
    if (duffel) insertProd.run('City Slicker Duffel', duffel.id, 2799, '🧳', 'Compact leather duffel for the urban explorer.', '', 'active');
    if (carry) insertProd.run('Heritage Carry Tote', carry.id, 1899, '👜', 'A timeless everyday tote in genuine leather.', 'New', 'active');
    if (carry) insertProd.run('Market Carry Bag', carry.id, 1299, '👜', 'Durable canvas and leather carry bag.', '', 'active');
    if (backpack) insertProd.run('Urban Pro Backpack', backpack.id, 2999, '🎒', 'Work-ready leather backpack with laptop sleeve.', 'New', 'active');
    if (backpack) insertProd.run('Trail Backpack', backpack.id, 2199, '🎒', 'Adventure-ready canvas and leather backpack.', '', 'active');
    if (cushion) insertProd.run('Cognac Cushion Cover', cushion.id, 899, '🛋️', 'Luxurious full-grain leather cushion cover.', 'New', 'active');
    if (cushion) insertProd.run('Tan Leather Cushion Pair', cushion.id, 1699, '🪑', 'Set of 2 hand-stitched leather cushion covers.', 'Sale', 'active');
    console.log('Products seeded');
  }
} catch(e) {
  console.error('Seed error:', e.message);
}

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  const admin = db.prepare('SELECT * FROM admin WHERE username = ?').get(username);
  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    return res.json({ success: false, error: 'Invalid credentials' });
  }
  req.session.adminId = admin.id;
  req.session.adminUser = admin.username;
  res.json({ success: true });
});

app.post('/api/admin/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

app.get('/api/admin/check', (req, res) => {
  res.json({ authenticated: !!req.session.adminId });
});

// User Registration
app.post('/api/register', (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ success: false, error: 'Name, email and password required' });
  }
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) {
    return res.json({ success: false, error: 'Email already registered' });
  }
  const hash = bcrypt.hashSync(password, 10);
  try {
    const info = db.prepare('INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)').run(name, email, phone || '', hash);
    res.json({ success: true, userId: info.lastInsertRowid });
  } catch(e) {
    res.json({ success: false, error: 'Registration failed' });
  }
});

// User Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ success: false, error: 'Email and password required' });
  }
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.json({ success: false, error: 'Invalid email or password' });
  }
  req.session.userId = user.id;
  req.session.userName = user.name;
  req.session.userEmail = user.email;
  res.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
});

// User Logout
app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// Check User Session
app.get('/api/user', (req, res) => {
  if (req.session.userId) {
    res.json({ loggedIn: true, user: { id: req.session.userId, name: req.session.userName, email: req.session.userEmail } });
  } else {
    res.json({ loggedIn: false });
  }
});

app.get('/api/categories', (req, res) => {
  const cats = db.prepare('SELECT * FROM categories ORDER BY id').all();
  const prods = db.prepare("SELECT category_id, COUNT(*) as count FROM products WHERE status = 'active' GROUP BY category_id").all();
  const prodMap = {};
  prods.forEach(p => { prodMap[p.category_id] = p.count; });
  res.json(cats.map(c => ({ ...c, productCount: prodMap[c.id] || 0 })));
});

app.get('/api/products', (req, res) => {
  const { category, status } = req.query;
  let sql = `SELECT p.id, p.name, p.category_id, c.name as category, c.name as category_name, c.icon as category_icon, p.price, COALESCE(p.emoji, '🛍️') as emoji, COALESCE(p.description, '') as desc, COALESCE(p.badge, '') as badge, COALESCE(p.image, '') as image, COALESCE(p.status, 'active') as status FROM products p JOIN categories c ON p.category_id = c.id`;
  const params = [];
  const conditions = [];
  if (category && category !== 'All') {
    conditions.push('c.name = ?');
    params.push(category);
  }
  if (status) {
    conditions.push('p.status = ?');
    params.push(status);
  }
  if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
  sql += ' ORDER BY p.id';
  const prods = db.prepare(sql).all(...params);
  res.json(prods.map(p => ({
    id: p.id, name: p.name, category: p.category, category_id: p.category_id,
    price: p.price, emoji: p.emoji, desc: p.desc, badge: p.badge, image: p.image, status: p.status
  })));
});

app.post('/api/products', (req, res) => {
  if (!req.session.adminId) return res.status(401).json({ error: 'Unauthorized' });
  const { name, category_id, price, emoji, description, badge, status, image } = req.body;
  const cat = db.prepare('SELECT id FROM categories WHERE id = ?').get(category_id);
  if (!cat) return res.status(400).json({ error: 'Invalid category' });
  const info = db.prepare(`INSERT INTO products (name, category_id, price, emoji, description, badge, status, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(name, category_id, price, emoji || '🛍️', description || '', badge || '', status || 'active', image || '');
  res.json({ success: true, id: info.lastInsertRowid });
});

app.put('/api/products/:id', (req, res) => {
  if (!req.session.adminId) return res.status(401).json({ error: 'Unauthorized' });
  const { name, category_id, price, emoji, description, badge, status, image } = req.body;
  db.prepare(`UPDATE products SET name = ?, category_id = ?, price = ?, emoji = ?, description = ?, badge = ?, status = ?, image = ? WHERE id = ?`)
    .run(name, category_id, price, emoji || '🛍️', description || '', badge || '', status || 'active', image || '', req.params.id);
  res.json({ success: true });
});

app.delete('/api/products/:id', (req, res) => {
  if (!req.session.adminId) return res.status(401).json({ error: 'Unauthorized' });
  db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

app.post('/api/categories', (req, res) => {
  if (!req.session.adminId) return res.status(401).json({ error: 'Unauthorized' });
  const { name, icon } = req.body;
  try {
    const info = db.prepare('INSERT INTO categories (name, icon) VALUES (?, ?)').run(name, icon || '🛍️');
    res.json({ success: true, id: info.lastInsertRowid });
  } catch (e) {
    res.status(400).json({ error: 'Category already exists' });
  }
});

app.delete('/api/categories/:id', (req, res) => {
  if (!req.session.adminId) return res.status(401).json({ error: 'Unauthorized' });
  const prods = db.prepare('SELECT COUNT(*) as c FROM products WHERE category_id = ?').get(req.params.id).c;
  if (prods > 0) return res.status(400).json({ error: 'Delete products in category first' });
  db.prepare('DELETE FROM categories WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

app.get('/api/discounts', (req, res) => {
  if (!req.session.adminId) return res.status(401).json({ error: 'Unauthorized' });
  const discs = db.prepare('SELECT * FROM discounts ORDER BY id').all();
  res.json(discs);
});

app.post('/api/discounts', (req, res) => {
  if (!req.session.adminId) return res.status(401).json({ error: 'Unauthorized' });
  const { code, type, value, min_order, max_uses, expires_at } = req.body;
  try {
    const info = db.prepare(`INSERT INTO discounts (code, type, value, min_order, max_uses, expires_at) VALUES (?, ?, ?, ?, ?, ?)`)
      .run(code.toUpperCase(), type || 'percent', value, min_order || 0, max_uses || 100, expires_at || null);
    res.json({ success: true, id: info.lastInsertRowid });
  } catch (e) {
    res.status(400).json({ error: 'Discount code already exists' });
  }
});

app.put('/api/discounts/:id', (req, res) => {
  if (!req.session.adminId) return res.status(401).json({ error: 'Unauthorized' });
  const { active } = req.body;
  db.prepare('UPDATE discounts SET active = ? WHERE id = ?').run(active ? 1 : 0, req.params.id);
  res.json({ success: true });
});

app.delete('/api/discounts/:id', (req, res) => {
  if (!req.session.adminId) return res.status(401).json({ error: 'Unauthorized' });
  db.prepare('DELETE FROM discounts WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

app.post('/api/validate-discount', (req, res) => {
  const { code, cartTotal } = req.body;
  const disc = db.prepare('SELECT * FROM discounts WHERE code = ? AND active = 1').get(code.toUpperCase());
  if (!disc) return res.json({ valid: false, error: 'Invalid code' });
  if (disc.expires_at && new Date(disc.expires_at) < new Date()) return res.json({ valid: false, error: 'Expired' });
  if (disc.used_count >= disc.max_uses) return res.json({ valid: false, error: 'Limit reached' });
  if (cartTotal < disc.min_order) return res.json({ valid: false, error: `Min order ₹${disc.min_order}` });
  
  let discountAmount;
  if (disc.type === 'percent') {
    discountAmount = Math.floor(cartTotal * disc.value / 100);
  } else {
    discountAmount = disc.value;
  }
  res.json({ valid: true, discountAmount, type: disc.type, value: disc.value });
});

app.get('/api/orders', (req, res) => {
  if (!req.session.adminId) return res.status(401).json({ error: 'Unauthorized' });
  const orders = db.prepare('SELECT * FROM orders ORDER BY id DESC').all();
  res.json(orders.map(o => ({ ...o, items: JSON.parse(o.items) })));
});

app.post('/api/orders', (req, res) => {
  const { customer_name, customer_phone, items, total, discount_code, discount_amount, wa_message } = req.body;
  const info = db.prepare(`INSERT INTO orders (customer_name, customer_phone, items, total, discount_code, discount_amount, wa_message) VALUES (?, ?, ?, ?, ?, ?, ?)`)
    .run(customer_name || '', customer_phone || '', JSON.stringify(items), total, discount_code || null, discount_amount || 0, wa_message || '');
  
  if (discount_code) {
    db.prepare('UPDATE discounts SET used_count = used_count + 1 WHERE code = ?').run(discount_code.toUpperCase());
  }
  res.json({ success: true, id: info.lastInsertRowid });
});

app.get('/api/stats', (req, res) => {
  const prodCount = db.prepare("SELECT COUNT(*) as c FROM products WHERE status = 'active'").get().c;
  const catCount = db.prepare('SELECT COUNT(*) as c FROM categories').get().c;
  const orderCount = db.prepare('SELECT COUNT(*) as c FROM orders').get().c;
  const diskCount = db.prepare('SELECT COUNT(*) as c FROM discounts WHERE active = 1').get().c;
  const userCount = db.prepare('SELECT COUNT(*) as c FROM users').get().c;
  res.json({ products: prodCount, categories: catCount, orders: orderCount, discounts: diskCount, users: userCount });
});

// Get all users (admin only)
app.get('/api/users', (req, res) => {
  if (!req.session.adminId) return res.status(401).json({ error: 'Unauthorized' });
  const users = db.prepare('SELECT id, name, email, phone, created_at FROM users ORDER BY id DESC').all();
  res.json(users);
});

app.use(express.static(path.join(__dirname, '.')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index_10.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bostique server running on http://localhost:${PORT}`));