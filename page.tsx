"use client";

import { useState } from "react";
import Loader from "../../components/Loader";
import DownloadButton from "../../components/DownloadButton";

const API_URL = "https://api.toolzy.online";

export default function MergePdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const pdfFiles = Array.from(selectedFiles).filter(
      (file) => file.type === "application/pdf"
    );

    if (pdfFiles.length === 0) {
      setError("Please upload valid PDF files.");
      return;
    }

    setFiles(pdfFiles);
    setError("");
    setSuccess("");
    setDownloadUrl("");
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError("Upload at least 2 PDF files.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    setDownloadUrl("");

    try {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("pdfs", file);
      });

      const response = await fetch(
        `${API_URL}/api/merge`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccess("PDF files merged successfully.");
        setDownloadUrl(data.downloadUrl);
      } else {
        setError("Merge failed.");
      }
    } catch (err) {
      setError("Server error. Please try again.");
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
            Merge
            <span className="text-blue-500"> PDF </span>
            Files Online
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Combine multiple PDF files into one secure professional document
            instantly online.
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="bg-[#121933] border border-[#26304f] rounded-[32px] p-6 md:p-10 shadow-2xl">
          {/* UPLOAD BOX */}
          <div className="border-2 border-dashed border-blue-500 rounded-3xl p-10 text-center bg-[#0d1328]">
            <input
              type="file"
              multiple
              accept="application/pdf"
              id="pdfUpload"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />

            <label
              htmlFor="pdfUpload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <div className="text-5xl mb-4">📄</div>

              <h2 className="text-2xl font-semibold mb-2">
                Upload PDF Files
              </h2>

              <p className="text-gray-400">
                Select multiple PDF files to merge
              </p>

              {files.length > 0 && (
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="bg-blue-600 px-4 py-2 rounded-xl text-sm"
                    >
                      {file.name}
                    </div>
                  ))}
                </div>
              )}
            </label>
          </div>

          {/* FEATURES */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-[#0d1328] rounded-2xl p-5 border border-[#1e2a4a]">
              <h3 className="text-lg font-semibold mb-2">
                Unlimited Merge
              </h3>

              <p className="text-gray-400 text-sm">
                Merge multiple PDF files into one document easily.
              </p>
            </div>

            <div className="bg-[#0d1328] rounded-2xl p-5 border border-[#1e2a4a]">
              <h3 className="text-lg font-semibold mb-2">
                Fast Processing
              </h3>

              <p className="text-gray-400 text-sm">
                Secure high-speed PDF merging in seconds.
              </p>
            </div>

            <div className="bg-[#0d1328] rounded-2xl p-5 border border-[#1e2a4a]">
              <h3 className="text-lg font-semibold mb-2">
                Fully Secure
              </h3>

              <p className="text-gray-400 text-sm">
                Uploaded PDF files are auto deleted after processing.
              </p>
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleMerge}
            disabled={loading}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all duration-300 py-4 rounded-2xl text-lg font-semibold shadow-lg shadow-blue-900/30"
          >
            {loading ? "Merging PDFs..." : "Merge PDF Files"}
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
              Why Use Toolzy Merge PDF?
            </h2>

            <ul className="space-y-3 text-gray-400">
              <li>• Combine multiple PDFs instantly</li>
              <li>• Free online PDF merger</li>
              <li>• Fast cloud processing</li>
              <li>• Mobile responsive design</li>
              <li>• Secure document handling</li>
            </ul>
          </div>

          <div className="bg-[#121933] border border-[#26304f] rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-4">
              Perfect for Students & Offices
            </h2>

            <p className="text-gray-400 leading-8">
              Merge assignments, scanned documents, office reports,
              certificates and application PDFs into one professional file
              instantly on toolzy.online.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}