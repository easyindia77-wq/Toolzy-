"use client";

import { useState } from "react";

type Props = {
  url: string;
  fileName?: string;
};

export default function DownloadButton({
  url,
  fileName = "toolzy-file",
}: Props) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!url) return;

    setDownloading(true);

    try {
      // Direct download trigger (fast + simple)
      const a = document.createElement("a");
      a.href = url;

      // force download
      a.setAttribute("download", fileName);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <button
        onClick={handleDownload}
        disabled={!url || downloading}
        className="bg-green-600 hover:bg-green-700 disabled:opacity-50 transition-all duration-300 px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-green-900/30"
      >
        {downloading ? "Downloading..." : "Download File"}
      </button>

      {/* Optional direct link fallback */}
      <a href={url} className="hidden" />
    </div>
  );
}
