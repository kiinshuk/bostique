export interface Product {
  id: number;
  name: string;
  category: string;
  category_id: number;
  price: number;
  emoji: string;
  desc: string;
  badge: string;
  image: string;
  status: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  productCount?: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  created_at: string;
}

export interface Discount {
  id: number;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  min_order: number;
  max_uses: number;
  used: number;
  expires_at: string;
  active: boolean;
}

interface DB {
  products: Product[];
  categories: Category[];
  users: User[];
  discounts: Discount[];
  nextProdId: number;
  nextCatId: number;
  nextUserId: number;
  nextDiscId: number;
}

const initialDB: DB = {
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
    {id:1,name:'Duffel Bag',icon:'🧳'},{id:2,name:'Carry Bag',icon:'👜'},{id:3,name:'Backpack',icon:'🎒'},{id:4,name:'Cushion Cover',icon:'🛋️'}
  ],
  users: [],
  discounts: [],
  nextProdId: 9,
  nextCatId: 5,
  nextUserId: 1,
  nextDiscId: 1
};

let db: DB = { ...initialDB };

export function getDB() {
  return db;
}

export function saveDB(newDb: DB) {
  db = newDb;
}