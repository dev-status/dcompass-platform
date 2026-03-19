import Image from "next/image";
import Link from "next/link";
import { brandAssets, colors } from "@dcompass/ui";
import { FiArrowLeft, FiArrowRight, FiCheckCircle, FiLock, FiShield, FiStar } from "react-icons/fi";

const trustPoints = [
  "Accede para ver tus boletos y seguir tus próximos eventos.",
  "Tu información y accesos se mantienen protegidos.",
  "Recupera tu cuenta fácilmente si algo cambia."
];

export default function Page() {
  return (
    <main className="min-h-screen bg-[#020308] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.10),_transparent_40%)] blur-3xl" />
        <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(130,89,208,0.24),_transparent_62%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] items-stretch px-5 py-6 sm:px-6 lg:px-10 lg:py-8">
        <div className="grid w-full gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#070914] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-0">
              <Image
                src="/hero/hero-v2.png"
                alt="Escena urbana nocturna para DCompass"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,3,8,0.18),rgba(2,3,8,0.82))]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(130,89,208,0.26),transparent_42%)]" />
            </div>

            <div className="relative flex h-full flex-col justify-between gap-8 px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
              <div className="flex items-center gap-3">
                <Image
                  src={brandAssets.mainLogo}
                  alt="DCompass símbolo principal"
                  width={52}
                  height={52}
                  className="h-11 w-11 rounded-xl object-contain"
                />
                <Image
                  src={brandAssets.lettersLogo}
                  alt="DCOMPASS"
                  width={190}
                  height={40}
                  className="h-5 w-auto sm:h-6"
                />
              </div>

              <div className="max-w-xl space-y-5">
                <p className="text-[0.82rem] font-medium tracking-[0.08em] text-zinc-300">Acceso a tu cuenta</p>
                <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl xl:text-[3.7rem]">
                  Inicia sesión y sigue tu próxima gran noche.
                </h1>
                <p className="max-w-lg text-base leading-relaxed text-zinc-200 sm:text-lg">
                  Entra para ver tus boletos, guardar eventos y tener todo listo antes de salir.
                </p>
              </div>

              <div className="grid gap-3 sm:max-w-xl">
                {trustPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 backdrop-blur-sm">
                    <span className="mt-0.5" style={{ color: colors.accent }}>
                      <FiCheckCircle className="text-base" />
                    </span>
                    <p className="text-sm leading-relaxed text-zinc-100">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="flex items-center justify-center">
            <div className="w-full max-w-[34rem] space-y-5">
              <div className="space-y-3">
                <Link href="/" className="inline-flex w-fit items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-white">
                  <FiArrowLeft className="text-sm" />
                  Volver al inicio
                </Link>
                <div className="space-y-2">
                  <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Inicia sesión</h1>
                  <p className="max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">Accede para ver tus boletos, guardar eventos y seguir tu próxima salida con más claridad.</p>
                </div>
              </div>

              <div className="w-full max-w-[34rem] rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 py-6 shadow-[0_30px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:px-8 sm:py-8 lg:px-10 lg:py-10">
                <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex rounded-2xl border border-white/10 bg-white/[0.05] p-3" style={{ color: colors.accent }}>
                    <FiLock className="text-lg" />
                  </div>

                  <div className="space-y-3">
                    <p className="max-w-md text-base leading-relaxed text-zinc-300">
                      Accede para ver tus boletos, guardar eventos y seguir tu próxima salida.
                    </p>
                  </div>
                </div>

                <form className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-zinc-200">
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="tu@correo.com"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-white/25"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <label htmlFor="password" className="text-sm font-medium text-zinc-200">
                        Contraseña
                      </label>
                      <a href="#login-help" className="text-sm transition hover:text-white" style={{ color: colors.accent }}>
                        Olvidé mi contraseña
                      </a>
                    </div>
                    <input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-white/25"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.92rem] font-semibold tracking-[0.01em] text-white shadow-[0_18px_45px_rgba(130,89,208,0.45)] transition hover:brightness-110"
                    style={{ background: colors.accent }}
                  >
                    Entrar
                    <FiArrowRight className="text-sm" />
                  </button>
                </form>

                <div className="grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <div className="mb-3 inline-flex rounded-2xl border border-white/10 bg-white/[0.05] p-3" style={{ color: colors.accent }}>
                      <FiShield className="text-base" />
                    </div>
                    <h3 className="text-base font-semibold text-white">Acceso seguro</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                      Tu cuenta y tus accesos permanecen protegidos en cada entrada.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <div className="mb-3 inline-flex rounded-2xl border border-white/10 bg-white/[0.05] p-3" style={{ color: colors.accent }}>
                      <FiStar className="text-base" />
                    </div>
                    <h3 className="text-base font-semibold text-white">Todo en un solo lugar</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                      Boletos, eventos guardados y próximos planes, todo más a la mano.
                    </p>
                  </div>
                </div>

                  <div className="flex flex-col gap-3 border-t border-white/10 pt-5 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                      ¿Todavía no te has registrado?{" "}
                      <Link href="/signup" className="font-medium transition hover:text-white" style={{ color: colors.accent }}>
                        Regístrate aquí
                      </Link>
                    </p>
                    <Link href="/" className="inline-flex items-center gap-2 transition hover:text-white">
                      <FiArrowLeft className="text-sm" />
                      Volver al inicio
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
