import UploadForm from "@/components/UploadForm";
import Link from "next/link";

export default function UploadPage() {
  return (
    <div className="container mx-auto  w-full px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-4"> Upload Document</h1>
        <Link
          href="/documents"
          className="bg-[#f20819] text-white px-3 py-1 hover:bg-[#f20819] rounded-full hover:-translate-y-1 transition-all ease-in-out duration-300 hover:shadow-md"
        >
          Go to Documents List
        </Link>
      </div>
      <UploadForm />
    </div>
  );
}
