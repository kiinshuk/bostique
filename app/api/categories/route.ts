import { NextResponse } from 'next/server';
import { getDB } from '@/app/lib/data';

export async function GET() {
  const db = getDB();
  const categories = db.categories.map(c => ({
    ...c,
    productCount: db.products.filter(p => p.category_id === c.id && p.status === 'active').length
  }));
  return NextResponse.json(categories);
}