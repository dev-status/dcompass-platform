import Link from "next/link";

export default async function UnauthorizedPage({ searchParams }: { searchParams: Promise<{ requiredRole?: string }> }) {
  const params = await searchParams;
  const requiredRole = params.requiredRole === "admin" ? "admin" : "partner";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#020308] px-6 text-white">
      <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.24)]">
        <p className="text-sm uppercase tracking-[0.18em] text-zinc-500">Acceso restringido</p>
        <h1 className="mt-3 text-3xl font-semibold">No tienes permisos para entrar aquí.</h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-300">Tu sesión es válida, pero esta vista requiere el rol <span className="font-semibold text-white">{requiredRole}</span>.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link href="/" className="rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white transition hover:border-white/30">Ir al inicio</Link>
          <Link href="/login" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200">Cambiar sesión</Link>
        </div>
      </div>
    </main>
  );
}
