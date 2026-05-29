const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");

/**
 * Merge multiple PDF files
 */

async function mergePDFs(pdfFiles = [], outputPath) {
  try {
    // validate files
    if (!pdfFiles.length || pdfFiles.length < 2) {
      throw new Error("At least 2 PDF files are required");
    }

    // ensure output folder exists
    const outputDir = path.dirname(outputPath);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // create new merged pdf
    const mergedPdf = await PDFDocument.create();

    // process all pdfs
    for (const pdfPath of pdfFiles) {
      // skip missing file
      if (!fs.existsSync(pdfPath)) continue;

      // read file
      const pdfBytes = fs.readFileSync(pdfPath);

      // load pdf
      const pdf = await PDFDocument.load(pdfBytes);

      // copy pages
      const copiedPages = await mergedPdf.copyPages(
        pdf,
        pdf.getPageIndices()
      );

      // add pages
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });
    }

    // save merged pdf
    const mergedPdfBytes = await mergedPdf.save();

    fs.writeFileSync(outputPath, mergedPdfBytes);

    // output validation
    if (!fs.existsSync(outputPath)) {
      throw new Error("Merged PDF was not created");
    }

    return {
      success: true,
      outputPath,
    };
  } catch (error) {
    console.error("Merge Service Error:", error);

    throw new Error("Failed to merge PDF files");
  }
}

module.exports = {
  mergePDFs,
};
