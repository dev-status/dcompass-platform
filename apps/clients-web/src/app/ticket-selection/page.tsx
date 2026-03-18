"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { brandAssets, colors } from "@dcompass/ui";
import { FiArrowLeft, FiArrowRight, FiCheckCircle, FiMenu, FiMinus, FiPlus, FiShield, FiX } from "react-icons/fi";

const navLinks = [
  { label: "Evento", href: "#top" },
  { label: "Boletos", href: "#ticket-selection" },
  { label: "Resumen", href: "#purchase-summary" }
];

const ticketTypes = [
  { name: "General", description: "Acceso individual · entrada regular", price: "$280 MXN", availability: "Disponible" },
  { name: "Early Access", description: "Entrada prioritaria antes de las 10 PM", price: "$420 MXN", availability: "Pocos boletos" },
  { name: "Mesa compartida", description: "Espacio reservado para 4 personas", price: "$1,200 MXN", availability: "Disponible" }
];

export default function TicketSelectionPage() {
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
              <Link href="/events/demo" className="text-sm font-medium tracking-[0.01em] text-zinc-300 transition hover:text-white">
                Volver al evento
              </Link>
              <Link href="/login" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.78rem] font-semibold tracking-[0.01em] text-white shadow-[0_18px_45px_rgba(130,89,208,0.45)] transition hover:brightness-110" style={{ background: colors.accent }}>
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
          <div className="grid gap-8 xl:grid-cols-[0.98fr_1.02fr] xl:items-start">
            <div className="space-y-6">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                <div className="flex items-start gap-4">
                  <div className="relative h-24 w-24 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#070914]">
                    <Image src="/hero/hero-v2.png" alt="Noches en Supra Roma" fill className="object-cover" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[0.82rem] font-medium tracking-[0.08em] text-zinc-400">Compra de boletos</p>
                    <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Noches en Supra Roma.</h1>
                    <p className="text-sm leading-relaxed text-zinc-300">Viernes 22 de marzo · 10:00 PM · Supra Roma · Ciudad de México</p>
                  </div>
                </div>
              </div>

              <section id="ticket-selection" className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                <div className="space-y-3">
                  <p className="text-[0.84rem] font-medium tracking-[0.08em] text-zinc-400">Selecciona tus boletos</p>
                  <h2 className="text-3xl font-semibold tracking-tight text-white">Elige cómo quieres entrar.</h2>
                  <p className="text-base leading-relaxed text-zinc-300">Escoge el tipo de acceso y la cantidad antes de continuar con tu compra.</p>
                </div>

                <div className="mt-6 grid gap-4">
                  {ticketTypes.map((ticket, index) => (
                    <article key={ticket.name} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-white">{ticket.name}</h3>
                            <span className="rounded-full border border-white/10 px-3 py-1 text-[0.72rem] tracking-[0.01em] text-zinc-300">{ticket.availability}</span>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-zinc-300">{ticket.description}</p>
                        </div>

                        <div className="flex items-center justify-between gap-4 sm:min-w-[14rem] sm:justify-end">
                          <p className="text-sm font-medium text-white">{ticket.price}</p>
                          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
                            <button className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-zinc-300 transition hover:text-white">
                              <FiMinus className="text-sm" />
                            </button>
                            <span className="min-w-5 text-center text-sm font-medium text-white">{index === 0 ? "2" : "0"}</span>
                            <button className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-zinc-300 transition hover:text-white">
                              <FiPlus className="text-sm" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <aside id="purchase-summary" className="grid gap-6 xl:sticky xl:top-28">
              <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                <div className="space-y-3">
                  <p className="text-[0.84rem] font-medium tracking-[0.08em] text-zinc-400">Resumen</p>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">Tu compra hasta ahora.</h2>
                </div>

                <div className="mt-6 space-y-4 text-sm text-zinc-300">
                  <div className="flex items-center justify-between gap-4"><span>2 × General</span><span>$560 MXN</span></div>
                  <div className="flex items-center justify-between gap-4"><span>Comisiones</span><span>$0 MXN</span></div>
                  <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4 text-base font-semibold text-white"><span>Total</span><span>$560 MXN</span></div>
                </div>

                <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5" style={{ color: colors.accent }}><FiCheckCircle className="text-base" /></span>
                    <p className="text-sm leading-relaxed text-zinc-100">Sin comisiones sorpresa. El total que ves aquí es el que pagarías al continuar.</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <button className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.86rem] font-semibold tracking-[0.01em] text-white shadow-[0_18px_45px_rgba(130,89,208,0.45)] transition hover:brightness-110" style={{ background: colors.accent }}>
                    Continuar compra
                    <FiArrowRight className="text-sm" />
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 px-5 py-3 text-[0.86rem] font-medium tracking-[0.01em] text-zinc-200 transition hover:border-white/30 hover:text-white">
                    Guardar para después
                  </button>
                </div>
              </section>

              <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                <div className="flex items-start gap-4">
                  <div className="inline-flex rounded-2xl border border-white/10 bg-white/[0.05] p-3" style={{ color: colors.accent }}><FiShield className="text-base" /></div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Compra más clara</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-300">Antes de pasar al pago, puedes revisar cantidades, tipo de boleto y total sin salir de esta pantalla.</p>
                  </div>
                </div>
              </section>
            </aside>
          </div>

          <div className="flex justify-start pt-2">
            <Link href="/events/demo" className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
              <FiArrowLeft className="text-sm" />
              Volver al evento
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
