import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { colors, radii, shadows, spacing } from "../design/tokens";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const baseClasses = "inline-flex items-center justify-center gap-2 rounded-full border font-semibold uppercase tracking-[0.25em] transition-all duration-200";

const sizeConfig: Record<ButtonSize, { fontSize: string; padding: string }> = {
  sm: { fontSize: "0.64rem", padding: `${spacing.xs} ${spacing.sm}` },
  md: { fontSize: "0.78rem", padding: `${spacing.sm} ${spacing.md}` },
  lg: { fontSize: "0.91rem", padding: `${spacing.md} ${spacing.xl}` }
};

const variantConfig: Record<ButtonVariant, { background: string; color: string; border: string; shadow?: string }> = {
  primary: {
    background: colors.accent,
    color: colors.textPrimary,
    border: `1px solid ${colors.accent}`,
    shadow: shadows.glow
  },
  secondary: {
    background: colors.surface,
    color: colors.textPrimary,
    border: `1px solid ${colors.border}`
  },
  ghost: {
    background: "transparent",
    color: colors.accent,
    border: `1px solid ${colors.accent}`
  }
};

export function Button({ variant = "primary", size = "md", fullWidth, style, className, ...props }: ButtonProps) {
  const variantStyle = variantConfig[variant];
  const sizeStyle = sizeConfig[size];

  return (
    <button
      type="button"
      className={clsx(baseClasses, fullWidth ? "w-full" : "", className)}
      style={{
        background: variantStyle.background,
        color: variantStyle.color,
        border: variantStyle.border,
        boxShadow: variantStyle.shadow,
        borderRadius: radii.base,
        fontSize: sizeStyle.fontSize,
        padding: sizeStyle.padding,
        ...style
      }}
      {...props}
    />
  );
}
