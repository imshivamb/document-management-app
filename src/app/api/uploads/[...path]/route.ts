import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  const filePath = path.join(process.cwd(), 'uploads', ...params.path);

  try {
    const file = await fs.readFile(filePath);
    const stat = await fs.stat(filePath);
    const mimeType = getMimeType(path.extname(filePath));

    return new NextResponse(file, {
      headers: {
        'Content-Type': mimeType,
        'Content-Length': stat.size.toString(),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}

function getMimeType(extension: string): string {
  const mimeTypes: Record<string, string> = {
    '.pdf': 'application/pdf',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
  
  };
  return mimeTypes[extension.toLowerCase()] || 'application/octet-stream';
}