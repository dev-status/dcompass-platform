# @dcompass/ui

Design primitives, tokens, and brand assets for the DCompass platform. This package powers the base system and the UI playground inside `apps/ui-lab`.

## Design tokens
- **Colors**: `colors.background`, `colors.surface`, `colors.accent`, `colors.success`, `colors.warning`, etc.
- **Surfaces**: `surfaces.core`, `surfaces.panel`, `surfaces.partners`, `surfaces.glass` expose tonal layers for general and partner contexts.
- **Spacing**: `spacing` values (xxs-xl) and `spacingScale` provide consistent gaps.
- **Radii & shadows**: `radii` define rounded corners while `shadows` capture the premium glow.
- **Typography**: `typography.fonts`, `typography.weights`, `typography.scale`, and `typography.notes` publish the editorial rules for Space Grotesk + Inter.

## Brand assets
- Assets are centralized behind `brandAssets` (`mainLogo`, `lettersLogo`, `partnersLettersLogo`).
- Consume them via `import { brandAssets } from "@dcompass/ui"` in your app, or pass them directly to `<Image>`/`<img>` tags.

## Reusable primitives
- Layout & UI blocks: `<Card>`, `<HeroPanel>`, `<SectionHeader>`, `<EmptyState>`, `<StatCard>`
- Inputs & actions: `<Button>`, `<InputField>`, `<StatusBadge>`
- Visual helpers: `<ColorSwatch>` + `colors`, `surfaces` collections

Each component leans on the shared tokens, so apps do not need to re-define colors or typography — they just consume the exported values.

## Development
- Run `pnpm --filter @dcompass/ui build` to ensure the package type-checks.
- The `/ui-lab` app (see workspace-level README) showcases every primitive and token so you can iterate visually before touching the real surfaces.
