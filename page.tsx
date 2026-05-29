"use client";

import { useState } from "react";
import UploadBox from "../../components/UploadBox";
import Loader from "../../components/Loader";
import DownloadButton from "../../components/DownloadButton";

const API_URL = "https://api.toolzy.online";

export default function ImageToPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const fileArray = Array.from(selectedFiles);

    setFiles(fileArray);
    setError("");
    setSuccess("");
    setDownloadUrl("");
  };

  const handleConvert = async () => {
    if (files.length === 0) {
      setError("Please upload image files.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    setDownloadUrl("");

    try {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch(
        `${API_URL}/api/image-to-pdf`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccess("Images converted to PDF successfully.");
        setDownloadUrl(data.downloadUrl);
      } else {
        setError("Conversion failed.");
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
            Convert
            <span className="text-blue-500"> Images </span>
            to PDF Online
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Fast secure JPG PNG to PDF converter for students, documents,
            assignments and office files.
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="bg-[#121933] border border-[#26304f] rounded-[32px] p-6 md:p-10 shadow-2xl">
          {/* UPLOAD AREA */}
          <div className="border-2 border-dashed border-blue-500 rounded-3xl p-10 text-center bg-[#0d1328]">
            <input
              type="file"
              multiple
              accept="image/png,image/jpeg,image/jpg"
              id="imageUpload"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />

            <label
              htmlFor="imageUpload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <div className="text-5xl mb-4">🖼️</div>

              <h2 className="text-2xl font-semibold mb-2">
                Upload Images
              </h2>

              <p className="text-gray-400">
                Select JPG PNG images to convert into PDF
              </p>

              {files.length > 0 && (
                <div className="mt-5 flex flex-wrap justify-center gap-3">
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

          {/* INFO */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-[#0d1328] rounded-2xl p-5 border border-[#1e2a4a]">
              <h3 className="text-lg font-semibold mb-2">
                Multiple Images
              </h3>

              <p className="text-gray-400 text-sm">
                Convert multiple images into one PDF file.
              </p>
            </div>

            <div className="bg-[#0d1328] rounded-2xl p-5 border border-[#1e2a4a]">
              <h3 className="text-lg font-semibold mb-2">
                Fast Conversion
              </h3>

              <p className="text-gray-400 text-sm">
                High-speed secure image to PDF processing.
              </p>
            </div>

            <div className="bg-[#0d1328] rounded-2xl p-5 border border-[#1e2a4a]">
              <h3 className="text-lg font-semibold mb-2">
                Mobile Friendly
              </h3>

              <p className="text-gray-400 text-sm">
                Convert images to PDF easily on any device.
              </p>
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleConvert}
            disabled={loading}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all duration-300 py-4 rounded-2xl text-lg font-semibold shadow-lg shadow-blue-900/30"
          >
            {loading ? "Converting Images..." : "Convert to PDF"}
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
              Why Use Toolzy Image to PDF?
            </h2>

            <ul className="space-y-3 text-gray-400">
              <li>• Convert JPG PNG to PDF online</li>
              <li>• Multiple image support</li>
              <li>• Fast cloud conversion</li>
              <li>• Secure processing</li>
              <li>• Mobile responsive UI</li>
            </ul>
          </div>

          <div className="bg-[#121933] border border-[#26304f] rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-4">
              Best for Students & Offices
            </h2>

            <p className="text-gray-400 leading-8">
              Convert assignment photos, scanned documents, ID proofs and
              office images into professional PDF files instantly on
              toolzy.online.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}