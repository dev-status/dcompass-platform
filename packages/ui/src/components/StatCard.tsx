import type { ReactNode } from "react";
import { Card } from "./Card";
import { colors, typography } from "../design/tokens";

export type StatTone = "neutral" | "positive" | "warning" | "danger" | "info";

export interface StatCardProps {
  label: string;
  value: string;
  helper?: string;
  delta?: string;
  tone?: StatTone;
  icon?: ReactNode;
}

const toneColor: Record<StatTone, string> = {
  neutral: colors.textSecondary,
  positive: colors.success,
  warning: colors.warning,
  danger: colors.danger,
  info: colors.info
};

export function StatCard({ label, value, helper, delta, tone = "neutral", icon }: StatCardProps) {
  return (
    <Card variant="glass" className="space-y-4">
      <div className="flex items-center justify-between gap-4" style={{ color: colors.textSecondary }}>
        <span className="text-[0.7rem] uppercase tracking-[0.45em]">{label}</span>
        {delta ? (
          <span className="text-[0.75rem] font-semibold tracking-[0.3em]" style={{ color: toneColor[tone] }}>
            {delta}
          </span>
        ) : null}
      </div>
      <div className="flex items-baseline gap-4">
        {icon ? <div className="text-[1.2rem]" style={{ color: colors.textSecondary }}>{icon}</div> : null}
        <strong
          className="text-2xl"
          style={{ color: colors.textPrimary, fontFamily: typography.fonts.heading }}
        >
          {value}
        </strong>
      </div>
      {helper ? (
        <p className="text-sm leading-relaxed tracking-[0.05em]" style={{ color: colors.textTertiary }}>
          {helper}
        </p>
      ) : null}
    </Card>
  );
}
