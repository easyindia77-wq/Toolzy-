const express = require("express");
const path = require("path");
const fs = require("fs");
const PDFDocument = require("pdfkit");

const upload = require("../middleware/upload");

const router = express.Router();

/**
 * POST /api/image-to-pdf
 * Convert multiple images to single PDF
 */

router.post("/", upload.array("images", 20), async (req, res) => {
  try {
    // no files
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Images are required",
      });
    }

    // output file
    const outputFileName = `image-to-pdf-${Date.now()}.pdf`;

    const outputPath = path.join(
      __dirname,
      "../output",
      outputFileName
    );

    // create pdf
    const doc = new PDFDocument({
      autoFirstPage: false,
    });

    const stream = fs.createWriteStream(outputPath);

    doc.pipe(stream);

    // add images
    for (const file of req.files) {
      doc.addPage();

      doc.image(file.path, {
        fit: [500, 700],
        align: "center",
        valign: "center",
      });
    }

    doc.end();

    // wait for finish
    stream.on("finish", () => {
      // cleanup uploaded images
      req.files.forEach((file) => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });

      return res.status(200).json({
        success: true,
        message: "Images converted to PDF successfully",
        downloadUrl: `https://api.toolzy.online/output/${outputFileName}`,
      });
    });

    stream.on("error", (error) => {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to generate PDF",
      });
    });
  } catch (error) {
    console.error("Image To PDF Error:", error);

    return res.status(500).json({
      success: false,
      message: "Image to PDF conversion failed",
    });
  }
});

module.exports = router;