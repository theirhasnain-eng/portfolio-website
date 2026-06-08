import { ensureDatabase, insertContact } from "./lib/db.js";
import { validateContactBody } from "./lib/validate.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { errors, data } = validateContactBody(req.body ?? {});
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    await ensureDatabase();
    const contact = await insertContact(data);

    return res.status(201).json({
      success: true,
      message: "Message received successfully!",
      id: contact.id,
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
}
