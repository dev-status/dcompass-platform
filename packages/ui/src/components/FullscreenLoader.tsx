import type { CSSProperties } from "react";
import { colors } from "../design/tokens";

export interface FullscreenLoaderProps {
  isOpen: boolean;
  label?: string;
  title: string;
  description?: string;
}

const dotBaseStyle: CSSProperties = {
  width: "10px",
  height: "10px",
  borderRadius: "999px",
  display: "inline-block",
  animation: "dcompass-loader-bounce 1.1s ease-in-out infinite"
};

export function FullscreenLoader({
  isOpen,
  label = "Procesando",
  title,
  description
}: FullscreenLoaderProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <style>{`
        @keyframes dcompass-loader-bounce {
          0%, 80%, 100% { transform: translateY(0) scale(0.92); opacity: 0.55; }
          40% { transform: translateY(-7px) scale(1); opacity: 1; }
        }
      `}</style>

      <div
        className="fixed inset-0 z-[80] overflow-hidden"
        style={{
          background: "rgba(2, 3, 8, 0.82)",
          backdropFilter: "blur(20px)"
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at top, rgba(130,89,208,0.24), transparent 42%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(2,3,8,0.02))" }}
        />

        <div className="relative flex min-h-screen items-center justify-center px-6">
          <div
            className="w-full max-w-md text-center"
            style={{
              borderRadius: "2rem",
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.05)",
              padding: "2rem",
              boxShadow: "0 30px 90px rgba(0,0,0,0.45)",
              backdropFilter: "blur(24px)"
            }}
          >
            <div className="flex items-center justify-center gap-3">
              <span style={{ ...dotBaseStyle, backgroundColor: colors.accent, animationDelay: "0ms" }} />
              <span style={{ ...dotBaseStyle, backgroundColor: "rgba(255,255,255,0.8)", animationDelay: "160ms" }} />
              <span style={{ ...dotBaseStyle, backgroundColor: "rgba(255,255,255,0.6)", animationDelay: "320ms" }} />
            </div>

            <div className="mt-8 space-y-3">
              <p className="text-[0.82rem] font-medium uppercase tracking-[0.14em] text-zinc-500">{label}</p>
              <h2 className="text-3xl font-semibold tracking-tight text-white">{title}</h2>
              {description ? <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">{description}</p> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
