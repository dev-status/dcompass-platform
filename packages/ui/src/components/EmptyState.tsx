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
    <Card variant="glass" className={clsx("grid gap-3 text-center", className)}>
      {icon ? <div className="mx-auto">{icon}</div> : null}
      <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary, fontFamily: typography.fonts.heading }}>
        {title}
      </h3>
      {description ? (
        <p className="text-sm" style={{ color: colors.textSecondary, fontFamily: typography.fonts.body }}>
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </Card>
  );
}
