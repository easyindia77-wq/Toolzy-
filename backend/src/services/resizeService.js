const { exec } = require("child_process");
const fs = require("fs");

/**
 * Resize PDF using Ghostscript
 * Compresses PDF based on target KB size
 */

function resizePDF(inputPath, outputPath, targetSize = "100") {
  return new Promise((resolve, reject) => {
    // validate input file
    if (!fs.existsSync(inputPath)) {
      return reject(new Error("Input PDF file not found"));
    }

    /**
     * Compression presets
     * smaller target => stronger compression
     */

    let quality = "/ebook";

    const size = parseInt(targetSize);

    if (size <= 50) {
      quality = "/screen";
    } else if (size <= 100) {
      quality = "/ebook";
    } else if (size <= 300) {
      quality = "/printer";
    } else {
      quality = "/prepress";
    }

    // ghostscript command
    const command = `
      gs \
      -sDEVICE=pdfwrite \
      -dCompatibilityLevel=1.4 \
      -dPDFSETTINGS=${quality} \
      -dNOPAUSE \
      -dQUIET \
      -dBATCH \
      -sOutputFile="${outputPath}" \
      "${inputPath}"
    `;

    exec(command, (error) => {
      if (error) {
        console.error("Resize PDF Error:", error);

        return reject(
          new Error("Failed to resize PDF")
        );
      }

      // output validation
      if (!fs.existsSync(outputPath)) {
        return reject(
          new Error("Resized PDF not generated")
        );
      }

      resolve({
        success: true,
        outputPath,
      });
    });
  });
}

module.exports = {
  resizePDF,
};
