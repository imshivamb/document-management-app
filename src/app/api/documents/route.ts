import { NextRequest, NextResponse } from "next/server";
import { getDocuments, uploadFile } from "@/lib/storage";
import { error } from "console";

export async function  GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const documents = await getDocuments(page);
    return NextResponse.json(documents);
}

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if(!file) {
        return NextResponse.json({error: "No file Uploaded"}, { status: 400 })
    }

    try {
        const result = await uploadFile(file);
        return NextResponse.json(result)
    } catch (error) {
        console.log("Upload error", error);
        return NextResponse.json({ error: "File upload failed"}, { status: 500 });
    }

}