import axios from 'axios';
import { Document } from './types';
import { db, documents } from './db';
import { eq, and } from 'drizzle-orm';

const UPLOAD_URL = 'https://0x0.st';

export async function uploadFile(file: File, userId: string): Promise<Document> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(UPLOAD_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Upload response:', response.data);

    const fileUrl = response.data.trim();
    const document: Document = {
      id: fileUrl.split('/').pop() || '',
      name: file.name,
      size: file.size,
      type: file.type,
      url: fileUrl,
      uploadDate: new Date().toISOString(),
      userId,
    };

    // Insert document metadata into the database
    await db.insert(documents).values(document);

    return document;
  } catch (error) {
    console.error('Upload error:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
    }
    throw new Error('File upload failed');
  }
}

export async function getDocuments(page: number = 1, limit: number = 10, userId: string): Promise<Document[]> {
  const offset = (page - 1) * limit;
  return db.select().from(documents)
    .where(eq(documents.userId, userId))
    .limit(limit)
    .offset(offset)
    .execute();
}

export async function getDocument(id: string, userId: string): Promise<Document | null> {
  const result = await db.select()
    .from(documents)
    .where(and(
      eq(documents.id, id),
      eq(documents.userId, userId)
    ))
    .limit(1)
    .execute();
  
  return result[0] || null;
}

export async function deleteDocument(id: string, userId: string): Promise<void> {
  const result = await db.delete(documents).where(and(
    eq(documents.id, id),
    eq(documents.userId, userId)
  ))
  .execute();
  
  if (result.rowCount === 0) {
    throw new Error('Document not found or you do not have permission to delete it');
  }
}