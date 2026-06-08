import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import { connectDatabase } from "./db/index.js";
import contactRoutes from "./routes/contact.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.locals.dbConnected = false;

const allowedOrigins = [
  CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  })
);
app.use(express.json({ limit: "32kb" }));

app.use(
  "/api/contact",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: {
      success: false,
      message: "Too many requests. Please try again later.",
    },
  })
);

app.use("/api/contact", contactRoutes);

app.get("/api/health", (_req, res) => {
  res.json({
    ok: app.locals.dbConnected,
    database: "postgresql",
    timestamp: new Date().toISOString(),
  });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Server error. Please try again later.",
  });
});

if (!process.env.DATABASE_URL) {
  console.error("✗  DATABASE_URL is required. Add your Neon PostgreSQL URL to server/.env");
  process.exit(1);
}

try {
  app.locals.dbConnected = await connectDatabase();
  console.log("✓  Connected to Neon PostgreSQL");
} catch (err) {
  console.error("✗  PostgreSQL connection failed:", err.message);
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`✓  API server running at http://localhost:${PORT}`);
});
