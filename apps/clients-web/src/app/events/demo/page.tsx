"use client";

import Image from "next/image";
import Link from "next/link";
import { brandAssets, colors } from "@dcompass/ui";
import { FiArrowLeft, FiArrowRight, FiCalendar, FiClock, FiMapPin, FiMenu, FiUsers, FiX } from "react-icons/fi";
import { useState } from "react";

const navLinks = [
  { label: "Inicio", href: "#top" },
  { label: "Boletos", href: "#tickets" },
  { label: "Detalles", href: "#details" },
  { label: "Venue", href: "#venue" }
];

const ticketTypes = [
  {
    name: "General",
    description: "Acceso individual · entrada regular",
    price: "$280 MXN",
    availability: "Disponible"
  },
  {
    name: "Early Access",
    description: "Entrada prioritaria antes de las 10 PM",
    price: "$420 MXN",
    availability: "Pocos boletos"
  },
  {
    name: "Mesa compartida",
    description: "Espacio reservado para 4 personas",
    price: "$1,200 MXN",
    availability: "Disponible"
  }
];

const infoPoints = [
  { icon: FiCalendar, label: "Fecha", value: "Viernes 22 de marzo" },
  { icon: FiClock, label: "Horario", value: "10:00 PM · 3:00 AM" },
  { icon: FiMapPin, label: "Venue", value: "Supra Roma · CDMX" },
  { icon: FiUsers, label: "Ambiente", value: "DJ set íntimo · aforo limitado" }
];

