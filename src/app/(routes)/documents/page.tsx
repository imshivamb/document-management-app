import DocumentList from "@/components/DocumentList";

export default function DocumentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Documents</h1>
      <DocumentList />
    </div>
  );
}
