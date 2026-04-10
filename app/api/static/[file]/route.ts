import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);
  const parts = pathname.split('/').filter(Boolean);
  
  console.log('Static file request:', pathname, parts);
  
  if (parts[0] === 'api' && parts[1] === 'static' && parts[2]) {
    const fileName = parts[2];
    const filePath = path.join(process.cwd(), 'public', fileName);
    console.log('Looking for:', filePath);
    
    if (!fs.existsSync(filePath)) {
      console.log('File not found:', filePath);
      return NextResponse.json({ error: 'Not found', path: filePath }, { status: 404 });
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const contentType = fileName.endsWith('.css') ? 'text/css' : 
                        fileName.endsWith('.js') ? 'application/javascript' : 'text/plain';
    
    return new NextResponse(content, {
      headers: { 
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }
  
  return NextResponse.json({ error: 'Invalid path' }, { status: 404 });
}