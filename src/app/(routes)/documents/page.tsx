import DocumentList from "@/components/DocumentList";
import Link from "next/link";

export default function DocumentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-4">Documents</h1>
        <Link
          href="/upload"
          className="bg-[#f20819] text-white px-3 py-1 hover:bg-[#f20819] rounded-full hover:-translate-y-1 transition-all ease-in-out duration-300 hover:shadow-md"
        >
          Go to Upload
        </Link>
      </div>
      <DocumentList />
    </div>
  );
}
