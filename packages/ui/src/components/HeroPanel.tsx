import type { ReactNode } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export type HeroAction = {
  label: string;
  description?: string;
  href: string;
  accent?: "primary" | "secondary";
};

export interface HeroPanelProps {
  title: string;
  summary: string;
  accent?: string;
  highlight?: string;
  actions?: HeroAction[];
  children?: ReactNode;
}

const actionTone = {
  primary: "bg-primary text-white hover:bg-orange-500",
  secondary: "border border-primary text-primary hover:bg-primary/10"
};

export function HeroPanel({
  title,
  summary,
  highlight,
  accent,
  actions = [],
  children
}: HeroPanelProps) {
  return (
    <section
      className={twMerge(
        "w-full max-w-5xl space-y-6 rounded-3xl border border-white/20 bg-white/70 p-8 shadow-2xl backdrop-blur",
        "dark:border-white/10 dark:bg-black/60"
      )}
    >
      <div className="space-y-2">
        {highlight ? (
          <p className={twMerge("text-sm font-semibold uppercase tracking-[0.3em]", accent ? "text-orange-500" : "text-primary")}>
            {highlight}
          </p>
        ) : null}
        <h1
          className="text-4xl font-semibold leading-tight text-zinc-900 dark:text-zinc-100"
          style={accent ? { color: accent } : undefined}
        >
          {title}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300">{summary}</p>
      </div>
      <div className="flex flex-wrap gap-4">
        {actions.map((action) => (
          <a
            key={action.label}
            href={action.href}
            className={clsx(
              "rounded-full px-5 py-3 text-sm font-semibold transition",
              actionTone[action.accent ?? "primary"]
            )}
          >
            {action.label}
            {action.description ? (
              <span className="block text-xs font-normal opacity-80">{action.description}</span>
            ) : null}
          </a>
        ))}
      </div>
      {children}
    </section>
  );
}
