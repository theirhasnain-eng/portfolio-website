# Portfolio — Run & Deploy Guide

This project has two parts:

| Part | Folder | Purpose |
|------|--------|---------|
| **Frontend** | project root | React + Vite website |
| **Backend** | `server/` | Express API — saves contact form messages |

---

## Prerequisites

Install these before you start:

- [Node.js](https://nodejs.org/) **v18+** (v20+ recommended)
- [Git](https://git-scm.com/) (optional, for deployment)
- A code editor (VS Code, Cursor, etc.)

Check Node:

```bash
node -v
npm -v
```

---

## 1. First-time setup

Open a terminal in the project folder:

```bash
cd portfolio-web
```

Install all dependencies (frontend + backend):

```bash
npm run install:all
```

### Add your photo

Replace the placeholder with your own image:

```
public/images/profile.jpg
```

Recommended: portrait JPG/WebP, at least **800×1000 px**.

### Customize your content

Edit these files:

| File | What to change |
|------|----------------|
| `src/data/siteConfig.js` | Name, email, bio, social links, stats |
| `src/data/projects.js` | Projects, demo/GitHub URLs |
| `src/data/skills.js` | Skills and levels |
| `src/data/experience.js` | Jobs and education |

---

## 2. Run locally (development)

### Option A — Run everything (recommended)

Starts the website **and** the API together:

```bash
npm run dev
```

| Service | URL |
|---------|-----|
| Website | http://localhost:5173 |
| API | http://localhost:5000 |

> If port **5173** is busy, Vite may use **5174** — check the terminal output.

### Option B — Run frontend only

```bash
npm run dev:client
```

Contact form will **not** save messages unless the API is also running.

### Option C — Run backend only

```bash
npm run dev:server
```

API runs at http://localhost:5000

### Test the contact form

1. Open the site and go to the **Contact** section.
2. Submit the form.
3. Messages are saved to your **Neon PostgreSQL** database (`contacts` table).

### Local environment files (optional)

**Frontend** — create `.env` in the project root (only needed if API is on a different URL):

```env
# Leave empty for local dev (Vite proxies /api → localhost:5000)
VITE_API_URL=
```

**Backend** — create `server/.env`:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
DATABASE_URL=postgresql://user:password@ep-xxxx.neon.tech/neondb?sslmode=require
```

`DATABASE_URL` is **required** — the API uses PostgreSQL only.

---

## 3. Neon PostgreSQL (recommended for production)

Use [Neon](https://neon.tech) — free serverless PostgreSQL.

1. Sign up at [console.neon.tech](https://console.neon.tech).
2. Create a new project (e.g. `portfolio`).
3. Open your project → **Connection Details**.
4. Copy the **connection string** (choose **Node.js** or **psql** format).
5. Paste it into `server/.env` as `DATABASE_URL`.

Example `server/.env`:

```env
DATABASE_URL=postgresql://neondb_owner:YOUR_PASSWORD@ep-cool-name-12345678.us-east-2.aws.neon.tech/neondb?sslmode=require
```

Restart the server. You should see: `✓ Connected to Neon PostgreSQL`

The `contacts` table is created automatically on first start.

### View saved messages in Neon

1. Open Neon Console → your project → **SQL Editor**.
2. Run:

```sql
SELECT * FROM contacts ORDER BY created_at DESC;
```

---

## 4. Production build (test before deploy)

### Build the frontend

```bash
npm run build
```

Output folder: `dist/`

### Preview the production build locally

```bash
npm run preview
```

> For contact form in preview, run the API separately and set `VITE_API_URL=http://localhost:5000` in `.env` before `npm run build`.

---

## 5. Deploy overview

**Recommended:** deploy everything on **Vercel** (frontend + `/api` routes + Neon PostgreSQL).

```
┌──────────────────────────────────────┐      ┌─────────────────┐
│  Vercel (React site + /api/contact)  │ ───► │  Neon PostgreSQL│
└──────────────────────────────────────┘      └─────────────────┘
```

You can also run the Express server in `server/` on Render/Railway for local-style hosting.

---

## 6. Deploy the backend (API)

### Recommended: [Render](https://render.com) (free tier)

1. Push your code to **GitHub**.
2. On Render → **New** → **Web Service**.
3. Connect your repo.
4. Settings:

| Setting | Value |
|---------|--------|
| **Root Directory** | `server` |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

5. **Environment variables**:

| Key | Value |
|-----|--------|
| `PORT` | `5000` (or leave blank — Render sets `PORT` automatically) |
| `DATABASE_URL` | Your Neon PostgreSQL connection string |
| `CLIENT_URL` | Your live site URL, e.g. `https://your-portfolio.vercel.app` |

6. Deploy. Copy your API URL, e.g. `https://portfolio-api.onrender.com`

### Alternative: [Railway](https://railway.app)

1. New project → Deploy from GitHub.
2. Set root to `server` folder (or deploy only `server` as a separate service).
3. Add the same environment variables as above.
4. Start command: `npm start`

### Verify the API

Open in browser:

```
https://YOUR-API-URL/api/health
```

You should see JSON like:

```json
{ "ok": true, "database": "postgresql", "timestamp": "..." }
```

---

## 7. Deploy the frontend

### Recommended: [Vercel](https://vercel.com)

1. Import your GitHub repo on Vercel.
2. Framework preset: **Vite**
3. Settings:

| Setting | Value |
|---------|--------|
| **Root Directory** | `.` (project root — **not** `server/`) |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

4. **Environment variables** (Project → Settings → Environment Variables):

| Key | Value |
|-----|--------|
| `DATABASE_URL` | Your Neon PostgreSQL connection string |

Leave `VITE_API_URL` **empty** — the contact form calls `/api/contact` on the same domain.

5. Deploy.

6. Test: open `https://your-site.vercel.app/api/health` — should return `"ok": true`.

> `vercel.json` in the repo fixes SPA **404** errors by routing page requests to `index.html`.

### Alternative: [Netlify](https://netlify.com)

1. **Add new site** → Import from Git.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. **Environment variables** → add `VITE_API_URL` = your API URL.
5. Deploy.

### Alternative: GitHub Pages

GitHub Pages serves static files only (no server-side API). You still deploy the API elsewhere and set `VITE_API_URL` before build.

Add to `vite.config.js` if using a project subpath:

```js
export default defineConfig({
  base: '/your-repo-name/',
  // ...rest of config
})
```

---

## 8. After deployment checklist

- [ ] Website loads at your live URL
- [ ] Profile photo shows (`public/images/profile.jpg` was committed or uploaded)
- [ ] `VITE_API_URL` points to the live API
- [ ] `CLIENT_URL` on the API matches your live frontend URL
- [ ] `DATABASE_URL` (Neon) is set on the API host
- [ ] `/api/health` returns `"ok": true` and `"database": "postgresql"`
- [ ] Contact form submits successfully
- [ ] Message appears in Neon → SQL Editor → `SELECT * FROM contacts`

---

## 9. Common issues

### Port already in use

```text
Port 5173 is in use
Port 5000 is in use
```

**Fix:** Close other terminals running `npm run dev`, or change `PORT` in `server/.env`.

### Contact form fails locally

- Run `npm run dev` (both client + server).
- Or run `npm run dev:server` in a second terminal.

### Contact form fails after deploy

1. Check `VITE_API_URL` — must be the **full API URL** (no `/api` suffix).
2. Check `CLIENT_URL` on the server matches your **exact** frontend URL (including `https://`).
3. Open browser DevTools → **Network** → look for CORS or 404 errors.

### CORS error

Update `CLIENT_URL` in backend env to your production frontend URL and redeploy the API.

### PostgreSQL / Neon connection failed

- Confirm `DATABASE_URL` includes `?sslmode=require`.
- URL-encode special characters in the password (`@`, `#`, `%`, etc.).
- Copy a fresh connection string from Neon Console → Connection Details.
- Check API logs on Render/Railway for the exact error.

---

## 10. Quick command reference

| Command | Description |
|---------|-------------|
| `npm run install:all` | Install frontend + backend packages |
| `npm run dev` | Run website + API (development) |
| `npm run dev:client` | Frontend only |
| `npm run dev:server` | API only |
| `npm run build` | Build frontend for production |
| `npm run preview` | Preview production build locally |

---

## 11. Project structure

```
portfolio-web/
├── public/
│   └── images/profile.jpg    ← Your photo
├── server/                   ← Backend API (Express + Neon PostgreSQL)
│   ├── db/                   ← Database connection & schema
│   ├── index.js
│   ├── .env                  ← DATABASE_URL (do not commit)
│   └── data/                 ← (optional local folder)
├── src/                      ← React frontend
├── docs/
│   └── RUN-AND-DEPLOY.md     ← This file
├── .env                      ← VITE_API_URL (do not commit)
└── dist/                     ← Built frontend (after npm run build)
```

---

## Need help?

- Frontend issues → check the browser console (F12).
- API issues → check logs on Render/Railway dashboard.
- Database → Neon Console → SQL Editor → `SELECT * FROM contacts`
