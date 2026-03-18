# UI Lab

Internal visual playground for the DCompass design system. This app runs inside the monorepo and renders tokens, logos, components and surface variants so the design direction can be validated before shipping to client-facing experiences.

## Running the UI Lab

```bash
pnpm --filter ui-lab dev
```

Once running, open `http://localhost:3000` (or the port reported by the command) to explore palettes, typography, hero content and the primitives stored in `@dcompass/ui`.

## Purpose

- Demonstrates the premium / dark luxury brand direction described in feature 00002.
- Keeps tokens, components and branding centralized and consumable from any workspace package.
- Serves as living documentation and inspiration for future `clients-web` or `partners-web` updates.
