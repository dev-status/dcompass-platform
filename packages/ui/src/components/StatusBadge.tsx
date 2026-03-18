import type { ReactNode } from "react";
import clsx from "clsx";
import { colors, radii } from "../design/tokens";

export type StatusTone = "positive" | "info" | "warning" | "danger";

export interface StatusBadgeProps {
  label: string;
  tone?: StatusTone;
  detail?: ReactNode;
}

const toneMap: Record<StatusTone, { background: string; color: string }> = {
  positive: { background: "rgba(47, 214, 168, 0.12)", color: colors.success },
  info: { background: "rgba(115, 198, 255, 0.15)", color: colors.info },
  warning: { background: "rgba(245, 197, 122, 0.2)", color: colors.warning },
  danger: { background: "rgba(255, 91, 108, 0.25)", color: colors.danger }
};

export function StatusBadge({ label, tone = "info", detail }: StatusBadgeProps) {
  const palette = toneMap[tone];
  return (
    <div
      className={clsx("inline-flex items-center rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em]")}
      style={{
        background: palette.background,
        color: palette.color,
        borderRadius: radii.pill
      }}
    >
      {label}
      {detail ? <span className="ml-2 text-[0.55rem] font-normal normal-case tracking-[0.2em]">{detail}</span> : null}
    </div>
  );
}
