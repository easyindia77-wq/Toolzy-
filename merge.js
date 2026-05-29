const express = require("express");
const path = require("path");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

const upload = require("../middleware/upload");

const router = express.Router();

/**
 * POST /api/merge
 * Merge multiple PDF files into one PDF
 */

router.post("/", upload.array("pdfs", 20), async (req, res) => {
  try {
    // no files
    if (!req.files || req.files.length < 2) {
      return res.status(400).json({
        success: false,
        message: "At least 2 PDF files are required",
      });
    }

    // create merged pdf
    const mergedPdf = await PDFDocument.create();

    // loop all uploaded pdfs
    for (const file of req.files) {
      const pdfBytes = fs.readFileSync(file.path);

      const pdf = await PDFDocument.load(pdfBytes);

      const copiedPages = await mergedPdf.copyPages(
        pdf,
        pdf.getPageIndices()
      );

      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });
    }

    // save merged file
    const mergedPdfBytes = await mergedPdf.save();

    const outputFileName = `merged-${Date.now()}.pdf`;

    const outputPath = path.join(
      __dirname,
      "../output",
      outputFileName
    );

    fs.writeFileSync(outputPath, mergedPdfBytes);

    // cleanup uploaded files
    req.files.forEach((file) => {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });

    // response
    return res.status(200).json({
      success: true,
      message: "PDF files merged successfully",
      downloadUrl: `https://api.toolzy.online/output/${outputFileName}`,
    });
  } catch (error) {
    console.error("Merge PDF Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to merge PDF files",
    });
  }
});

module.exports = router;