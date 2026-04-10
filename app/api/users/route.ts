import { NextResponse } from 'next/server';
import { getDB } from '@/app/lib/data';

export async function GET() {
  const db = getDB();
  return NextResponse.json(db.users.map(u => ({...u, created_at: new Date().toISOString()})));
}