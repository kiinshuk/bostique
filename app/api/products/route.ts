import { NextResponse } from 'next/server';
import { getDB } from '@/app/lib/data';

export async function GET() {
  const db = getDB();
  const products = db.products.map(p => {
    const cat = db.categories.find(c => c.id === p.category_id);
    return { ...p, category: cat ? cat.name : 'Unknown' };
  });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const db = getDB();
  const body = await request.json();
  const newProduct = {
    id: db.nextProdId++,
    ...body,
    image: body.image || ''
  };
  db.products.push(newProduct);
  return NextResponse.json({ success: true, id: newProduct.id });
}