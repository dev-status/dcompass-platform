import type { InputHTMLAttributes } from "react";
import clsx from "clsx";
import { colors, radii, spacing, shadows } from "../design/tokens";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
}

export function InputField({ label, helperText, className, style, ...props }: InputFieldProps) {
  return (
    <label className="inline-flex w-full flex-col gap-2 text-left">
      {label ? (
        <span className="text-xs font-semibold uppercase tracking-[0.4em]" style={{ color: colors.textSecondary }}>
          {label}
        </span>
      ) : null}
      <input
        className={clsx(
          "w-full rounded-[18px] border bg-transparent px-4 py-3 text-sm font-medium transition focus:outline-none focus-visible:outline focus-visible:outline-[3px]",
          className
        )}
        style={{
          borderColor: colors.border,
          backgroundColor: colors.surface,
          color: colors.textPrimary,
          boxShadow: shadows.inset,
          borderRadius: radii.shell,
          ...style
        }}
        {...props}
      />
      {helperText ? (
        <span className="text-[0.65rem] uppercase tracking-[0.4em]" style={{ color: colors.textTertiary }}>
          {helperText}
        </span>
      ) : null}
    </label>
  );
}
