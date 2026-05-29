const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

/**
 * Convert multiple images to PDF
 */

function createImagePDF(images = [], outputPath) {
  return new Promise((resolve, reject) => {
    try {
      // no images
      if (!images.length) {
        return reject(new Error("No images provided"));
      }

      // create output folder if missing
      const outputDir = path.dirname(outputPath);

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // create pdf
      const doc = new PDFDocument({
        autoFirstPage: false,
      });

      const stream = fs.createWriteStream(outputPath);

      doc.pipe(stream);

      // add images
      images.forEach((imagePath) => {
        // skip missing files
        if (!fs.existsSync(imagePath)) return;

        // new page
        doc.addPage({
          size: "A4",
          margin: 20,
        });

        // image inside page
        doc.image(imagePath, {
          fit: [555, 800],
          align: "center",
          valign: "center",
        });
      });

      // finalize
      doc.end();

      stream.on("finish", () => {
        resolve({
          success: true,
          outputPath,
        });
      });

      stream.on("error", (error) => {
        console.error("PDF Stream Error:", error);

        reject(
          new Error("Failed to create image PDF")
        );
      });
    } catch (error) {
      console.error("Image Service Error:", error);

      reject(
        new Error("Image to PDF conversion failed")
      );
    }
  });
}

module.exports = {
  createImagePDF,
};