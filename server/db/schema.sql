-- Neon PostgreSQL schema for portfolio contact messages
-- This table is auto-created on server start (see db/index.js)

CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  email VARCHAR(120) NOT NULL,
  subject VARCHAR(120) NOT NULL DEFAULT 'Portfolio inquiry',
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- View all messages (run in Neon SQL Editor):
-- SELECT * FROM contacts ORDER BY created_at DESC;
