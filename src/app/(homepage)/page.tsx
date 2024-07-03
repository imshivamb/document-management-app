import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center flex-col gap-6 text-center justify-center h-full w-full max-w-4xl mx-auto min-h-screen ">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-normal">
        DocuVault: Streamlined Document Management
      </h1>
      <p className="text-gray-600 text-xl max-w-3xl mx-auto">
        Welcome to DocuVault, your centralized hub for efficient document
        management. Securely upload, organize, and access your important files
        with ease.
      </p>
      <div className="flex items-center gap-x-6 justify-center">
        <Link href="/documents">
          <Button className="bg-[#f2f0f3] hover:bg-[#f2f0f3] rounded-full hover:-translate-y-1 transition-all ease-in-out duration-300 hover:shadow-md text-[#f20819]">
            View Documents
          </Button>
        </Link>
        <Link href="/upload">
          <Button className="bg-[#f20819] hover:bg-[#f20819] rounded-full hover:-translate-y-1 transition-all ease-in-out duration-300 hover:shadow-md">
            Upload{" "}
          </Button>
        </Link>
      </div>
    </div>
  );
}
