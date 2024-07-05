import type { Metadata } from "next";
import { Inter, DM_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import SessionProvider from "./SessionProvider";

const dmsans = DM_Sans({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DocuVault",
  description: "Streamlined Document Management",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={outfit.className}>
        <div className="absolute top-0 -z-10 h-full w-full bg-white">
          <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(255,104,104,0.3)] opacity-50 blur-[80px]"></div>
          <div className="z-10">
            <SessionProvider session={session}>
              <Header />
              {children}
            </SessionProvider>
          </div>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
