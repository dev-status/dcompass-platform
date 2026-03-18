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
    <Card variant="glass" className="space-y-2">
      <div className="flex items-center justify-between" style={{ color: colors.textSecondary }}>
        <span className="text-[0.65rem] uppercase tracking-[0.4em]">{label}</span>
        {delta ? (
          <span className="text-[0.65rem] font-semibold" style={{ color: toneColor[tone] }}>
            {delta}
          </span>
        ) : null}
      </div>
      <div className="flex items-baseline gap-3">
        {icon ? <div className="text-xl">{icon}</div> : null}
        <strong className="text-2xl" style={{ color: colors.textPrimary, fontFamily: typography.fonts.heading }}>
          {value}
        </strong>
      </div>
      {helper ? (
        <p className="text-xs" style={{ color: colors.textTertiary }}>
          {helper}
        </p>
      ) : null}
    </Card>
  );
}
