const express = require("express");
const path = require("path");
const fs = require("fs");

const upload = require("../middleware/upload");
const { resizePDF } = require("../services/resizeService");

const router = express.Router();

/**
 * POST /api/resize
 * Resize PDF to custom target size
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

    // target size from frontend
    const targetSize = req.body.targetSize || "100";

    // uploaded file path
    const inputPath = req.file.path;

    // output file name
    const outputFileName = `resized-${Date.now()}.pdf`;

    // output path
    const outputPath = path.join(
      __dirname,
      "../output",
      outputFileName
    );

    // resize/compress service
    await resizePDF(inputPath, outputPath, targetSize);

    // cleanup uploaded file
    if (fs.existsSync(inputPath)) {
      fs.unlinkSync(inputPath);
    }

    // response
    return res.status(200).json({
      success: true,
      message: "PDF resized successfully",
      downloadUrl: `https://api.toolzy.online/output/${outputFileName}`,
    });
  } catch (error) {
    console.error("Resize PDF Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to resize PDF",
    });
  }
});

module.exports = router;
