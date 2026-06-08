const API_BASE = import.meta.env.VITE_API_URL || "";

export async function submitContact(formData) {
  const res = await fetch(`${API_BASE}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      data.message ||
      data.errors?.email ||
      data.errors?.name ||
      data.errors?.message ||
      "Failed to send message. Please try again.";
    throw { message, errors: data.errors };
  }

  return data;
}
