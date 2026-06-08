import { ensureDatabase } from "./lib/db.js";

export default async function handler(_req, res) {
  try {
    if (!process.env.DATABASE_URL) {
      return res.status(503).json({
        ok: false,
        database: "postgresql",
        error: "DATABASE_URL is not configured",
      });
    }

    await ensureDatabase();

    return res.json({
      ok: true,
      database: "postgresql",
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Health check error:", err);
    return res.status(503).json({
      ok: false,
      database: "postgresql",
      error: err.message,
    });
  }
}
