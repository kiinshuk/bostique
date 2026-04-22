import { NextResponse } from 'next/server';
import { getDB, updateDB } from '@/app/lib/data';

export async function POST(request: Request) {
  const db = getDB();
  const body = await request.json();
  const { name, email, phone, password } = body;
  
  if (db.users.find(u => u.email === email)) {
    return NextResponse.json({ success: false, error: 'Email already registered' }, { status: 400 });
  }
  
  const user = {
    id: db.nextUserId++,
    name,
    email,
    phone: phone || '',
    password: Buffer.from(password).toString('base64'),
    created_at: new Date().toISOString()
  };
  db.users.push(user);
  updateDB({ users: db.users, nextUserId: db.nextUserId });
  
  return NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
}