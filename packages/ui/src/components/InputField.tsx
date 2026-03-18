import type { InputHTMLAttributes } from "react";
import clsx from "clsx";
import { colors, radii, shadows } from "../design/tokens";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
}

export function InputField({ label, helperText, className, style, ...props }: InputFieldProps) {
  return (
    <label className="inline-flex w-full flex-col gap-3 text-left">
      {label ? (
        <span
          className="text-[0.7rem] font-semibold uppercase tracking-[0.35em]"
          style={{ color: colors.textSecondary }}
        >
          {label}
        </span>
      ) : null}
      <input
        className={clsx(
          "w-full rounded-[18px] border bg-transparent px-5 py-4 text-base font-medium transition focus:outline-none focus-visible:outline focus-visible:outline-[3px]",
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
        <span
          className="text-[0.65rem] uppercase tracking-[0.3em]"
          style={{ color: colors.textTertiary }}
        >
          {helperText}
        </span>
      ) : null}
    </label>
  );
}
