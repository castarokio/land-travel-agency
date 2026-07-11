# Backend Migration Plan

## Phase 0 Decisions

Chosen stack for the full backend/admin shift:

- Runtime: Next.js App Router on a server-capable host such as Vercel or Node hosting.
- Database: Prisma with SQLite for local development, designed so the provider can move to Postgres before production.
- Auth: first-party admin session cookie using signed JWTs. Admin credentials come from environment variables.
- Content storage: canonical content collections in the database with static TypeScript fallback while the public site is migrated.
- Media storage: object storage later, not runtime writes into `public/assets`.

GitHub Pages stays supported only for static fallback builds. A real admin/backend cannot run inside the GitHub Pages static export.

## Phase 1 Canonical Content

The site previously had two active static content trees:

- `src/data/*`
- `lib/data/*`

The canonical source is now `src/content/canonical-content.ts`. Legacy exports in `lib/site-data.ts` should point at that canonical source instead of maintaining another independent content tree.

## Phase 2 Backend Foundation

The backend foundation consists of:

- `prisma/schema.prisma` for admin users, canonical content entries, leads, portal records, and media records.
- `src/lib/db/prisma.ts` for safe Prisma client reuse.
- `src/lib/admin/session.ts` for signed admin sessions.
- `src/lib/admin/auth.ts` for login, logout, and protected admin checks.
- `/admin/login` and protected `/admin` routes.
- `/api/admin/login` and `/api/admin/logout` route handlers.

## Phase 3 Public Content Reads

Public content should read through `src/lib/content/public-content.ts`.

During migration:

- Server routes can call async repository methods.
- Existing client-heavy components can continue receiving canonical static exports through `lib/site-data.ts`.
- When `DATABASE_URL` is present and the Prisma database is migrated/seeded, the content repository can read database rows.
- If database access fails or is unavailable, the public site falls back to canonical static content.

