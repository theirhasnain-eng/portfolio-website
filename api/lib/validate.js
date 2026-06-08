const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactBody(body) {
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
