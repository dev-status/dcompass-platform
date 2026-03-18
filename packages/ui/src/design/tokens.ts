export const colors = {
  background: "#141219",
  subBackground: "#1b1626",
  surface: "#2C2838",
  surfaceMuted: "#211b2c",
  accent: "#8259d0",
  accentBlend: "#8259d048",
  border: "#3a3249",
  textPrimary: "#f4f1ff",
  textSecondary: "#b9b0d8",
  textTertiary: "#7a7390",
  highlight: "#d7bfff",
  success: "#2FD6A8",
  info: "#73c6ff",
  warning: "#f5c57a",
  danger: "#ff5b6c"
} as const;

export type ColorToken = keyof typeof colors;

export const surfaces = {
  core: colors.background,
  canvas: colors.subBackground,
  panel: colors.surface,
  panelSoft: colors.surfaceMuted,
  partners: "#100b1f",
  glass: "rgba(255, 255, 255, 0.04)",
  accent: colors.accent
} as const;

export const spacing = {
  xxs: "4px",
  xs: "10px",
  sm: "16px",
  md: "24px",
  lg: "34px",
  xl: "48px",
  xxl: "64px"
} as const;

export const radii = {
  soft: "14px",
  base: "24px",
  shell: "32px",
  pill: "999px"
} as const;

export const shadows = {
  card: "0 30px 60px rgba(6, 2, 20, 0.75)",
  glow: `0 0 40px ${colors.accent}66`,
  inset: "inset 0 1px 0 rgba(255, 255, 255, 0.15)"
} as const;

export const typography = {
  fonts: {
    heading: "Space Grotesk, 'Geist', system-ui, sans-serif",
    body: "Inter, 'Geist', system-ui, sans-serif"
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  scale: {
    display: "3.2rem",
    hero: "2.4rem",
    headline: "1.8rem",
    body: "1rem",
    label: "0.75rem"
  },
  notes: "Use Space Grotesk for expressive headings and Inter for callouts/body copy. Keep letter spacing tight for premium feel."
} as const;

export const surfaceTokens = [
  {
    name: "DCompass Core",
    description: "Brand canvas, ready for calls-to-action.",
    color: surfaces.core,
    accent: colors.accent
  },
  {
    name: "Partners",
    description: "A darker, contrast-heavy layer for partner experiences.",
    color: surfaces.partners,
    accent: "#a478ff"
  }
] as const;

export const spacingScale = [spacing.xs, spacing.sm, spacing.md, spacing.lg, spacing.xl];
