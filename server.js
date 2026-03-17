/**
 * PORTFOLIO 2.0 - ADVANCED CORE SERVER
 * Industrial-Grade Performance & Security
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const path = require("path");

// --- 1. CORE INITIALIZATION ---
const app = express();
const PORT = process.env.PORT || 3000;

// --- 2. SECURITY & OPTIMIZATION ---
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "script-src": ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com"],
        "style-src": [
          "'self'",
          "'unsafe-inline'",
          "fonts.googleapis.com",
          "cdnjs.cloudflare.com",
        ],
        "font-src": ["'self'", "fonts.gstatic.com", "cdnjs.cloudflare.com"],
        "img-src": ["'self'", "data:", "ui-avatars.com", "*"],
      },
    },
  }),
);
app.use(compression()); // Gzip for performance
app.use(morgan("dev")); // Telemetry logging
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// --- 3. RATE LIMITING (Anti-Spam) ---
const ipLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    error: "Neural link congested. Rate limit exceeded for 15 minutes.",
  },
});

// --- 4. TELEMETRY DATA ---
const TELEMETRY = {
  projects: [
    {
      title: "NexGen Strategic Hub",
      category: "Full-Stack Ecosystem",
      impact: "35% EFFICIENCY",
    },
    {
      title: "Stellar Insights Hub",
      category: "Predictive Intelligence",
      impact: "12M+ DATA POINTS",
    },
    {
      title: "Aegis Security Core",
      category: "Cyber Infrastructure",
      impact: "0 BREACHES",
    },
  ],
  stats: {
    projectsCompleted: 85,
    globalClients: 12,
    awardsWon: 4,
    uptime: "99.9%",
  },
};

// --- 5. SYSTEM ROUTES ---

// Health Check
app.get("/api/health", (req, res) =>
  res.json({ status: "OPTIMAL", uptime: process.uptime() }),
);

// Stats Feed
app.get("/api/stats", (req, res) => res.json(TELEMETRY.stats));

// Projects Feed
app.get("/api/projects", (req, res) => res.json(TELEMETRY.projects));

// Contact Synchronization
app.post("/api/contact", ipLimiter, async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Required telemetry fields missing." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ error: "Invalid communication channel format." });
  }

  try {
    // Simulated Neural Sync delay
    await new Promise((resolve) => setTimeout(resolve, 850));

    console.log(
      `[TELEMETRY SYNC] From: ${name} <${email}> Subject: ${subject}`,
    );
    res.status(200).json({
      message: "Neural synchronization successful. Transmissions received.",
      syncId: `SYNC-${Math.random().toString(36).substring(7).toUpperCase()}`,
    });
  } catch (err) {
    res.status(500).json({ error: "Global network failure. Sync aborted." });
  }
});

// SPA FALLBACK
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html")),
);

// --- 6. CRITICAL ERROR CATCH ---
app.use((err, req, res, next) => {
  console.error(`[CORE ERROR] ${err.message}`);
  res.status(500).json({ error: "INTERNAL REFINEMENT MODAL ACTIVE." });
});

// --- 7. ENGINE IGNITION ---
app.listen(PORT, () => {
  console.clear();
  console.log("\x1b[35m%s\x1b[0m", "========================================");
  console.log("\x1b[35m%s\x1b[0m", "   PORTFOLIO 2.0 ADVANCED CORE v2.0     ");
  console.log("\x1b[35m%s\x1b[0m", "========================================");
  console.log("\x1b[36m%s\x1b[0m", `[INTERFACE] http://localhost:${PORT}`);
  console.log("\x1b[33m%s\x1b[0m", `[STATUS] SECURE | OPTIMIZED | SYNC-READY`);
});
