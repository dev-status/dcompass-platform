"use client";

import Image from "next/image";
import { useState } from "react";
import { brandAssets, colors } from "@dcompass/ui";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiClock, FiMapPin, FiMenu, FiPlay, FiShield, FiStar, FiRepeat, FiX } from "react-icons/fi";

const navLinks = [
  { label: "Inicio", href: "#hero-vnext" },
  { label: "Eventos", href: "/events" },
  { label: "Beneficios", href: "#benefits" },
  { label: "Cómo funciona", href: "#how-it-works" }
];

const featuredEvents = [
  {
    title: "Noches en Supra Roma",
    category: "DJ Set · Roma Norte",
    date: "Vie 22 Mar · 10:00 PM",
    location: "CDMX",
    price: "Desde $280 MXN",
    status: "Entradas disponibles"
  },
  {
    title: "Sábado en Casa Aurora",
    category: "Live Set · Condesa",
    date: "Sáb 23 Mar · 9:30 PM",
    location: "CDMX",
    price: "Desde $350 MXN",
    status: "Últimos accesos"
  },
  {
    title: "Session 03 · Juárez",
    category: "Bar Session · Juárez",
    date: "Jue 28 Mar · 8:30 PM",
    location: "CDMX",
    price: "Desde $240 MXN",
    status: "Preventa activa"
  }
];

const trustBenefits = [
  {
    title: "Pagas lo que ves",
    description: "Sin comisiones sorpresa al final del proceso.",
    icon: FiStar
  },
  {
    title: "Tu acceso está protegido",
    description: "Seguridad primero para entrar con más confianza.",
    icon: FiShield
  },
  {
    title: "Pasa tus boletos fácil",
    description: "Transfiérelos sin complicarte cuando cambien los planes.",
    icon: FiRepeat
  }
];

