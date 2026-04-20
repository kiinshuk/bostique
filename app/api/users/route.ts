import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function GET() {
  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .order('id');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(users || []);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, password } = body;

  const { data: existing } = await supabase
    .from('users')
    .select('email')
    .eq('email', email)
    .single();

  if (existing) {
    return NextResponse.json({ success: false, error: 'Email already registered' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('users')
    .insert([{
      name,
      email,
      phone: phone || '',
      password,
      created_at: new Date().toISOString()
    }])
    .select();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, userId: data[0]?.id });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get('id'));

  if (!id) {
    return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
  }

  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}