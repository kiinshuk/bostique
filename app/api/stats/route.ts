import { NextResponse } from 'next/server';
import { getDB } from '@/app/lib/data';

export async function GET() {
  const db = getDB();
  return NextResponse.json({
    products: db.products.filter(p => p.status === 'active').length,
    categories: db.categories.length,
    users: db.users.length,
    orders: 0,
    discounts: db.discounts.filter(d => d.active).length
  });
}