"use client";

import { useState } from "react";
import Loader from "../../components/Loader";
import DownloadButton from "../../components/DownloadButton";

const API_URL = "https://api.toolzy.online";

export default function ResizePdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [size, setSize] = useState("100");
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFile = (selectedFile: File | null) => {
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return;
    }

    setFile(selectedFile);
    setError("");
    setSuccess("");
    setDownloadUrl("");
  };

  const handleResize = async () => {
    if (!file) {
      setError("Please upload a PDF file.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    setDownloadUrl("");

    try {
      const formData = new FormData();

      formData.append("pdf", file);
      formData.append("targetSize", size);

      const response = await fetch(
        `${API_URL}/api/resize`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccess("PDF resized successfully.");
        setDownloadUrl(data.downloadUrl);
      } else {
        setError("Resize failed.");
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
            Resize
            <span className="text-blue-500"> PDF </span>
            File Online
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Resize PDF to custom KB size online free for government forms,
            student uploads and office documents.
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="bg-[#121933] border border-[#26304f] rounded-[32px] p-6 md:p-10 shadow-2xl">
          {/* UPLOAD AREA */}
          <div className="border-2 border-dashed border-blue-500 rounded-3xl p-10 text-center bg-[#0d1328]">
            <input
              type="file"
              accept="application/pdf"
              id="pdfUpload"
              className="hidden"
              onChange={(e) =>
                handleFile(e.target.files?.[0] || null)
              }
            />

            <label
              htmlFor="pdfUpload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <div className="text-5xl mb-4">📄</div>

              <h2 className="text-2xl font-semibold mb-2">
                Upload PDF File
              </h2>

              <p className="text-gray-400">
                Select PDF file to resize
              </p>

              {file && (
                <div className="mt-5 bg-blue-600 px-5 py-2 rounded-xl text-sm">
                  {file.name}
                </div>
              )}
            </label>
          </div>

          {/* TARGET SIZE */}
          <div className="mt-8">
            <label className="block mb-3 text-lg font-medium">
              Select Target PDF Size
            </label>

            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full bg-[#0d1328] border border-[#26304f] rounded-2xl px-5 py-4 text-white outline-none"
            >
              <option value="50">50 KB</option>
              <option value="100">100 KB</option>
              <option value="200">200 KB</option>
              <option value="300">300 KB</option>
              <option value="500">500 KB</option>
              <option value="1024">1 MB</option>
            </select>
          </div>

          {/* FEATURES */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-[#0d1328] rounded-2xl p-5 border border-[#1e2a4a]">
              <h3 className="text-lg font-semibold mb-2">
                Custom Resize
              </h3>

              <p className="text-gray-400 text-sm">
                Resize PDF to exact target file size.
              </p>
            </div>

            <div className="bg-[#0d1328] rounded-2xl p-5 border border-[#1e2a4a]">
              <h3 className="text-lg font-semibold mb-2">
                Fast Processing
              </h3>

              <p className="text-gray-400 text-sm">
                High-speed secure cloud PDF resizing.
              </p>
            </div>

            <div className="bg-[#0d1328] rounded-2xl p-5 border border-[#1e2a4a]">
              <h3 className="text-lg font-semibold mb-2">
                Fully Secure
              </h3>

              <p className="text-gray-400 text-sm">
                Uploaded PDF files are automatically deleted after processing.
              </p>
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleResize}
            disabled={loading}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all duration-300 py-4 rounded-2xl text-lg font-semibold shadow-lg shadow-blue-900/30"
          >
            {loading ? "Resizing PDF..." : `Resize PDF to ${size}KB`}
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

        {/* SEO CONTENT */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <div className="bg-[#121933] border border-[#26304f] rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-4">
              Why Use Toolzy Resize PDF?
            </h2>

            <ul className="space-y-3 text-gray-400">
              <li>• Resize PDF to exact KB size</li>
              <li>• Free online PDF resizer</li>
              <li>• Fast secure cloud processing</li>
              <li>• Mobile responsive design</li>
              <li>• High quality optimized resizing</li>
            </ul>
          </div>

          <div className="bg-[#121933] border border-[#26304f] rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-4">
              Perfect for Government Forms
            </h2>

            <p className="text-gray-400 leading-8">
              Resize PDF files for job applications, scholarship forms,
              university admissions, exam portals and online submissions
              instantly on toolzy.online.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
