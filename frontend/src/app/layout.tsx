import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toolzy - Free PDF Tools Online | Compress, Merge, Convert",
  description:
    "Toolzy.online - Free online PDF tools. Compress PDF to 50KB, Merge PDF, Image to PDF, PDF to Word and Resize PDF instantly.",
  keywords: [
    "pdf compressor",
    "compress pdf to 50kb",
    "merge pdf online",
    "image to pdf",
    "pdf to word",
    "resize pdf",
    "toolzy"
  ],
  authors: [{ name: "Toolzy" }],
  metadataBase: new URL("https://toolzy.online"),
  openGraph: {
    title: "Toolzy - Free PDF Tools Online",
    description:
      "Compress, merge, convert and resize PDF files online for free.",
    url: "https://toolzy.online",
    siteName: "Toolzy",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* GLOBAL NAVBAR (future ready) */}
        <header className="w-full border-b border-[#26304f] bg-[#0b1020]">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            
            <div className="text-xl font-bold text-white">
              Toolzy<span className="text-blue-500">.online</span>
            </div>

            <nav className="hidden md:flex gap-6 text-gray-300 text-sm">
              <a href="/">Home</a>
              <a href="/compress-pdf-to-50kb">Compress</a>
              <a href="/merge-pdf">Merge</a>
              <a href="/image-to-pdf">Image to PDF</a>
              <a href="/pdf-to-word">PDF to Word</a>
              <a href="/resize-pdf">Resize</a>
            </nav>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main>{children}</main>

        {/* GLOBAL FOOTER */}
        <footer className="border-t border-[#26304f] mt-20">
          <div className="max-w-6xl mx-auto px-4 py-10 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Toolzy.online. All rights reserved.</p>
            <p className="mt-2">
              Free PDF Tools - Compress, Merge, Convert & Resize PDFs Online
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
