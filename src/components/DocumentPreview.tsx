"use client";

import React, { useState, useEffect } from "react";
import { Document as DocumentType } from "@/lib/types";

interface DocumentPreviewProps {
  documentId: string;
}

export default function DocumentPreview({ documentId }: DocumentPreviewProps) {
  const [document, setDocument] = useState<DocumentType | null>(null);

  useEffect(() => {
    async function fetchDocument() {
      try {
        const res = await fetch(`/api/documents/${documentId}`);
        if (res.ok) {
          const data = await res.json();
          setDocument(data);
        } else {
          console.error("Failed to fetch document");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    }
    fetchDocument();
  }, [documentId]);

  if (!document) return <div>Loading...</div>;

  const renderPreview = () => {
    const fileType = document.type.split("/")[0];
    const fileExtension = document.name.split(".").pop()?.toLowerCase();

    switch (fileType) {
      case "image":
        return (
          <img
            src={document.url}
            alt={document.name}
            className="max-w-full h-auto"
          />
        );
      case "application":
        if (document.type === "application/pdf") {
          // Use Google Docs Viewer for PDF files
          return (
            <iframe
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(
                document.url
              )}&embedded=true`}
              width="100%"
              height="600px"
              frameBorder="0"
            />
          );
        } else if (
          ["doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(
            fileExtension || ""
          )
        ) {
          // Handle other document types as needed
          return (
            <iframe
              src={`https://docs.google.com/gview?url=${encodeURIComponent(
                document.url
              )}&embedded=true`}
              width="100%"
              height="600px"
              frameBorder="0"
            />
          );
        }
      // For other application types, fall through to default
      case "text":
        return (
          <iframe
            src={document.url}
            width="100%"
            height="600px"
            frameBorder="0"
          />
        );
      case "audio":
        return (
          <audio controls>
            <source src={document.url} type={document.type} />
            Your browser does not support the audio element.
          </audio>
        );
      case "video":
        return (
          <video width="100%" height="auto" controls>
            <source src={document.url} type={document.type} />
            Your browser does not support the video tag.
          </video>
        );
      default:
        return (
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
