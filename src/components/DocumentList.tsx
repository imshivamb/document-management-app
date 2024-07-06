"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Document } from "@/lib/types";

export default function DocumentList() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchDocuments();
  }, [page]);

  useEffect(() => {
    filterDocuments();
  }, [searchQuery, documents]);

  const fetchDocuments = async () => {
    const res = await fetch(`/api/documents?page=${page}`);
    const data = await res.json();
    setDocuments(data);
  };

  const filterDocuments = () => {
    const filtered = documents.filter((doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDocuments(filtered);
  };

  const deleteDocument = async (id: string) => {
    console.log("Deleting document with id:", id);
    const res = await fetch(`api/documents/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setDocuments(documents.filter((doc) => doc.id !== id));
    } else {
      console.error("Unable to delete the document");
    }
  };

  return (
    <div>
      {documents.length > 0 && (
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search documents by name"
          className="border p-2 mb-4 rounded w-full"
        />
      )}
      <ul className="space-y-4">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc) => (
            <li key={doc.id} className="border p-4 rounded shadow">
              <div className="flex items-center justify-between">
                <div>
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
                </div>
                <button
                  onClick={() => deleteDocument(doc.id)}
                  className="bg-red-600 hover:bg-red-800 text-white px-3 py-1 text-xs rounded-full"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No documents available.</p>
        )}
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
          className="bg-[#f20819] text-white px-4 py-2 rounded-full hover:bg-[#c62732] disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
