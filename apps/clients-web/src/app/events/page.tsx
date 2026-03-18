"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { brandAssets, colors } from "@dcompass/ui";
import { FiArrowLeft, FiArrowRight, FiCalendar, FiFilter, FiMapPin, FiMenu, FiSearch, FiSliders, FiX } from "react-icons/fi";
import EventCard from "../../components/EventCard";
import { eventShowcase } from "../../data/events";

const navLinks = [
  { label: "Inicio", href: "#top" },
  { label: "Eventos", href: "#results" },
  { label: "Filtros", href: "#filters" },
  { label: "Mapa", href: "#map-preview" }
];

const quickFilters = ["Hoy", "Esta semana", "CDMX", "DJ Sets", "Bar", "Live"];

export default function Page() {
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
            <Link href="#top" className="flex items-center gap-3 sm:gap-4">
              <Image src={brandAssets.mainLogo} alt="DCompass símbolo principal" width={54} height={54} priority className="h-10 w-10 rounded-xl object-contain sm:h-11 sm:w-11" />
              <Image src={brandAssets.lettersLogo} alt="DCOMPASS" width={190} height={40} priority className="h-5 w-auto sm:h-6" />
            </Link>

            <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-[0.92rem] font-medium tracking-[0.01em] text-zinc-400 transition hover:text-white">
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="ml-auto hidden items-center gap-4 md:flex">
              <Link
                href="/"
                className="text-sm font-medium tracking-[0.01em] text-zinc-300 transition hover:text-white"
              >
                Volver al home
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
          <aside className={`absolute right-0 top-0 flex h-full w-[88vw] max-w-sm flex-col border-l border-white/10 bg-[#050711]/97 px-6 py-6 shadow-[0_30px_80px_rgba(0,0,0,0.7)] transition-transform duration-300 ease-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <Image src={brandAssets.mainLogo} alt="DCompass símbolo principal" width={48} height={48} className="h-10 w-10 rounded-xl object-contain" />
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
          <div className="grid gap-8 xl:grid-cols-[0.78fr_1.22fr] xl:items-end">
            <div className="space-y-5">
              <p className="text-[0.84rem] font-medium tracking-[0.08em] text-zinc-400">Explorar eventos</p>
              <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl xl:text-[3.7rem]">
                Encuentra tu siguiente plan sin perder tiempo.
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                Busca por zona, fecha o tipo de evento y encuentra opciones que sí dan ganas de vivir.
              </p>
            </div>

            <div id="filters" className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
              <div className="grid gap-4 lg:grid-cols-[1.3fr_0.8fr_0.8fr_auto]">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-200">Buscar evento</label>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-zinc-400">
                    <FiSearch className="text-base" />
                    <span className="text-sm">DJ set, bar, venue o colonia</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-200">Fecha</label>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-zinc-400">
                    <FiCalendar className="text-base" />
                    <span className="text-sm">Esta semana</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-200">Ciudad</label>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-zinc-400">
                    <FiMapPin className="text-base" />
                    <span className="text-sm">Ciudad de México</span>
                  </div>
                </div>
                <div className="flex items-end">
                  <button className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.86rem] font-semibold tracking-[0.01em] text-white shadow-[0_18px_45px_rgba(130,89,208,0.45)] transition hover:brightness-110" style={{ background: colors.accent }}>
                    Buscar
                    <FiArrowRight className="text-sm" />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300">
                  <FiSliders className="text-sm" />
                  Filtros rápidos
                </div>
                {quickFilters.map((filter) => (
                  <button key={filter} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300 transition hover:border-white/20 hover:text-white">
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <section id="results" className="grid gap-6 scroll-mt-24">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-3 sm:max-w-2xl">
                <p className="text-[0.98rem] font-medium tracking-[0.01em] text-zinc-400">Resultados</p>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Eventos para esta semana.
                </h2>
              </div>
              <div id="map-preview" className="inline-flex items-center gap-2 text-sm font-medium tracking-[0.01em] text-zinc-300">
                <FiFilter className="text-sm" />
                24 resultados disponibles
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {eventShowcase.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>

          <div className="flex items-center justify-between rounded-[1.7rem] border border-white/10 bg-white/[0.035] px-5 py-4 text-sm text-zinc-300">
            <span>Mostrando {eventShowcase.length} eventos</span>
            <button className="inline-flex items-center gap-2 font-medium transition hover:text-white" style={{ color: colors.accent }}>
              Ver más resultados
              <FiArrowRight className="text-sm" />
            </button>
          </div>

          <div className="flex justify-start pt-2">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
              <FiArrowLeft className="text-sm" />
              Volver al inicio
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
