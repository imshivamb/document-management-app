"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Document } from "@/lib/types";

export default function DocumentList() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchDocuments();
  }, [page]);

  const fetchDocuments = async () => {
    const res = await fetch(`/api/documents?page=${page}`);
    const data = await res.json();
    setDocuments(data);
  };

  return (
    <div>
      <ul className="space-y-4">
        {documents.map((doc) => (
          <li key={doc.id} className="border p-4 rounded shadow">
            <Link
              href={`/documents/${doc.id}`}
              className="text-[#f20819] hover:underline"
            >
              {doc.name}
            </Link>
            <p className="text-sm text-gray-600">
              Size: {doc.size} bytes, Uploaded:{" "}
              {new Date(doc.uploadDate).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-4 space-x-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-[#f20819] text-white px-4 py-2 rounded-full hover:bg-[#c62732] disabled:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === 1}
          className="bg-[#f20819] text-white px-4 py-2 rounded-full hover:bg-[#c62732] disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
