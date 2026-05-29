"use client";

import { useState } from "react";

type Props = {
  file: File | null;
  setFile: (file: File | null) => void;
  accept?: string;
  multiple?: boolean;
};

export default function UploadBox({
  file,
  setFile,
  accept = "application/pdf",
  multiple = false,
}: Props) {
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    if (multiple) {
      // only first file used for now (safe fallback)
      setFile(files[0]);
    } else {
      setFile(files[0]);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-3xl p-10 text-center transition-all duration-300 bg-[#0d1328]
      ${dragActive ? "border-blue-500 scale-[1.01]" : "border-[#26304f]"}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragActive(false);
        handleFiles(e.dataTransfer.files);
      }}
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        id="upload-box"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <label htmlFor="upload-box" className="cursor-pointer block">
        <div className="text-5xl mb-4">📤</div>

        <h2 className="text-xl font-semibold mb-2">
          Drag & Drop or Click to Upload
        </h2>

        <p className="text-gray-400 text-sm">
          Supported file type: {accept}
        </p>

        {file && (
          <div className="mt-6 inline-block bg-blue-600 px-4 py-2 rounded-xl text-sm">
            {file.name}
          </div>
        )}
      </label>
    </div>
  );
}