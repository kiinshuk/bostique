import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function GET() {
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('id');

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('id');

  if (!products || products.length === 0) {
    return NextResponse.json([]);
  }

  const formatted = products.map(p => {
    const cat = categories?.find(c => c.id === p.category_id);
    return {
      ...p,
      category: cat?.name || 'Unknown'
    };
  });

  return NextResponse.json(formatted);
}

export async function POST(request: Request) {
  const body = await request.json();
  
  const categoryId = parseInt(body.category_id) || 1;
  
  const { data, error } = await supabase
    .from('products')
    .insert([{
      name: body.name,
      category_id: categoryId,
      price: parseInt(body.price) || 0,
      emoji: body.emoji || '',
      description: body.description || '',
      badge: body.badge || '',
      status: 'active',
      images: body.images || []
    }])
    .select();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, id: data[0]?.id });
}