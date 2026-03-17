import type { ReactNode } from "react";
import clsx from "clsx";

export type StatusTone = "positive" | "info" | "warning";

export interface StatusBadgeProps {
  label: string;
  tone?: StatusTone;
  detail?: ReactNode;
}

const toneMap: Record<StatusTone, string> = {
  positive: "bg-emerald-500/10 text-emerald-600",
  info: "bg-sky-500/10 text-sky-600",
  warning: "bg-amber-500/10 text-amber-600"
};

export function StatusBadge({ label, tone = "info", detail }: StatusBadgeProps) {
  return (
    <div className={clsx("rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide", toneMap[tone])}>
      {label}
      {detail ? <span className="ml-2 text-[0.65rem] font-light normal-case">{detail}</span> : null}
    </div>
  );
}
