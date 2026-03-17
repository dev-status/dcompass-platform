# DCompass Platform

Monorepo bootstrap for the DCompass rebuild. This workspace is powered by **pnpm workspaces** + **Turborepo** and provides the new technical trunk for all DCompass surfaces.

## Workspace layout

```
apps/
  ├── clients-web    Next.js + Tailwind + React for clients
  ├── partners-web   Next.js + Tailwind + React for partners
  └── scanner-app    Placeholder/landing for the future React Native scanner
packages/
  ├── auth           Firebase-related helpers (env parsing, init)
  ├── config         Shared config + env schema
  ├── db             Prisma space (schema + placeholder client today)
  ├── domain         Types + enums shared across apps
  ├── ui             Shared primitives (Hero, badges, etc.)
  └── validation     Zod schemata for ticket/reservation flows
```

## Getting started

```bash
pnpm install
```

### Local development

Each app exposes its own dev server:

```bash
pnpm --filter clients-web dev      # http://localhost:3000 (default)
pnpm --filter partners-web dev     # http://localhost:3000 (or choose another port)
pnpm --filter scanner-app dev      # placeholder runner (prints intent)
```

`scanner-app` is currently a placeholder that emits an informational message. Replace it with an Expo/React Native project in a later sprint.

### Workspace scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Runs `turbo run dev --parallel` (watch all `dev` scripts in apps) |
| `pnpm build` | Builds everything (`turbo run build`) |
| `pnpm lint` | Runs lint on every package & app (`turbo run lint`) |
| `pnpm typecheck` | Runs `tsc --noEmit` everywhere (`turbo run typecheck`) |
| `pnpm db:generate` | Proxy to `prisma generate` inside `packages/db` once the client is wired |

### Shared packages

- `@dcompass/auth`: Firebase initialization + schema helpers
- `@dcompass/config`: Environment schema + feature flags
- `@dcompass/db`: Prisma-wide schema + placeholder client (update once `prisma generate` is wired)
- `@dcompass/domain`: Typed enums, schemas, and domain helpers (roles, partners, events)
- `@dcompass/ui`: Tailwind-friendly primitives (Hero, status badges, etc.) used by both web apps
- `@dcompass/validation`: Zod-based validation shapes for reservations and QR data

Apps import these packages via workspace dependencies (e.g., `@dcompass/ui`). Update the packages in-place; the apps will pick up the source because `tsconfig` aliases point to `packages/*/src`.

## Notes

- Prisma schema lives at `packages/db/prisma/schema.prisma`; generate the client once a working database is available.
- `scanner-app` is intentionally non-functional. Treat it as a reminder to add the native scanner surface later.
- Use Turborepo for orchestrating builds/lints/typechecks so you can scale up with more apps/packages.
