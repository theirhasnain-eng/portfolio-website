import { Router } from "express";
import { insertContact } from "../db/index.js";

const router = Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateBody(body) {
  const errors = {};
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const subject = body.subject?.trim() ?? "Portfolio inquiry";
  const message = body.message?.trim() ?? "";

  if (!name || name.length < 2) errors.name = "Name must be at least 2 characters";
  if (!email || !EMAIL_REGEX.test(email)) errors.email = "Valid email is required";
  if (!message || message.length < 10)
    errors.message = "Message must be at least 10 characters";
  if (subject.length > 120) errors.subject = "Subject is too long";

  return { errors, data: { name, email, subject, message } };
}

router.post("/", async (req, res, next) => {
  try {
    if (!req.app.locals.dbConnected) {
      return res.status(503).json({
        success: false,
        message: "Database is not configured. Set DATABASE_URL in .env",
      });
    }

    const { errors, data } = validateBody(req.body);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const contact = await insertContact(data);
    return res.status(201).json({
      success: true,
      message: "Message received successfully!",
      id: contact.id,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/health", (req, res) => {
  res.json({
    ok: req.app.locals.dbConnected,
    database: "postgresql",
  });
});

export default router;
