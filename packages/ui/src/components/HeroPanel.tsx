import type { ReactNode } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { colors, radii, shadows, surfaces } from "../design/tokens";

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

const actionVariants = {
  primary: {
    background: colors.accent,
    color: colors.textPrimary,
    border: `1px solid ${colors.accent}`
  },
  secondary: {
    background: "transparent",
    color: colors.textSecondary,
    border: `1px solid ${colors.border}`
  }
};

export function HeroPanel({ title, summary, highlight, accent, actions = [], children }: HeroPanelProps) {
  return (
    <section
      className={twMerge("w-full max-w-5xl space-y-6 border p-8 shadow-2xl backdrop-blur", "dark:border-white/10")}
      style={{
        background: surfaces.panel,
        borderColor: colors.border,
        borderRadius: radii.shell,
        boxShadow: shadows.card
      }}
    >
      <div className="space-y-2">
        {highlight ? (
          <p
            className="text-xs font-semibold uppercase tracking-[0.4em]"
            style={{ color: accent ?? colors.accent }}
          >
            {highlight}
          </p>
        ) : null}
        <h1
          className="text-4xl font-semibold leading-tight"
          style={{ color: colors.textPrimary, fontFamily: "Space Grotesk, 'Geist', sans-serif" }}
        >
          {title}
        </h1>
        <p className="text-lg" style={{ color: colors.textSecondary }}>
          {summary}
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        {actions.map((action) => {
          const tone = actionVariants[action.accent ?? "primary"];
          return (
            <a
              key={action.label}
              href={action.href}
              className={clsx("rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2")}
              style={{
                background: tone.background,
                color: tone.color,
                border: tone.border
              }}
            >
              {action.label}
              {action.description ? (
                <span className="block text-[0.65rem] font-normal tracking-[0.2em] uppercase" style={{ color: tone.color, opacity: 0.7 }}>
                  {action.description}
                </span>
              ) : null}
            </a>
          );
        })}
      </div>
      {children}
    </section>
  );
}
