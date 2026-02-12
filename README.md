# CoiffeDom - Commercial-Grade French Marketplace

CoiffeDom is a startup-grade SaaS marketplace connecting clients with mobile hairdressers (at-home services), designed for French-speaking markets (France, Belgium, Switzerland).

## Product Scope

- **Roles:** Client, Hairdresser, Admin
- **Authentication:** Signup/Login, JWT access/refresh, bcrypt hashing, role-based route protection
- **Hairdresser profiles:** premium profile structure, specialties, location, availability, pricing, trust badges
- **Bookings:** full lifecycle (`EN_ATTENTE`, `CONFIRMEE`, `TERMINEE`, `ANNULEE`)
- **Reviews:** post-booking social proof structure
- **Admin:** metrics endpoint and moderation-ready architecture
- **Security baseline:** Helmet, CORS, rate limiting, DTO validation with Zod

## Monorepo Structure

- `apps/api` → Express + TypeScript API
- `apps/web` → Next.js + Tailwind premium French UI shell
- `packages/shared` → shared constants/types
- `prisma` → PostgreSQL schema
- `data/seed-data.json` → realistic French seed fixture
- `scripts/generate-french-marketplace-seed.js` → deterministic seed generator
- `infra/docker-compose.yml` → local orchestration

## Local Setup

```bash
npm install
cp .env.example .env
npm run seed:marketplace
npm run dev
```

- API: `http://localhost:4000/api`
- Web: `http://localhost:3000`

## API Endpoints (French-facing)

- `POST /api/auth/inscription`
- `POST /api/auth/connexion`
- `POST /api/auth/mot-de-passe-oublie`
- `GET /api/coiffeurs`
- `GET /api/avis`
- `GET /api/admin/metrics` (ADMIN only)

## Seed Data Requirements Covered

- 50 hairdressers (French-speaking dataset)
- 300 reviews (French tone, varied ratings)
- 240 historical bookings
- EUR pricing and locale metadata

## Deployment

Docker assets are provided under `infra/`.
Use `infra/docker-compose.yml` for local production-like startup and migrate to managed PostgreSQL + cloud hosting for production.

## Notes for Production Hardening

- Replace in-memory storage with Prisma repositories.
- Add Stripe payment intents + webhooks + invoice service.
- Add email provider (verification + password reset).
- Implement refresh-token rotation and revocation persistence.
- Add observability (OpenTelemetry, structured logs, audit trails).
