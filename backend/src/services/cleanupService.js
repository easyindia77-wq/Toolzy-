const fs = require("fs");
const path = require("path");

/**
 * Auto delete old files
 * Prevents storage overflow
 */

const uploadsDir = path.join(__dirname, "../uploads");
const outputDir = path.join(__dirname, "../output");
const tempDir = path.join(__dirname, "../temp");

// delete files older than X milliseconds
const MAX_FILE_AGE = 1000 * 60 * 60; // 1 hour

/**
 * Delete old files from folder
 */
function cleanFolder(folderPath) {
  try {
    // folder exists check
    if (!fs.existsSync(folderPath)) {
      return;
    }

    const files = fs.readdirSync(folderPath);

    files.forEach((file) => {
      // skip .gitkeep
      if (file === ".gitkeep") return;

      const filePath = path.join(folderPath, file);

      try {
        const stats = fs.statSync(filePath);

        const now = Date.now();

        const fileAge = now - stats.mtimeMs;

        // delete old files
        if (fileAge > MAX_FILE_AGE) {
          fs.unlinkSync(filePath);

          console.log(`🗑 Deleted old file: ${file}`);
        }
      } catch (err) {
        console.error("Cleanup File Error:", err);
      }
    });
  } catch (error) {
    console.error("Cleanup Folder Error:", error);
  }
}

/**
 * Run cleanup for all folders
 */
function runCleanup() {
  cleanFolder(uploadsDir);
  cleanFolder(outputDir);
  cleanFolder(tempDir);
}

/**
 * Start auto cleanup interval
 */
function startCleanupService() {
  // run immediately
  runCleanup();

  // run every 30 minutes
  setInterval(() => {
    runCleanup();
  }, 1000 * 60 * 30);

  console.log("🧹 Cleanup service started");
}

module.exports = {
  startCleanupService,
};
