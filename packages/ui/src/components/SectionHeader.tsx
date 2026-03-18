import type { ReactNode } from "react";
import { colors, spacing, typography } from "../design/tokens";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  meta?: ReactNode;
}

export function SectionHeader({ eyebrow, title, description, meta }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      {eyebrow ? (
        <p
          className="text-[0.65rem] font-semibold uppercase tracking-[0.45em]"
          style={{ color: colors.textSecondary }}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className="text-3xl font-bold leading-tight"
        style={{ color: colors.textPrimary, fontFamily: typography.fonts.heading }}
      >
        {title}
      </h2>
      {description ? (
        <p
          className="text-base leading-relaxed"
          style={{ color: colors.textSecondary, fontFamily: typography.fonts.body }}
        >
          {description}
        </p>
      ) : null}
      {meta ? (
        <div
          style={{
            borderTop: `1px solid ${colors.border}`,
            paddingTop: spacing.xs
          }}
        >
          {meta}
        </div>
      ) : null}
    </div>
  );
}
