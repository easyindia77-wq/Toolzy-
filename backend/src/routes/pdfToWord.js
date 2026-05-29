const express = require("express");
const path = require("path");
const fs = require("fs");
const mammoth = require("mammoth");

const upload = require("../middleware/upload");

const router = express.Router();

/**
 * POST /api/pdf-to-word
 * Basic PDF to Word conversion
 *
 * NOTE:
 * Real professional PDF -> DOCX conversion
 * usually needs LibreOffice / external APIs.
 *
 * This version extracts text from PDF
 * and creates a .docx compatible file.
 */

router.post("/", upload.single("pdf"), async (req, res) => {
  try {
    // no file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "PDF file is required",
      });
    }

    const pdfParse = require("pdf-parse");

    // read uploaded pdf
    const pdfBuffer = fs.readFileSync(req.file.path);

    // extract text
    const pdfData = await pdfParse(pdfBuffer);

    const extractedText = pdfData.text || "No text found";

    // output filename
    const outputFileName = `pdf-to-word-${Date.now()}.doc`;

    const outputPath = path.join(
      __dirname,
      "../output",
      outputFileName
    );

    // create simple word-compatible html document
    const wordContent = `
      <html>
        <head>
          <meta charset="utf-8">
          <title>Toolzy PDF to Word</title>
        </head>
        <body>
          <pre>${extractedText}</pre>
        </body>
      </html>
    `;

    fs.writeFileSync(outputPath, wordContent);

    // cleanup uploaded pdf
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    // response
    return res.status(200).json({
      success: true,
      message: "PDF converted to Word successfully",
      downloadUrl: `https://api.toolzy.online/output/${outputFileName}`,
    });
  } catch (error) {
    console.error("PDF To Word Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to convert PDF to Word",
    });
  }
});

module.exports = router;
