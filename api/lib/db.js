import { neon } from "@neondatabase/serverless";

let sql = null;

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  if (!sql) {
    sql = neon(process.env.DATABASE_URL);
  }
  return sql;
}

export async function ensureDatabase() {
  const db = getSql();
  await db`
    CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      name VARCHAR(80) NOT NULL,
      email VARCHAR(120) NOT NULL,
      subject VARCHAR(120) NOT NULL DEFAULT 'Portfolio inquiry',
      message TEXT NOT NULL,
      read BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

export async function insertContact({ name, email, subject, message }) {
  const db = getSql();
  const rows = await db`
    INSERT INTO contacts (name, email, subject, message)
    VALUES (${name}, ${email}, ${subject}, ${message})
    RETURNING id, created_at
  `;
  return rows[0];
}
