const rateLimit = require("express-rate-limit");

/**
 * Toolzy API Rate Limiter
 * Protects server from spam & abuse
 */

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 100, // max requests per IP

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many requests. Please wait a few minutes and try again.",
  },
});

module.exports = limiter;
