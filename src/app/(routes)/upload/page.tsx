import UploadForm from "@/components/UploadForm";

export default function UploadPage() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center w-full text-center px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Upload Document</h1>
      <UploadForm />
    </div>
  );
}
