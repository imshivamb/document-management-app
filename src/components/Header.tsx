"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-md text-[#f20819] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          DocuVault
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/documents">Documents</Link>
            </li>
            <li>
              <Link href="/upload">Upload</Link>
            </li>
            {session ? (
              <>
                <li>
                  <span>{session.user?.name}</span>
                </li>
                <li>
                  <button
                    className="bg-[#f20819] hover:bg-[#f20819] text-white px-5 py-2 rounded-full hover:-translate-y-1 transition-all ease-in-out duration-300 hover:shadow-md"
                    onClick={() => signOut()}
                  >
                    Sign out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button
                  className="bg-[#f20819] hover:bg-[#f20819] text-white px-5 py-2 rounded-full hover:-translate-y-1 transition-all ease-in-out duration-300 hover:shadow-md"
                  onClick={() => signIn()}
                >
                  Sign in
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}