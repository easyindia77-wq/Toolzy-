const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.toolzy.online/api";

/* =========================
   COMPRESS PDF
========================= */

export async function compressPDF(file: File) {
  const formData = new FormData();

  formData.append("pdf", file);

  const response = await fetch(`${API_URL}/compress`, {
    method: "POST",
    body: formData,
  });

  return response.json();
}

/* =========================
   MERGE PDF
========================= */

export async function mergePDF(files: File[]) {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("pdfs", file);
  });

  const response = await fetch(`${API_URL}/merge`, {
    method: "POST",
    body: formData,
  });

  return response.json();
}

/* =========================
   IMAGE TO PDF
========================= */

export async function imageToPDF(files: File[]) {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("images", file);
  });

  const response = await fetch(`${API_URL}/image-to-pdf`, {
    method: "POST",
    body: formData,
  });

  return response.json();
}

/* =========================
   PDF TO WORD
========================= */

export async function pdfToWord(file: File) {
  const formData = new FormData();

  formData.append("pdf", file);

  const response = await fetch(`${API_URL}/pdf-to-word`, {
    method: "POST",
    body: formData,
  });

  return response.json();
}

/* =========================
   RESIZE PDF
========================= */

export async function resizePDF(
  file: File,
  targetSize: string
) {
  const formData = new FormData();

  formData.append("pdf", file);

  formData.append("targetSize", targetSize);

  const response = await fetch(`${API_URL}/resize`, {
    method: "POST",
    body: formData,
  });

  return response.json();
}

export default API_URL;