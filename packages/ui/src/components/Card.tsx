import type { HTMLAttributes } from "react";
import clsx from "clsx";
import { colors, radii, shadows, surfaces, spacing } from "../design/tokens";

export type CardVariant = "panel" | "glass" | "accent";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  variant?: CardVariant;
}

const variantBackground = {
  panel: surfaces.panel,
  glass: surfaces.glass,
  accent: colors.accent
};

const variantBorder = {
  panel: colors.border,
  glass: "rgba(255,255,255,0.15)",
  accent: colors.accent
};

const variantShadow = {
  panel: shadows.card,
  glass: "0 20px 40px rgba(0, 0, 0, 0.45)",
  accent: shadows.glow
};

const variantPadding: Record<CardVariant, string> = {
  panel: spacing.lg,
  glass: spacing.lg,
  accent: spacing.md
};

export function Card({ title, variant = "panel", children, className, style, ...props }: CardProps) {
  const background = variantBackground[variant];
  const borderColor = variantBorder[variant];
  const boxShadow = variantShadow[variant];
  const padding = variantPadding[variant];

  return (
    <article
      className={clsx(
        "relative border shadow-2xl",
        className
      )}
      style={{
        padding,
        background,
        borderColor,
        borderRadius: radii.shell,
        boxShadow,
        color: colors.textPrimary,
        ...style
      }}
      {...props}
    >
      {title ? (
        <header
          className="text-xs font-semibold uppercase tracking-[0.4em]"
          style={{ color: colors.textSecondary, marginBottom: spacing.sm }}
        >
          {title}
        </header>
      ) : null}
      {children}
    </article>
  );
}
