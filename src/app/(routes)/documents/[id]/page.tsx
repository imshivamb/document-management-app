import DocumentPreview from "@/components/DocumentPreview";

interface DocumentPageProps {
  params: {
    id: string;
  };
}

export default function DocumentPage({ params }: DocumentPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Document Preview</h1>
      <DocumentPreview documentId={params.id} />
    </div>
  );
}
