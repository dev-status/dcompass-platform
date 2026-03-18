import type { HTMLAttributes } from "react";
import clsx from "clsx";
import { colors, radii, shadows, surfaces } from "../design/tokens";

export type CardVariant = "panel" | "glass" | "accent";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  variant?: CardVariant;
  accent?: boolean;
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

export function Card({ title, variant = "panel", accent, children, className, style, ...props }: CardProps) {
  const background = variantBackground[variant];
  const borderColor = variantBorder[variant];
  const boxShadow = variantShadow[variant];

  return (
    <article
      className={clsx(
        "relative border p-6 shadow-2xl",
        className
      )}
      style={{
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
        <header className="mb-4 text-xs font-semibold uppercase tracking-[0.4em]" style={{ color: colors.textSecondary }}>
          {title}
        </header>
      ) : null}
      {children}
    </article>
  );
}
