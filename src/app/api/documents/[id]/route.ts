import { NextRequest, NextResponse } from 'next/server';
import { getDocument } from '@/lib/storage';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { ExtendedSession } from '@/lib/types';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions) as ExtendedSession | null;
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const document = await getDocument(params.id, session.user.id);
  
  if (!document) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 });
  }

  return NextResponse.json(document);
}