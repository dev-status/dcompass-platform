import type { ReactNode } from "react";
import clsx from "clsx";
import { Card } from "./Card";
import { colors, typography } from "../design/tokens";

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <Card variant="glass" className={clsx("grid gap-4 text-center", className)}>
      {icon ? <div className="mx-auto text-3xl">{icon}</div> : null}
      <h3 className="text-xl font-semibold leading-relaxed" style={{ color: colors.textPrimary, fontFamily: typography.fonts.heading }}>
        {title}
      </h3>
      {description ? (
        <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary, fontFamily: typography.fonts.body }}>
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </Card>
  );
}
