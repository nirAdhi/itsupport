# Prasan IT

Marketing site and client portal for Prasan IT, a managed IT support business based in Dublin, Ireland. It has three parts:

- A public marketing site (`/`, `/about`, `/privacy`, `/terms`) with a contact form that creates support tickets.
- A client area (`/register`, `/login`, `/dashboard`) with an account that links out to the Mesh Connect remote-support tool.
- An admin area (`/admin/dashboard`) for managing submitted support tickets.

Built with Next.js 16 (App Router), Prisma + SQLite, and a self-hosted JWT-based auth system (no third-party auth provider).

## Local development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env.local` and fill in the values (see [Environment variables](#environment-variables) below).
3. Apply the database schema:
   ```bash
   npx prisma migrate dev
   ```
4. (Optional) create an admin user for local testing:
   ```bash
   ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD=change-me node seed.mjs
   ```
5. Start the dev server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

Other scripts: `npm run build`, `npm run start` (builds/runs a standard Next.js server — note this differs from the Docker image, which runs the standalone server directly), `npm run lint`.

## Environment variables

See `.env.example` for the full list. Required:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | SQLite connection string, e.g. `file:./dev.db` |
| `JWT_SECRET` | Long random string used to sign session tokens. Generate with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Used once by `seed.mjs` to create the initial admin account. Only takes effect if no user with that email exists yet — it will not overwrite a password you later change. |

Optional (ticket notification emails are silently skipped if unset):

| Variable | Purpose |
|---|---|
| `SMTP_HOST`, `SMTP_PORT`, `EMAIL_USER`, `EMAIL_PASS` | SMTP credentials used to email the admin inbox when a new support ticket is submitted. |

## Data model

- `User` — `email`, hashed `password`, `role` (`USER` or `ADMIN`). Public registration always creates a `USER`; admins are only created via `seed.mjs`.
- `Ticket` — a support request submitted through the public contact form: `name`, `email`, `issue`, optional `scheduledDate`, and a `status` (`PENDING`/`RESOLVED`) that admins can update from `/admin/dashboard`.

Schema changes go through Prisma Migrate (`npx prisma migrate dev --name <description>`), not `db push` — migration files are committed under `prisma/migrations/` and applied in production with `prisma migrate deploy`.

## Deploying with Docker

```bash
cp .env.example .env   # fill in real values; this file is gitignored
docker compose up -d --build
```

The container will refuse to start if `JWT_SECRET`, `ADMIN_EMAIL`, or `ADMIN_PASSWORD` aren't set. On startup it applies pending Prisma migrations, seeds the admin account if it doesn't already exist, then starts the server. The SQLite database persists across restarts in the `sqlite-data` Docker volume.

For HTTPS in production, put this behind a reverse proxy (e.g. Caddy or nginx) terminating TLS and forwarding to port `3001` (see the commented-out Caddy service in `docker-compose.yml` for a starting point).

## Security notes

- Never commit `.env`, `.env.local`, or `prisma/*.db` — they're gitignored. If you need to change the admin password after initial seeding, do it through a direct database update or a future admin UI, not by editing `seed.mjs`.
- `/dashboard` and `/admin` are protected by `src/proxy.ts` (Next.js's routing proxy/middleware), which validates the session cookie and checks role for `/admin` routes.
