const express = require("express");
const path = require("path");
const fs = require("fs");

const upload = require("../middleware/upload");
const { compressPDF } = require("../services/compressService");

const router = express.Router();

/**
 * POST /api/compress
 * Compress PDF to smaller size
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

    const inputPath = req.file.path;

    // output filename
    const outputFileName = `compressed-${Date.now()}.pdf`;

    // output path
    const outputPath = path.join(
      __dirname,
      "../output",
      outputFileName
    );

    // compress pdf
    await compressPDF(inputPath, outputPath);

    // remove uploaded original file
    if (fs.existsSync(inputPath)) {
      fs.unlinkSync(inputPath);
    }

    // response
    return res.status(200).json({
      success: true,
      message: "PDF compressed successfully",
      downloadUrl: `https://api.toolzy.online/output/${outputFileName}`,
    });
  } catch (error) {
    console.error("Compress Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to compress PDF",
    });
  }
});

module.exports = router;
