"use client";

import React, { useState, useEffect } from "react";
import { Document } from "@/lib/types";

interface DocumentPreviewProps {
  documentId: string;
}

export default function DocumentPreview({ documentId }: DocumentPreviewProps) {
  const [document, setDocument] = useState<Document | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDocument() {
      try {
        const res = await fetch(`/api/documents/${documentId}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setDocument(data);
      } catch (error) {
        console.error("Error fetching document:", error);
        setError("Failed to load document");
      }
    }
    fetchDocument();
  }, [documentId]);

  if (error) return <div>Error: {error}</div>;
  if (!document) return <div>Loading...</div>;

  const fileExtension = document.name.split(".").pop()?.toLowerCase();

  const renderPreview = () => {
    switch (fileExtension) {
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
        return (
          <img
            src={document.url}
            alt={document.name}
            className="max-w-full h-auto"
          />
        );
      case "pdf":
        return (
          <iframe
            src={document.url}
            width="100%"
            height="600px"
            className="border-0"
          />
        );
      default:
        return (
          <p>
            Preview not available for this file type.{" "}
            <a href={document.url} download>
              Download file
            </a>
          </p>
        );
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-2">{document.name}</h2>
      {renderPreview()}
    </div>
  );
}
