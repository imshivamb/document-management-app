import type { Session } from "next-auth";

export interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadDate: string;
  userId: string;
}

export interface ExtendedSession extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}