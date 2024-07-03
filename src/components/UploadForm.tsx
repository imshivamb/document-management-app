"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useToast } from "./ui/use-toast";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPE = ["application/pdf", "image/jpeg", "image/png"];

const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>();
  const { toast } = useToast();

  const validateFile = (file: File): string => {
    if (file.size > MAX_FILE_SIZE) {
      return "File size exceeds 5MB";
    }
    if (!ALLOWED_TYPE.includes(file.type)) {
      return "File type not supported. Please upload a PDF, JPEG, or PNG.";
    }
    return "";
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validationError = validateFile(selectedFile);
      if (validationError) {
        setError(validationError);
        setFile(null);
      } else {
        setError("");
        setFile(selectedFile);
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/documents", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Upload Failed");
      }

      setFile(null);
      setError("");
      toast({
        title: "File Uploaded Successfully",
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:cursor-pointer
          file:bg-[#f20819]/20 file:text-[#f20819]
          hover:file:bg-[#f20819]/70 hover:file:text-white file:transition-all file:duration-300"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={!file || !!error}
        className="bg-[#f20819] text-white px-4 py-2 rounded-full hover:bg-[#f20819] disabled:bg-gray-300"
      >
        Upload
      </button>
    </form>
  );
};

export default UploadForm;
