import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full bg-[#0b1020] border-b border-[#26304f] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="text-xl font-bold text-white">
          Toolzy<span className="text-blue-500">.online</span>
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>

          <Link href="/compress-pdf-to-50kb" className="hover:text-white transition">
            Compress
          </Link>

          <Link href="/merge-pdf" className="hover:text-white transition">
            Merge
          </Link>

          <Link href="/image-to-pdf" className="hover:text-white transition">
            Image to PDF
          </Link>

          <Link href="/pdf-to-word" className="hover:text-white transition">
            PDF to Word
          </Link>

          <Link href="/resize-pdf" className="hover:text-white transition">
            Resize
          </Link>
        </nav>

        {/* CTA BUTTON */}
        <Link
          href="/compress-pdf-to-50kb"
          className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-xl text-sm font-semibold"
        >
          Try Free
        </Link>
      </div>
    </header>
  );
}