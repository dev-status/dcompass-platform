"use client";

import Image from "next/image";
import { brandAssets, colors } from "@dcompass/ui";

export function AuthProcessLoader({ message }: { message: string }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020308]/92 backdrop-blur-md">
      <div className="flex w-full max-w-sm flex-col items-center gap-5 rounded-[2rem] border border-white/10 bg-white/[0.05] px-8 py-10 text-center shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <Image
          src={brandAssets.mainLogo}
          alt="DCompass"
          width={64}
          height={64}
          className="h-14 w-14 animate-pulse rounded-2xl object-contain"
        />

        <div
          className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-transparent"
          style={{ borderTopColor: colors.accent, borderRightColor: colors.accent }}
        />

        <div className="space-y-2">
          <p className="text-base font-semibold text-white">Procesando acceso</p>
          <p className="text-sm leading-relaxed text-zinc-300">{message}</p>
        </div>
      </div>
    </div>
  );
}
