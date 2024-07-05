"use client";

import React, { useState, useEffect } from "react";
import { Document } from "@/lib/types";

interface DocumentPreviewProps {
  documentId: string;
}

export default function DocumentPreview({ documentId }: DocumentPreviewProps) {
  const [document, setDocument] = useState<Document | null>(null);

  useEffect(() => {
    async function fetchDocument() {
      const res = await fetch(`/api/documents/${documentId}`);
      if (res.ok) {
        const data = await res.json();
        setDocument(data);
      } else {
        console.error("Failed to fetch document");
      }
    }
    fetchDocument();
  }, [documentId]);

  if (!document) return <div>Loading...</div>;

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-2">{document.name}</h2>
      {document.type.startsWith("image/") ? (
        <img
          src={document.url}
          alt={document.name}
          className="max-w-full h-auto"
        />
      ) : document.type === "application/pdf" ? (
        <iframe
          src={document.url}
          width="100%"
          height="600px"
          className="border-0"
        />
      ) : (
        <p>
          Preview not available for this file type.{" "}
          <a
            href={document.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Download file
          </a>
        </p>
      )}
    </div>
  );
}
