import DocumentPreview from "@/components/DocumentPreview";
import Link from "next/link";

interface DocumentPageProps {
  params: {
    id: string;
  };
}

export default function DocumentPage({ params }: DocumentPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-4">Document Preview</h1>
        <Link
          href="/documents"
          className="bg-[#f20819] text-white px-3 py-1 hover:bg-[#f20819] rounded-full hover:-translate-y-1 transition-all ease-in-out duration-300 hover:shadow-md"
        >
          Back to Documents
        </Link>
      </div>
      <DocumentPreview documentId={params.id} />
    </div>
  );
}
