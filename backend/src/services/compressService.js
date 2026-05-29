const { exec } = require("child_process");
const fs = require("fs");

/**
 * Compress PDF using Ghostscript
 * Optimized for aggressive compression (~50KB target)
 */

function compressPDF(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    // file exists check
    if (!fs.existsSync(inputPath)) {
      return reject(new Error("Input PDF file not found"));
    }

    /**
     * Ghostscript compression command
     *
     * /screen  = strongest compression
     * good for:
     * - government forms
     * - student uploads
     * - job applications
     */

    const command = `
      gs \
      -sDEVICE=pdfwrite \
      -dCompatibilityLevel=1.4 \
      -dPDFSETTINGS=/screen \
      -dNOPAUSE \
      -dQUIET \
      -dBATCH \
      -sOutputFile="${outputPath}" \
      "${inputPath}"
    `;

    exec(command, (error) => {
      if (error) {
        console.error("Ghostscript Compress Error:", error);

        return reject(
          new Error("Failed to compress PDF")
        );
      }

      // output exists check
      if (!fs.existsSync(outputPath)) {
        return reject(
          new Error("Compressed PDF not generated")
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
  compressPDF,
};
