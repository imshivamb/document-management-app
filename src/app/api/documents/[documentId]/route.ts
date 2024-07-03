import { NextRequest, NextResponse } from "next/server";
import { getDocument } from "@/lib/storage";

export async function GET(
  req: NextRequest,
  { params }: { params: { documentId: string } }
) {
  try {
    const document = await getDocument(params.documentId);
    return NextResponse.json(document);
  } catch (error) {
    console.error("Error fetching document:", error);
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }
}