import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .single();

  if (error || !user) {
    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
  }

  return NextResponse.json({ 
    success: true, 
    user: { id: user.id, name: user.name, email: user.email } 
  });
}