import { NextRequest, NextResponse } from 'next/server';
import { uploadFile, getDocuments, getDocument } from '@/lib/storage';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { ExtendedSession } from '@/lib/types';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions) as ExtendedSession | null;
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const documents = await getDocuments(page, 10, session.user.id);
  return NextResponse.json(documents);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions) as ExtendedSession | null;
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  
  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  try {
    const result = await uploadFile(file, session.user.id);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}