import { colors } from "../design/tokens";

export interface FullscreenLoaderProps {
  isOpen: boolean;
  label?: string;
  title: string;
  description?: string;
}

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
    <div className="fixed inset-0 z-[80] overflow-hidden bg-[rgba(2,3,8,0.82)] backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(130,89,208,0.24),transparent_42%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(2,3,8,0.02))]" />

      <div className="relative flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          <div className="flex items-center justify-center gap-3">
            <span className="h-2.5 w-2.5 animate-bounce rounded-full" style={{ backgroundColor: colors.accent, animationDelay: "0ms" }} />
            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-white/80" style={{ animationDelay: "160ms" }} />
            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-white/60" style={{ animationDelay: "320ms" }} />
          </div>

          <div className="mt-8 space-y-3">
            <p className="text-[0.82rem] font-medium uppercase tracking-[0.14em] text-zinc-500">{label}</p>
            <h2 className="text-3xl font-semibold tracking-tight text-white">{title}</h2>
            {description ? <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">{description}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
