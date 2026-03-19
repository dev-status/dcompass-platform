import Image from "next/image";
import Link from "next/link";
import { brandAssets, colors } from "@dcompass/ui";
import { FiArrowRight, FiCheckCircle, FiDownload, FiTag } from "react-icons/fi";

const ticketHighlights = [
  "Tus accesos ya quedaron confirmados y listos para consultarse cuando quieras.",
  "Recibirás tus boletos en tu correo y también estarán disponibles dentro de tu cuenta.",
];

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-[#020308] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_40%)] blur-3xl" />
        <div className="absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(130,89,208,0.24),_transparent_62%)]" />
      </div>

      <div className="relative">
        <header className="border-b border-white/10 bg-[#020308]/92 backdrop-blur-2xl">
          <div className="mx-auto flex w-full max-w-[1440px] items-center gap-6 px-5 py-4 sm:px-6 lg:px-10">
            <Link href="/" className="flex items-center gap-3 sm:gap-4">
              <Image src={brandAssets.mainLogo} alt="DCompass símbolo principal" width={54} height={54} priority className="h-10 w-10 rounded-xl object-contain sm:h-11 sm:w-11" />
              <Image src={brandAssets.lettersLogo} alt="DCOMPASS" width={190} height={40} priority className="h-5 w-auto sm:h-6" />
            </Link>
          </div>
        </header>

        <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-5 py-8 sm:px-6 lg:px-10 lg:py-10">
          <div className="space-y-3">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
              <FiCheckCircle className="text-sm" />
              Compra confirmada
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Tus boletos ya están listos.</h1>
              <p className="max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">Tu acceso para Noches en Supra Roma quedó confirmado.</p>
            </div>
          </div>

          <div className="grid gap-8 xl:grid-cols-[1.02fr_0.98fr] xl:items-start">
            <div className="space-y-6">
              <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
                <div className="relative aspect-[16/9] w-full border-b border-white/10 bg-[#070914]">
                  <Image src="/hero/hero-v2.png" alt="Noches en Supra Roma" fill priority className="object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,3,8,0.08),rgba(2,3,8,0.72))]" />
                </div>

                <div className="space-y-5 p-6 sm:p-8">
                  <div className="space-y-2">
                    <p className="text-[0.82rem] font-medium tracking-[0.08em] text-zinc-400">Noches en Supra Roma</p>
                    <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Ya tienes tu lugar apartado.</h2>
                    <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">Viernes 22 de marzo · 10:00 PM · Supra Roma · Ciudad de México</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4">
                      <p className="text-sm font-medium text-zinc-400">Boletos</p>
                      <p className="mt-2 text-xl font-semibold text-white">2 × General</p>
                    </div>
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4">
                      <p className="text-sm font-medium text-zinc-400">Total pagado</p>
                      <p className="mt-2 text-xl font-semibold text-white">$560 MXN</p>
                    </div>
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4">
                      <p className="text-sm font-medium text-zinc-400">Orden</p>
                      <p className="mt-2 text-xl font-semibold text-white">#DCP-2048</p>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {ticketHighlights.map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-3">
                        <span className="mt-0.5" style={{ color: colors.accent }}>
                          <FiCheckCircle className="text-base" />
                        </span>
                        <p className="text-sm leading-relaxed text-zinc-200">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            <aside className="grid gap-6 xl:sticky xl:top-28">
              <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                <div className="space-y-3">
                  <p className="text-[0.84rem] font-medium tracking-[0.08em] text-zinc-400">Siguiente paso</p>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">Revisa tus boletos cuando quieras.</h2>
                  <p className="text-sm leading-relaxed text-zinc-300">Desde ahí podrías revisar accesos, encontrar el QR y volver a consultar esta compra cuando quieras.</p>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <button className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.86rem] font-semibold tracking-[0.01em] text-white shadow-[0_18px_45px_rgba(130,89,208,0.45)] transition hover:brightness-110" style={{ background: colors.accent }}>
                    Ir a Mis boletos
                    <FiArrowRight className="text-sm" />
                  </button>
                  <Link href="/events" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 px-5 py-3 text-[0.86rem] font-medium tracking-[0.01em] text-zinc-200 transition hover:border-white/30 hover:text-white">
                    Seguir explorando eventos
                  </Link>
                </div>
              </section>

              <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                <div className="grid gap-4 sm:grid-cols-1">
                  <div className="flex items-start gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4">
                    <div className="inline-flex rounded-2xl border border-white/10 bg-white/[0.05] p-3" style={{ color: colors.accent }}><FiTag className="text-base" /></div>
                    <div>
                      <h3 className="text-base font-semibold text-white">Acceso a la mano</h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-300">Tus boletos quedan listos para abrirse rápido cuando llegue el momento.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4">
                    <div className="inline-flex rounded-2xl border border-white/10 bg-white/[0.05] p-3" style={{ color: colors.accent }}><FiDownload className="text-base" /></div>
                    <div>
                      <h3 className="text-base font-semibold text-white">Confirmación entregada</h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-300">La compra ya puede vivir en correo, cuenta y futuros puntos de acceso.</p>
                    </div>
                  </div>

                </div>
              </section>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