export default function DemoEventDetailPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main id="top" className="min-h-screen bg-[#020308] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_40%)] blur-3xl" />
        <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(130,89,208,0.22),_transparent_62%)]" />
      </div>

      <div className="relative">
        <header className="border-b border-white/10 bg-[#020308]/92 backdrop-blur-2xl">
          <div className="mx-auto flex w-full max-w-[1440px] items-center gap-6 px-5 py-4 sm:px-6 lg:px-10">
            <a href="#top" className="flex items-center gap-3 sm:gap-4">
              <Image src={brandAssets.mainLogo} alt="DCompass símbolo principal" width={54} height={54} priority className="h-10 w-10 rounded-xl object-contain sm:h-11 sm:w-11" />
              <Image src={brandAssets.lettersLogo} alt="DCOMPASS" width={190} height={40} priority className="h-5 w-auto sm:h-6" />
            </a>

            <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-[0.92rem] font-medium tracking-[0.01em] text-zinc-400 transition hover:text-white">
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="ml-auto hidden items-center gap-4 md:flex">
              <Link href="/events" className="text-sm font-medium tracking-[0.01em] text-zinc-300 transition hover:text-white">
                Volver a eventos
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.78rem] font-semibold tracking-[0.01em] text-white shadow-[0_18px_45px_rgba(130,89,208,0.45)] transition hover:brightness-110"
                style={{ background: colors.accent }}
              >
                Iniciar sesión
                <FiArrowRight className="text-sm" />
              </Link>
            </div>

            <button onClick={() => setMobileMenuOpen(true)} className="ml-auto inline-flex items-center justify-center text-white transition hover:text-zinc-300 lg:hidden" aria-label="Abrir navegación">
              <FiMenu className="text-[1.35rem]" />
            </button>
          </div>
        </header>

        <div className={`fixed inset-0 z-50 lg:hidden ${mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
          <div onClick={() => setMobileMenuOpen(false)} className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0"}`} aria-hidden="true" />
          <aside className={`absolute right-0 top-0 flex h-full w-[82vw] max-w-[21rem] flex-col border-l border-white/10 bg-[#050711]/97 px-6 py-6 shadow-[0_30px_80px_rgba(0,0,0,0.7)] transition-transform duration-300 ease-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <Image src={brandAssets.mainLogo} alt="DCompass símbolo principal" width={48} height={48} className="h-10 w-10 rounded-xl object-contain" />
                <Image src={brandAssets.lettersLogo} alt="DCOMPASS" width={150} height={32} className="h-4 w-auto" />
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="inline-flex items-center justify-center text-white transition hover:text-zinc-300" aria-label="Cerrar navegación">
                <FiX className="text-[1.4rem]" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-6 py-8">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-[1.02rem] font-medium tracking-[0.01em] text-zinc-200 transition hover:text-white">
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="border-t border-white/10 pt-6">
              <Link href="/login" className="inline-flex items-center gap-2 text-[0.82rem] font-semibold tracking-[0.01em] transition hover:text-white/85" style={{ color: colors.accent }}>
                Iniciar sesión
                <FiArrowRight className="text-sm" />
              </Link>
            </div>
          </aside>
        </div>

        <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-5 py-8 sm:px-6 lg:px-10 lg:py-10">
          <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:items-start">
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#070914] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
                <div className="relative aspect-[16/10] w-full">
                  <Image src="/hero/hero-v2.png" alt="Noches en Supra Roma" fill priority className="object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,3,8,0.06),rgba(2,3,8,0.58))]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(130,89,208,0.24),transparent_42%)]" />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[0.84rem] font-medium tracking-[0.08em] text-zinc-400">DJ Set · Roma Norte</p>
                <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl xl:text-[3.7rem]">
                  Noches en Supra Roma.
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                  Una noche de house, luces bajas y un venue íntimo en Roma Norte para entrar con calma, quedarte por la música y salir con el plan bien vivido.
                </p>
              </div>
            </div>

            <div className="grid gap-6">
              <section id="tickets" className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                <div className="space-y-3">
                  <p className="text-[0.84rem] font-medium tracking-[0.08em] text-zinc-400">Boletos</p>
                  <h2 className="text-3xl font-semibold tracking-tight text-white">Elige cómo quieres entrar.</h2>
                </div>

                <div className="mt-6 grid gap-4">
                  {ticketTypes.map((ticket) => (
                    <article key={ticket.name} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start gap-3">
                            <h3 className="min-h-[3.5rem] text-lg font-semibold leading-snug text-white sm:min-h-[2rem]">{ticket.name}</h3>
                            <span className="shrink-0 whitespace-nowrap rounded-full border border-white/10 px-3 py-1 text-[0.72rem] tracking-[0.01em] text-zinc-300">
                              {ticket.availability}
                            </span>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-zinc-300">{ticket.description}</p>
                        </div>
                        <p className="shrink-0 text-sm font-medium text-white">{ticket.price}</p>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href="/ticket-selection"
                    className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[0.86rem] font-semibold tracking-[0.01em] text-white shadow-[0_18px_45px_rgba(130,89,208,0.45)] transition hover:brightness-110"
                    style={{ background: colors.accent }}
                  >
                    Comprar boletos
                    <FiArrowRight className="text-sm" />
                  </Link>
                  <button className="inline-flex items-center gap-2 rounded-full border border-white/14 px-5 py-3 text-[0.86rem] font-medium tracking-[0.01em] text-zinc-200 transition hover:border-white/30 hover:text-white">
                    Guardar evento
                  </button>
                </div>
              </section>

              <section id="details" className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                <div className="space-y-3">
                  <p className="text-[0.84rem] font-medium tracking-[0.08em] text-zinc-400">Detalles</p>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">Lo que necesitas saber antes de llegar.</h2>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {infoPoints.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4">
                        <div className="flex items-start gap-4">
                          <div className="inline-flex shrink-0 rounded-2xl border border-white/10 bg-white/[0.05] p-3" style={{ color: colors.accent }}>
                            <Icon className="text-base" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-zinc-400">{item.label}</p>
                            <p className="mt-2 text-base font-medium text-white">{item.value}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section id="venue" className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                <div className="space-y-3">
                  <p className="text-[0.84rem] font-medium tracking-[0.08em] text-zinc-400">Venue</p>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">Supra Roma · Ciudad de México</h2>
                  <p className="text-base leading-relaxed text-zinc-300">
                    Un espacio íntimo en Roma Norte con aforo limitado, barra abierta desde temprano y una atmósfera pensada para entrar fácil y quedarte por la música.
                  </p>
                </div>
              </section>
            </div>
          </div>

          <div className="flex justify-start pt-2">
            <Link href="/events" className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
              <FiArrowLeft className="text-sm" />
              Volver a eventos
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
