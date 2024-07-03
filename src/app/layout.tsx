import type { Metadata } from "next";
import { Inter, DM_Sans, Outfit } from "next/font/google";
import "./globals.css";

const dmsans = DM_Sans({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DocuVault",
  description: "Streamlined Document Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <div className="absolute top-0 -z-10 h-full w-full bg-white">
          <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(255,104,104,0.3)] opacity-50 blur-[80px]"></div>
          <div className="z-10">{children}</div>
        </div>
      </body>
    </html>
  );
}
