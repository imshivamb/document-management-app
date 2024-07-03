import fs from 'fs/promises';
import path from 'path';
import { Document } from './types';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export async function uploadFile(file: File): Promise<Document> {
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    await fs.mkdir(UPLOAD_DIR, {recursive: true});
    await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

    return {
        id: fileName,
        name: file.name,
        size: file.size,
        type: file.type,
        url: `/api/uploads/${fileName}`,
        uploadDate: new Date().toISOString(),
      };
}

export async function getDocuments(page: number = 1, limit: number = 10): Promise<Document[]> {
    const files = await fs.readdir(UPLOAD_DIR);
    const start = (page - 1) * limit;
    const end = start + limit;

    const documentPromises = files.slice(start, end).map(async (fileName) => {
        const filePath = path.join(UPLOAD_DIR, fileName);
        const stats = await fs.stat(filePath);
        return {
            id: fileName,
            name: fileName.substring(fileName.indexOf('-') + 1),
            size: stats.size,
            type: path.extname(fileName).slice(1),
            url: `/api/uploads/${fileName}`,
            uploadDate: stats.mtime.toISOString(),
          };
          
    })
    return Promise.all(documentPromises);
}

export async function getDocument(id: string): Promise<Document> {
    const filePath = path.join(UPLOAD_DIR, id);
    const stats = await fs.stat(filePath);
    
    return {
      id,
      name: id.substring(id.indexOf('-') + 1),
      size: stats.size,
      type: path.extname(id).slice(1),
      url: `/api/uploads/${id}`,
      uploadDate: stats.mtime.toISOString(),
    };
  }