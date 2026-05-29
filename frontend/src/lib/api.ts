const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.toolzy.online/api";

/* =========================
   HELPER FUNCTION
========================= */

async function request(endpoint: string, formData: FormData) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "API request failed");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

/* =========================
   COMPRESS PDF
========================= */

export async function compressPDF(file: File) {
  const formData = new FormData();
  formData.append("pdf", file);

  return request("/compress", formData);
}

/* =========================
   MERGE PDF
========================= */

export async function mergePDF(files: File[]) {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("pdfs", file);
  });

  return request("/merge", formData);
}

/* =========================
   IMAGE TO PDF
========================= */

export async function imageToPDF(files: File[]) {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("images", file);
  });

  return request("/image-to-pdf", formData);
}

/* =========================
   PDF TO WORD
========================= */

export async function pdfToWord(file: File) {
  const formData = new FormData();
  formData.append("pdf", file);

  return request("/pdf-to-word", formData);
}

/* =========================
   RESIZE PDF
========================= */

export async function resizePDF(file: File, targetSize: string) {
  const formData = new FormData();
  formData.append("pdf", file);
  formData.append("targetSize", targetSize);

  return request("/resize", formData);
}

/* =========================
   EXPORT API URL
========================= */

export default API_URL;
