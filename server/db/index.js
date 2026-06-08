import { neon } from "@neondatabase/serverless";

let sql = null;

export function getDb() {
  if (!sql) {
    throw new Error("Database not initialized");
  }
  return sql;
}

export async function connectDatabase() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  sql = neon(databaseUrl);

  await sql`
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

  return true;
}

export async function insertContact({ name, email, subject, message }) {
  const db = getDb();
  const rows = await db`
    INSERT INTO contacts (name, email, subject, message)
    VALUES (${name}, ${email}, ${subject}, ${message})
    RETURNING id, created_at
  `;
  return rows[0];
}
