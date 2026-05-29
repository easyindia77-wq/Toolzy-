import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      {/* HERO SECTION */}
      <section className="px-4 py-16 text-center hero-gradient">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500 text-blue-400 text-sm mb-6">
            🚀 Fast & Free PDF Tools on toolzy.online
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            All-in-One
            <span className="text-blue-500"> PDF Toolkit </span>
            for Everyone
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Compress, Merge, Convert, Resize PDFs instantly. Free tools for students, jobs,
            government forms and daily use.
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/compress-pdf-to-50kb"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl font-semibold shadow-blue"
            >
              Compress PDF
            </Link>

            <Link
              href="/merge-pdf"
              className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl font-semibold"
            >
              Merge PDF
            </Link>
          </div>
        </div>
      </section>

      {/* TOOLS SECTION */}
      <section className="px-4 py-10 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Popular PDF Tools
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Compress */}
          <Link href="/compress-pdf-to-50kb" className="card-hover bg-[#121933] border border-[#26304f] rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-2">Compress PDF</h3>
            <p className="text-gray-400 text-sm">
              Reduce PDF size to 50KB or less instantly.
            </p>
          </Link>

          {/* Merge */}
          <Link href="/merge-pdf" className="card-hover bg-[#121933] border border-[#26304f] rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-2">Merge PDF</h3>
            <p className="text-gray-400 text-sm">
              Combine multiple PDF files into one document.
            </p>
          </Link>

          {/* Image to PDF */}
          <Link href="/image-to-pdf" className="card-hover bg-[#121933] border border-[#26304f] rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-2">Image to PDF</h3>
            <p className="text-gray-400 text-sm">
              Convert JPG/PNG images into PDF files.
            </p>
          </Link>

          {/* PDF to Word */}
          <Link href="/pdf-to-word" className="card-hover bg-[#121933] border border-[#26304f] rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-2">PDF to Word</h3>
            <p className="text-gray-400 text-sm">
              Convert PDF into editable Word document.
            </p>
          </Link>

          {/* Resize */}
          <Link href="/resize-pdf" className="card-hover bg-[#121933] border border-[#26304f] rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-2">Resize PDF</h3>
            <p className="text-gray-400 text-sm">
              Resize PDF to custom KB size easily.
            </p>
          </Link>
        </div>
      </section>

      {/* SEO SECTION */}
      <section className="px-4 py-16 max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Why Toolzy.online?
        </h2>

        <p className="text-gray-400 leading-7">
          Toolzy is a free online PDF toolkit designed for students, job seekers and professionals.
          Compress large PDFs, merge documents, convert images to PDF and more without installing software.
          Everything works directly in your browser with fast cloud processing.
        </p>
      </section>
    </main>
  );
}
