import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);
  const parts = pathname.split('/').filter(Boolean);
  
  if (parts[0] === 'styles.css' || parts[0] === 'app.js') {
    const fileName = parts[0];
    const filePath = path.join(process.cwd(), 'public', fileName);
    
    if (!fs.existsSync(filePath)) {
      return new NextResponse('Not Found', { status: 404 });
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const contentType = fileName.endsWith('.css') ? 'text/css' : 'application/javascript';
    
    return new NextResponse(content, {
      headers: { 'Content-Type': contentType },
    });
  }
  
  return new NextResponse('Not Found', { status: 404 });
}