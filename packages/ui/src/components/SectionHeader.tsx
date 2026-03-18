import type { ReactNode } from "react";
import { colors, typography } from "../design/tokens";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  meta?: ReactNode;
}

export function SectionHeader({ eyebrow, title, description, meta }: SectionHeaderProps) {
  return (
    <div className="space-y-2">
      {eyebrow ? (
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.5em]" style={{ color: colors.textSecondary }}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-bold" style={{ color: colors.textPrimary, fontFamily: typography.fonts.heading }}>
        {title}
      </h2>
      {description ? (
        <p className="text-sm" style={{ color: colors.textSecondary, fontFamily: typography.fonts.body }}>
          {description}
        </p>
      ) : null}
      {meta ? <div className="pt-2">{meta}</div> : null}
    </div>
  );
}
