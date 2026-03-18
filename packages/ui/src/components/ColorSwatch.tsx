import type { HTMLAttributes } from "react";
import clsx from "clsx";

export interface ColorSwatchProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  description?: string;
}

export function ColorSwatch({ label, value, description, className, ...props }: ColorSwatchProps) {
  return (
    <div className={clsx("rounded-3xl border border-white/5 bg-transparent", className)} {...props}>
      <div className="rounded-3xl" style={{ background: value, minHeight: 120 }} />
      <div className="mt-3 space-y-1 px-4 pb-4">
        <p className="text-sm font-semibold uppercase tracking-[0.4em]">{label}</p>
        <p className="text-xl font-bold">{value}</p>
        {description ? <p className="text-xs uppercase tracking-[0.3em] opacity-70">{description}</p> : null}
      </div>
    </div>
  );
}
