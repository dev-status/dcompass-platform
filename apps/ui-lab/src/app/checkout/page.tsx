"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { brandAssets, colors } from "@dcompass/ui";
import { FiArrowLeft, FiArrowRight, FiCheckCircle, FiCreditCard, FiLock, FiMapPin, FiMenu, FiShield, FiSmartphone, FiUser, FiX } from "react-icons/fi";

const navLinks = [
  { label: "Compra", href: "#top" },
  { label: "Pago", href: "#payment" },
  { label: "Resumen", href: "#summary" }
];

const paymentMethods = [
  {
    title: "Tarjeta",
    description: "Pago con tarjeta de crédito o débito",
    icon: FiCreditCard,
    active: true
  },
  {
    title: "Wallet",
    description: "Apple Pay o Google Pay cuando aplique",
    icon: FiSmartphone,
    active: false
  }
];

export default function CheckoutPage() {
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
              <Link href="/ticket-selection" className="text-sm font-medium tracking-[0.01em] text-zinc-300 transition hover:text-white">
                Volver a boletos
              </Link>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300">
                <FiLock className="text-sm" />
                Pago protegido
              </span>
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

            <div className="border-t border-white/10 pt-6 text-sm text-zinc-300">
              Pago protegido
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
                    <p className="text-[0.82rem] font-medium tracking-[0.08em] text-zinc-400">Continuar compra</p>
                    <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Noches en Supra Roma.</h1>
                    <p className="text-sm leading-relaxed text-zinc-300">Viernes 22 de marzo · 10:00 PM · Supra Roma · Ciudad de México</p>
                  </div>
                </div>
              </div>

              <section id="payment" className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                <div className="space-y-3">
                  <p className="text-[0.84rem] font-medium tracking-[0.08em] text-zinc-400">Tus datos</p>
                  <h2 className="text-3xl font-semibold tracking-tight text-white">Confirma tu compra.</h2>
                  <p className="text-base leading-relaxed text-zinc-300">
                    Tu correo ya está verificado. Solo revisa tus datos y elige cómo quieres pagar.
                  </p>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                    <div className="flex items-start gap-4">
                      <div className="inline-flex shrink-0 rounded-2xl border border-white/10 bg-white/[0.05] p-3" style={{ color: colors.accent }}>
                        <FiUser className="text-base" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-400">Compra como</p>
                        <p className="mt-2 text-base font-medium text-white">Jesús Romero</p>
                        <p className="mt-1 text-sm text-zinc-300">jesus@correo.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                    <div className="flex items-start gap-4">
                      <div className="inline-flex shrink-0 rounded-2xl border border-white/10 bg-white/[0.05] p-3" style={{ color: colors.accent }}>
                        <FiMapPin className="text-base" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-400">Asistencia</p>
                        <p className="mt-2 text-base font-medium text-white">2 boletos General</p>
                        <p className="mt-1 text-sm text-zinc-300">Acceso individual · entrada regular</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <p className="text-sm font-medium text-zinc-200">Método de pago</p>
                  <div className="grid gap-4">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <article
                          key={method.title}
                          className={`rounded-[1.5rem] border p-5 ${method.active ? "border-white/20 bg-white/[0.05]" : "border-white/10 bg-white/[0.03]"}`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="inline-flex shrink-0 rounded-2xl border border-white/10 bg-white/[0.05] p-3" style={{ color: colors.accent }}>
                              <Icon className="text-base" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-3">
                                <h3 className="text-base font-semibold text-white">{method.title}</h3>
                                {method.active && (
                                  <span className="rounded-full border border-white/10 px-3 py-1 text-[0.72rem] tracking-[0.01em] text-zinc-300">
                                    Seleccionado
                                  </span>
                                )}
                              </div>
                              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{method.description}</p>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              </section>
            </div>

            <aside id="summary" className="grid gap-6 xl:sticky xl:top-28">
              <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                <div className="space-y-3">
                  <p className="text-[0.84rem] font-medium tracking-[0.08em] text-zinc-400">Resumen final</p>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">Esto es lo que vas a pagar.</h2>
                </div>

                <div className="mt-6 space-y-4 text-sm text-zinc-300">
                  <div className="flex items-center justify-between gap-4">
                    <span>2 × General</span>
                    <span>$560 MXN</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Comisiones</span>
                    <span>$0 MXN</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4 text-base font-semibold text-white">
                    <span>Total</span>
                    <span>$560 MXN</span>
                  </div>
                </div>

                <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5" style={{ color: colors.accent }}>
                      <FiCheckCircle className="text-base" />
                    </span>
                    <p className="text-sm leading-relaxed text-zinc-100">
                      Sin comisiones sorpresa. El total que ves aquí es el que pagarías al confirmar.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <button className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.86rem] font-semibold tracking-[0.01em] text-white shadow-[0_18px_45px_rgba(130,89,208,0.45)] transition hover:brightness-110" style={{ background: colors.accent }}>
                    Pagar ahora
                    <FiArrowRight className="text-sm" />
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 px-5 py-3 text-[0.86rem] font-medium tracking-[0.01em] text-zinc-200 transition hover:border-white/30 hover:text-white">
                    Volver a boletos
                  </button>
                </div>
              </section>

              <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                <div className="flex items-start gap-4">
                  <div className="inline-flex rounded-2xl border border-white/10 bg-white/[0.05] p-3" style={{ color: colors.accent }}>
                    <FiShield className="text-base" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Pago protegido</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                      Antes de confirmar, todavía puedes revisar tu compra, cambiar método de pago o volver al paso anterior sin perder el contexto.
                    </p>
                  </div>
                </div>
              </section>
            </aside>
          </div>

          <div className="flex justify-start pt-2">
            <Link href="/ticket-selection" className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
              <FiArrowLeft className="text-sm" />
              Volver a boletos
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