const howItWorks = [
  {
    step: "1",
    title: "Explora",
    description: "Encuentra eventos que sí te laten, con información clara desde el inicio."
  },
  {
    step: "2",
    title: "Accede",
    description: "Compra o aparta sin vueltas, con precios claros y menos fricción."
  },
  {
    step: "3",
    title: "Disfruta",
    description: "Llega con todo listo y vive la experiencia sin complicarte de más."
  }
];

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#020308] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.1),_transparent_42%)] blur-3xl" />
        <div className="absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(130,89,208,0.28),_transparent_62%)]" />
      </div>

      <div className="relative">
        <header className="border-b border-white/10 bg-[#020308]/92 backdrop-blur-2xl">
          <div className="mx-auto flex w-full max-w-[1440px] items-center gap-6 px-5 py-4 sm:px-6 lg:px-10">
            <a href="#hero-vnext" className="flex items-center gap-3 sm:gap-4">
              <Image
                src={brandAssets.mainLogo}
                alt="DCompass símbolo principal"
                width={54}
                height={54}
                priority
                className="h-10 w-10 rounded-xl object-contain sm:h-11 sm:w-11"
              />
              <Image
                src={brandAssets.lettersLogo}
                alt="DCOMPASS"
                width={190}
                height={40}
                priority
                className="h-5 w-auto sm:h-6"
              />
            </a>

            <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[0.92rem] font-medium tracking-[0.01em] text-zinc-400 transition hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="ml-auto hidden items-center md:flex">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.78rem] font-semibold tracking-[0.01em] text-white shadow-[0_18px_45px_rgba(130,89,208,0.45)] transition hover:brightness-110"
                style={{ background: colors.accent }}
              >
                Crear cuenta
                <FiArrowRight className="text-sm" />
              </Link>
              <Link
                href="/login"
                className="ml-4 text-sm font-medium tracking-[0.01em] text-zinc-300 transition hover:text-white"
              >
                Iniciar sesión
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="ml-auto inline-flex items-center justify-center text-white transition hover:text-zinc-300 lg:hidden"
              aria-label="Abrir navegación"
            >
              <FiMenu className="text-[1.35rem]" />
            </button>
          </div>
        </header>

        <div className={`fixed inset-0 z-50 lg:hidden ${mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
          <div
            onClick={() => setMobileMenuOpen(false)}
            className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0"}`}
            aria-hidden="true"
          />
          <aside
            className={`absolute right-0 top-0 flex h-full w-[82vw] max-w-[21rem] flex-col border-l border-white/10 bg-[#050711]/97 px-6 py-6 shadow-[0_30px_80px_rgba(0,0,0,0.7)] transition-transform duration-300 ease-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <Image src={brandAssets.mainLogo} alt="DCompass símbolo principal" width={48} height={48} className="h-10 w-10 rounded-xl object-contain" />
                <Image src={brandAssets.lettersLogo} alt="DCOMPASS" width={150} height={32} className="h-4 w-auto" />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center text-white transition hover:text-zinc-300"
                aria-label="Cerrar navegación"
              >
                <FiX className="text-[1.4rem]" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-6 py-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[1.02rem] font-medium tracking-[0.01em] text-zinc-200 transition hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="border-t border-white/10 pt-6">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-2 text-[0.82rem] font-semibold tracking-[0.01em] transition hover:text-white/85"
                style={{ color: colors.accent }}
              >
                Iniciar sesión
                <FiArrowRight className="text-sm" />
              </Link>
            </div>
          </aside>
        </div>

        <section id="hero-vnext" className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-5 py-8 sm:px-6 lg:px-10 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div className="order-2 flex flex-col gap-6 lg:order-1 lg:pr-6">
              <div className="space-y-4">
                <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl xl:text-[3.8rem]">
                  Tu próxima gran noche empieza aquí.
                </h1>
                <p className="max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                  Todo lo que necesitas para encontrar tu siguiente plan de forma más simple.
                </p>
              </div>

              <ul className="grid gap-3 text-sm leading-relaxed text-zinc-200 sm:max-w-xl">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-[0.95rem]" style={{ color: colors.accent }}>
                    <FiCheck />
                  </span>
                  <span>Sin comisiones sorpresa. Pagas lo que ves.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-[0.95rem]" style={{ color: colors.accent }}>
                    <FiCheck />
                  </span>
                  <span>Tu seguridad va primero.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-[0.95rem]" style={{ color: colors.accent }}>
                    <FiCheck />
                  </span>
                  <span>Transfiere boletos fácilmente.</span>
                </li>
              </ul>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[0.82rem] font-semibold tracking-[0.01em] text-white shadow-[0_18px_45px_rgba(130,89,208,0.45)] transition hover:brightness-110"
                  style={{ background: colors.accent }}
                >
                  Crear cuenta
                  <FiArrowRight className="text-sm" />
                </Link>
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 rounded-full border border-white/14 px-5 py-3 text-[0.82rem] font-medium tracking-[0.01em] text-zinc-200 transition hover:border-white/30 hover:text-white"
                >
                  <FiPlay className="text-sm" />
                  Explorar eventos
                </Link>
              </div>

              <div className="grid gap-4 pt-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-[0.72rem] tracking-[0.01em] text-zinc-400">Eventos publicados</p>
                  <p className="mt-2 text-2xl font-semibold text-white">120+</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-[0.72rem] tracking-[0.01em] text-zinc-400">Ciudades activas</p>
                  <p className="mt-2 text-2xl font-semibold text-white">8</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-[0.72rem] tracking-[0.01em] text-zinc-400">Acceso más claro</p>
                  <p className="mt-2 text-2xl font-semibold text-white">24/7</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#060814] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
                <div className="relative aspect-[1/1] w-full sm:aspect-[1.05/1] lg:aspect-[1/1]">
                  <Image
                    src="/hero/hero-v2.png"
                    alt="Escena nightlife urbana para hero de DCompass"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,3,8,0.02),rgba(2,3,8,0.2))]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(130,89,208,0.22),transparent_45%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,3,8,0.26),rgba(2,3,8,0.05))]" />
                </div>
              </div>
            </div>
          </div>

          <section id="featured-events" className="grid gap-6 pt-4 lg:pt-8 scroll-mt-24">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-3 sm:max-w-2xl">
                <p className="text-[0.98rem] font-medium tracking-[0.01em] text-zinc-400">Encuentra tu siguiente plan</p>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Planes que sí dan ganas de vivir.
                </h2>
              </div>
              <Link href="/events" className="inline-flex items-center gap-2 text-sm font-medium tracking-[0.01em] transition hover:text-white" style={{ color: colors.accent }}>
                Explorar más
                <FiArrowRight className="text-sm" />
              </Link>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {featuredEvents.map((event) => (
                <article key={event.title} className="rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.72rem] tracking-[0.01em] text-zinc-500">{event.category}</p>
                      <h3 className="mt-2 text-xl font-semibold text-white">{event.title}</h3>
                    </div>
                    <span className="shrink-0 whitespace-nowrap rounded-full border border-white/10 px-3 py-1 text-[0.72rem] tracking-[0.01em] text-zinc-300">
                      {event.status}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm text-zinc-300">
                    <p className="flex items-center gap-2">
                      <FiClock className="text-sm" />
                      {event.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiMapPin className="text-sm" />
                      {event.location}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                    <p className="text-sm font-medium text-white">{event.price}</p>
                    <a href="#featured-events" className="text-sm font-medium transition hover:text-white" style={{ color: colors.accent }}>
                      Ver evento
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="benefits" className="grid gap-6 pt-2 lg:pt-6 scroll-mt-24">
            <div className="flex flex-col gap-3 sm:max-w-2xl">
              <p className="text-[0.98rem] font-medium tracking-[0.01em] text-zinc-400">Más claridad desde el inicio</p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Lo importante debería ser simple.
              </h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {trustBenefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <article key={benefit.title} className="rounded-[1.7rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.24)]">
                    <div className="flex items-start gap-4">
                      <div className="inline-flex shrink-0 rounded-2xl border border-white/10 bg-white/[0.05] p-3" style={{ color: colors.accent }}>
                        <Icon className="text-lg" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-300">{benefit.description}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="how-it-works" className="grid gap-6 pt-2 lg:pt-6 scroll-mt-24">
            <div className="flex flex-col gap-3 sm:max-w-2xl">
              <p className="text-[0.98rem] font-medium tracking-[0.01em] text-zinc-400">Cómo funciona</p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Encontrar plan debería tomar menos tiempo.
              </h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {howItWorks.map((item) => (
                <article key={item.step} className="rounded-[1.7rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.24)]">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex min-h-12 min-w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-lg font-semibold" style={{ color: colors.accent }}>
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-300">{item.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="pt-2 lg:pt-6">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 py-8 shadow-[0_30px_80px_rgba(0,0,0,0.24)] sm:px-8 sm:py-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl space-y-3">
                  <p className="text-[0.98rem] font-medium tracking-[0.01em] text-zinc-400">Empieza cuando quieras</p>
                  <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    Tu siguiente plan puede empezar hoy.
                  </h2>
                  <p className="text-base leading-relaxed text-zinc-300">
                    Crea tu cuenta, descubre eventos y empieza a usar DCompass de la forma más simple.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/signup"
                    className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[0.82rem] font-semibold tracking-[0.01em] text-white shadow-[0_18px_45px_rgba(130,89,208,0.45)] transition hover:brightness-110"
                    style={{ background: colors.accent }}
                  >
                    Crear cuenta
                    <FiArrowRight className="text-sm" />
                  </Link>
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-2 rounded-full border border-white/14 px-5 py-3 text-[0.82rem] font-medium tracking-[0.01em] text-zinc-200 transition hover:border-white/30 hover:text-white"
                  >
                    Explorar eventos
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <footer className="border-t border-white/10 pt-8 pb-4">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-sm space-y-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={brandAssets.mainLogo}
                    alt="DCompass símbolo principal"
                    width={44}
                    height={44}
                    className="h-10 w-10 rounded-xl object-contain"
                  />
                  <Image
                    src={brandAssets.lettersLogo}
                    alt="DCOMPASS"
                    width={170}
                    height={36}
                    className="h-5 w-auto"
                  />
                </div>
                <p className="text-sm leading-relaxed text-zinc-400">
                  Una forma más simple de descubrir eventos, encontrar tu siguiente plan y salir mejor.
                </p>
              </div>

              <div className="grid gap-8 sm:grid-cols-3">
                <div className="space-y-3">
                  <p className="text-[0.8rem] font-semibold tracking-[0.08em] text-white">Explora</p>
                  <div className="flex flex-col gap-2 text-sm text-zinc-400">
                    <Link href="/events" className="transition hover:text-white">
                      Eventos
                    </Link>
                    <a href="#benefits" className="transition hover:text-white">
                      Beneficios
                    </a>
                    <a href="#how-it-works" className="transition hover:text-white">
                      Cómo funciona
                    </a>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[0.8rem] font-semibold tracking-[0.08em] text-white">Cuenta</p>
                  <div className="flex flex-col gap-2 text-sm text-zinc-400">
                    <Link href="/signup" className="transition hover:text-white">
                      Crear cuenta
                    </Link>
                    <Link href="/events" className="transition hover:text-white">
                      Explorar eventos
                    </Link>
                    <Link href="/events" className="transition hover:text-white">
                      Buscar más
                    </Link>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[0.8rem] font-semibold tracking-[0.08em] text-white">Contacto</p>
                  <div className="flex flex-col gap-2 text-sm text-zinc-400">
                    <a href="mailto:hola@dcompass.com" className="transition hover:text-white">
                      hola@dcompass.com
                    </a>
                    <span>Ciudad de México</span>
                    <span>Disponibilidad 24/7</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
              <p>© 2026 DCompass. Todos los derechos reservados.</p>
              <div className="flex items-center gap-4">
                <a href="#hero-vnext" className="transition hover:text-white">
                  Privacidad
                </a>
                <a href="#hero-vnext" className="transition hover:text-white">
                  Términos
                </a>
              </div>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}
