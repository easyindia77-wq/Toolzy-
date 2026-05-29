"use client";

import { useState } from "react";
import UploadBox from "../../components/UploadBox";
import Loader from "../../components/Loader";
import DownloadButton from "../../components/DownloadButton";
import { compressPDF } from "../../lib/api";

export default function CompressPdf50kbPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCompress = async () => {
    if (!file) {
      setError("Please upload a PDF file.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    setDownloadUrl("");

    try {
      const data = await compressPDF(file);

      if (data?.success && data?.downloadUrl) {
        setDownloadUrl(data.downloadUrl);
        setSuccess("PDF compressed successfully.");
      } else {
        setError("Compression failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b1020] text-white px-4 py-10">
      <section className="max-w-5xl mx-auto">

        {/* HERO */}
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500 text-blue-400 text-sm mb-5">
            toolzy.online
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
            Compress PDF to
            <span className="text-blue-500"> 50KB </span>
            Online Free
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Fast secure PDF compressor for government forms, student uploads,
            job applications and online submissions.
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="bg-[#121933] border border-[#26304f] rounded-[32px] p-6 md:p-10 shadow-2xl">

          <UploadBox file={file} setFile={setFile} />

          {/* INFO */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">

            <div className="bg-[#0d1328] rounded-2xl p-5 border border-[#1e2a4a]">
              <h3 className="text-lg font-semibold mb-2">Exact Target</h3>
              <p className="text-gray-400 text-sm">
                Optimized compression targeting PDF under 50KB.
              </p>
            </div>

            <div className="bg-[#0d1328] rounded-2xl p-5 border border-[#1e2a4a]">
              <h3 className="text-lg font-semibold mb-2">Fast Processing</h3>
              <p className="text-gray-400 text-sm">
                High-speed cloud compression with secure upload.
              </p>
            </div>

            <div className="bg-[#0d1328] rounded-2xl p-5 border border-[#1e2a4a]">
              <h3 className="text-lg font-semibold mb-2">Secure Files</h3>
              <p className="text-gray-400 text-sm">
                Files are auto-deleted after processing.
              </p>
            </div>

          </div>

          {/* BUTTON */}
          <button
            onClick={handleCompress}
            disabled={loading}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all duration-300 py-4 rounded-2xl text-lg font-semibold shadow-lg shadow-blue-900/30"
          >
            {loading ? "Compressing PDF..." : "Compress PDF to 50KB"}
          </button>

          {/* LOADER */}
          {loading && <Loader />}

          {/* ERROR */}
          {error && (
            <div className="mt-6 bg-red-500/10 border border-red-500 text-red-400 rounded-2xl p-4 text-center">
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="mt-6 bg-green-500/10 border border-green-500 text-green-400 rounded-2xl p-4 text-center">
              {success}
            </div>
          )}

          {/* DOWNLOAD */}
          {downloadUrl && (
            <div className="mt-8 flex justify-center">
              <DownloadButton url={downloadUrl} />
            </div>
          )}

        </div>

        {/* SEO SECTION */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">

          <div className="bg-[#121933] border border-[#26304f] rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-4">
              Why Use Toolzy PDF Compressor?
            </h2>

            <ul className="space-y-3 text-gray-400">
              <li>• Compress PDF to exact 50KB target</li>
              <li>• Free online tool</li>
              <li>• Fast cloud processing</li>
              <li>• Mobile friendly</li>
              <li>• Secure uploads</li>
            </ul>
          </div>

          <div className="bg-[#121933] border border-[#26304f] rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-4">
              Best For Government Forms
            </h2>

            <p className="text-gray-400 leading-7">
              Use this tool for job applications, scholarships, university forms,
              and government portals where file size limits are strict.
            </p>
          </div>

        </div>

      </section>
    </main>
  );
}
