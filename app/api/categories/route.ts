import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function GET() {
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('id');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: products } = await supabase
    .from('products')
    .select('category_id')
    .eq('status', 'active');

  const withCount = categories.map(cat => ({
    ...cat,
    productCount: products?.filter(p => p.category_id === cat.id).length || 0
  }));

  return NextResponse.json(withCount);
}

export async function POST(request: Request) {
  const body = await request.json();
  
  const { data, error } = await supabase
    .from('categories')
    .insert([{
      name: body.name,
      icon: body.icon || '📦'
    }])
    .select();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, id: data[0]?.id });
}