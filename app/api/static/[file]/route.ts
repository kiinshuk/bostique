import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  
  if (pathParts[0] === 'api' && pathParts[1] === 'static' && pathParts[2]) {
    const fileName = pathParts[2];
    const filePath = path.join(process.cwd(), 'public', fileName);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const contentType = fileName.endsWith('.css') ? 'text/css' : 'application/javascript';
    
    return new NextResponse(content, {
      headers: { 'Content-Type': contentType },
    });
  }
  
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}