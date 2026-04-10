import { NextResponse } from 'next/server';
import { getDB } from '@/app/lib/data';

export async function POST(request: Request) {
  const db = getDB();
  const body = await request.json();
  const { email, password } = body;
  
  const user = db.users.find(u => u.email === email && u.password === Buffer.from(password).toString('base64'));
  
  if (!user) {
    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
  }
  
  return NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
}