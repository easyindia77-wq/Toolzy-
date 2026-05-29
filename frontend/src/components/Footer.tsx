import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#26304f] mt-20 bg-[#0b1020]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* TOP SECTION */}
        <div className="grid md:grid-cols-3 gap-10">
          
          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              Toolzy<span className="text-blue-500">.online</span>
            </h2>

            <p className="text-gray-400 text-sm mt-4 leading-6">
              Free online PDF tools for students, professionals and job applications.
              Compress, merge, convert and resize PDFs instantly.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>

            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/compress-pdf-to-50kb">Compress PDF</Link>
              </li>
              <li>
                <Link href="/merge-pdf">Merge PDF</Link>
              </li>
              <li>
                <Link href="/image-to-pdf">Image to PDF</Link>
              </li>
              <li>
                <Link href="/pdf-to-word">PDF to Word</Link>
              </li>
              <li>
                <Link href="/resize-pdf">Resize PDF</Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>

            <p className="text-gray-400 text-sm">
              Website: <span className="text-blue-400">toolzy.online</span>
            </p>

            <p className="text-gray-400 text-sm mt-2">
              Email: support@toolzy.online
            </p>

            <p className="text-gray-400 text-sm mt-2">
              Fast support for all PDF tools.
            </p>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-[#26304f] mt-10 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Toolzy.online. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
