import { NextRequest, NextResponse } from 'next/server';
import { getDocument, deleteDocument } from '@/lib/storage';
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

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions) as ExtendedSession | null;
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await deleteDocument(params.id, session.user.id);
    return NextResponse.json({ message: 'Document deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete the document' }, { status: 500 });
  }
}