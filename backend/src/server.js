const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const limiter = require("./middleware/limiter");

const compressRoute = require("./routes/compress");
const mergeRoute = require("./routes/merge");
const imageToPdfRoute = require("./routes/imageToPdf");
const pdfToWordRoute = require("./routes/pdfToWord");
const resizeRoute = require("./routes/resize");

const { startCleanupService } = require("./services/cleanupService");

const app = express();

/* =========================
   REQUIRED DIRECTORIES
========================= */

const requiredFolders = [
  path.join(__dirname, "uploads"),
  path.join(__dirname, "output"),
  path.join(__dirname, "temp"),
];

requiredFolders.forEach((folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });

    console.log(`📁 Created folder: ${folder}`);
  }
});

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// rate limit
app.use(limiter);

/* =========================
   STATIC OUTPUT FILES
========================= */

app.use(
  "/output",
  express.static(path.join(__dirname, "output"))
);

/* =========================
   API ROUTES
========================= */

app.use("/api/compress", compressRoute);

app.use("/api/merge", mergeRoute);

app.use("/api/image-to-pdf", imageToPdfRoute);

app.use("/api/pdf-to-word", pdfToWordRoute);

app.use("/api/resize", resizeRoute);

/* =========================
   ROOT ROUTE
========================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Toolzy Backend Running",
    website: "https://toolzy.online",
    api: "https://api.toolzy.online",
  });
});

/* =========================
   404 HANDLER
========================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* =========================
   ERROR HANDLER
========================= */

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

/* =========================
   START CLEANUP SERVICE
========================= */

startCleanupService();

/* =========================
   START SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
========================================
🚀 TOOLZY BACKEND STARTED
🌍 PORT: ${PORT}
🔗 API: https://api.toolzy.online
========================================
  `);
});
