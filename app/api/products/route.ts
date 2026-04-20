import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function GET() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*, categories(name)')
    .eq('status', 'active')
    .order('id');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const formatted = products.map(p => ({
    ...p,
    category: p.categories?.name || 'Unknown'
  }));

  return NextResponse.json(formatted);
}

export async function POST(request: Request) {
  const body = await request.json();
  
  const { data, error } = await supabase
    .from('products')
    .insert([{
      name: body.name,
      category_id: parseInt(body.category_id),
      price: parseInt(body.price) || 0,
      emoji: body.emoji || '',
      description: body.description || '',
      badge: body.badge || '',
      status: body.status || 'active',
      images: body.images || []
    }])
    .select();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, id: data[0]?.id });
}