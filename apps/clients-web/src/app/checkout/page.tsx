"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { brandAssets, colors, FullscreenLoader } from "@dcompass/ui";
import { FiArrowLeft, FiArrowRight, FiCheckCircle, FiCreditCard, FiLock, FiMenu, FiPhone, FiUser, FiX } from "react-icons/fi";

const navLinks = [
  { label: "Compra", href: "#top" },
  { label: "Datos", href: "#buyer-data" },
  { label: "Pago", href: "#payment" },
  { label: "Resumen", href: "#summary" }
];

export default function CheckoutPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [otpStep, setOtpStep] = useState<"closed" | "confirm" | "input">("closed");
  const [otpValue, setOtpValue] = useState("");
  const [checkoutLoaderVisible, setCheckoutLoaderVisible] = useState(false);
  const [buyerName] = useState("Jesús Romero");
  const [buyerPhone] = useState("5512345678");
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("Jesús Romero");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");

  const sanitizedCardDigits = useMemo(() => cardNumber.replace(/\D/g, ""), [cardNumber]);
  const sanitizedCvvDigits = useMemo(() => cvv.replace(/\D/g, ""), [cvv]);
  const sanitizedPhoneDigits = useMemo(() => buyerPhone.replace(/\D/g, ""), [buyerPhone]);

  const handleCardNumberChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    const grouped = digits.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(grouped);
  };

  const handleExpirationChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    const formatted = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    setExpiration(formatted);
  };

  const handleCvvChange = (value: string) => {
    setCvv(value.replace(/\D/g, "").slice(0, 4));
  };

  const isCardNumberValid = sanitizedCardDigits.length === 16;
  const isExpirationValid = /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(expiration);
  const isCvvValid = sanitizedCvvDigits.length >= 3;
  const isBuyerNameValid = buyerName.trim().length >= 3;
  const isCardholderNameValid = cardholderName.trim().length >= 3;
  const isPhoneValid = sanitizedPhoneDigits.length === 10;

  const handleVerifyCode = () => {
    setCheckoutLoaderVisible(true);
    setOtpStep("closed");
    setOtpValue("");

    window.setTimeout(() => {
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", "/events");
      }

      router.push("/checkout/success");
    }, 2400);
  };

  useEffect(() => {
    if (otpStep === "closed") {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [otpStep]);

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

            <div className="border-t border-white/10 pt-6 text-sm text-zinc-300">Pago protegido</div>
          </aside>
        </div>

        <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-5 py-8 sm:px-6 lg:px-10 lg:py-10">
          <div className="space-y-3">
            <Link href="/ticket-selection" className="inline-flex w-fit items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-white">
              <FiArrowLeft className="text-sm" />
              Volver a boletos
            </Link>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Continuar compra</h1>
              <p className="max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">Confirma tus datos, revisa tu compra y completa tu pago sin perder contexto de dónde estás.</p>
            </div>
          </div>

          <div className="grid gap-8 xl:grid-cols-[0.98fr_1.02fr] xl:items-start">
            <div className="space-y-6">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                <div className="flex items-start gap-4">
                  <div className="relative h-24 w-24 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#070914]">
                    <Image src="/hero/hero-v2.png" alt="Noches en Supra Roma" fill className="object-cover" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Noches en Supra Roma.</h2>
                    <p className="text-sm leading-relaxed text-zinc-300">Viernes 22 de marzo · 10:00 PM · Supra Roma · Ciudad de México</p>
                  </div>
                </div>
              </div>

              <section id="buyer-data" className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                <div className="space-y-3">
                  <p className="text-[0.84rem] font-medium tracking-[0.08em] text-zinc-400">Tus datos</p>
                  <h2 className="text-3xl font-semibold tracking-tight text-white">Completa lo necesario para tu compra.</h2>
                  <p className="text-base leading-relaxed text-zinc-300">Tu correo ya está verificado. Solo confirma tu nombre y teléfono antes de pagar.</p>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-200">Nombre</label>
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-zinc-300 opacity-90">
                      <FiUser className="text-base" />
                      <span className="text-sm text-white">{buyerName}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-200">Teléfono</label>
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-zinc-300 opacity-90">
                      <FiPhone className="text-base" />
                      <span className="text-sm text-white">{buyerPhone}</span>
                    </div>
                  </div>
                </div>
              </section>

              <section id="payment" className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                <div className="space-y-3">
                  <p className="text-[0.84rem] font-medium tracking-[0.08em] text-zinc-400">Método de pago</p>
                  <h2 className="text-3xl font-semibold tracking-tight text-white">Paga con tarjeta.</h2>
                  <p className="text-base leading-relaxed text-zinc-300">Revisa tus datos e ingresa la información de tu tarjeta para continuar.</p>
                </div>

                <div className="mt-6 grid gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-200">Número de tarjeta</label>
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-zinc-300">
                      <FiCreditCard className="text-base" />
                      <input value={cardNumber} onChange={(e) => handleCardNumberChange(e.target.value)} inputMode="numeric" placeholder="1234 5678 9012 3456" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500" />
                    </div>
                    {!isCardNumberValid && <p className="text-xs text-amber-300">La tarjeta debe tener 16 dígitos.</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-200">Nombre del titular</label>
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-zinc-300">
                      <FiUser className="text-base" />
                      <input value={cardholderName} onChange={(e) => setCardholderName(e.target.value)} placeholder="Nombre del titular" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500" />
                    </div>
                    {!isCardholderNameValid && <p className="text-xs text-amber-300">Ingresa el nombre como aparece en tu tarjeta.</p>}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-200">Expiración</label>
                      <input
                        value={expiration}
                        onChange={(e) => handleExpirationChange(e.target.value)}
                        inputMode="numeric"
                        placeholder="MM/AA"
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500"
                      />
                      {!isExpirationValid && <p className="text-xs text-amber-300">Usa el formato MM/AA.</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-200">CVV</label>
                      <input
                        value={cvv}
                        onChange={(e) => handleCvvChange(e.target.value)}
                        inputMode="numeric"
                        placeholder="CVV"
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500"
                      />
                      {!isCvvValid && <p className="text-xs text-amber-300">Ingresa 3 o 4 dígitos.</p>}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-end gap-2 text-xs text-zinc-500">
                    <span>Powered by</span>
                    <span>Mercadopago</span>
                    <Image
                      src="/payments/mercado-pago.jpg"
                      alt="Mercado Pago"
                      width={88}
                      height={32}
                      className="h-7 w-auto rounded-lg object-contain"
                    />
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
                  <div className="flex items-center justify-between gap-4"><span>2 × General</span><span>$560 MXN</span></div>
                  <div className="flex items-center justify-between gap-4"><span>Comisiones</span><span>$0 MXN</span></div>
                  <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4 text-base font-semibold text-white"><span>Total</span><span>$560 MXN</span></div>
                </div>

                <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5" style={{ color: colors.accent }}><FiCheckCircle className="text-base" /></span>
                    <p className="text-sm leading-relaxed text-zinc-100">Sin comisiones sorpresa. El total que ves aquí es el que pagarías al confirmar.</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <button
                    onClick={() => setOtpStep("confirm")}
                    disabled={!(isBuyerNameValid && isPhoneValid && isCardNumberValid && isCardholderNameValid && isExpirationValid && isCvvValid)}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.86rem] font-semibold tracking-[0.01em] text-white shadow-[0_18px_45px_rgba(130,89,208,0.45)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ background: colors.accent }}
                  >
                    Pagar ahora
                    <FiArrowRight className="text-sm" />
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 px-5 py-3 text-[0.86rem] font-medium tracking-[0.01em] text-zinc-200 transition hover:border-white/30 hover:text-white">
                    Volver a boletos
                  </button>
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

      {otpStep !== "closed" && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto px-5 pt-[10vh] pb-6 sm:pt-[12vh]">
          <button className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-label="Cerrar verificación" onClick={() => setOtpStep("closed")} />

          <div className="relative z-[61] w-full max-w-xl rounded-[2rem] border border-white/10 bg-[#070914] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:p-8">
            {otpStep === "confirm" ? (
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-[0.84rem] font-medium tracking-[0.08em] text-zinc-400">Verifica tu compra</p>
                  <h2 className="text-3xl font-semibold tracking-tight text-white">Necesitamos confirmar esta operación.</h2>
                  <p className="text-base leading-relaxed text-zinc-300">Enviaremos un código de verificación a <span className="font-medium text-white">jesus@correo.com</span>. Es necesario para continuar.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button onClick={() => setOtpStep("input")} className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.86rem] font-semibold tracking-[0.01em] text-white shadow-[0_18px_45px_rgba(130,89,208,0.45)] transition hover:brightness-110" style={{ background: colors.accent }}>
                    Enviar código
                    <FiArrowRight className="text-sm" />
                  </button>
                  <button onClick={() => setOtpStep("closed")} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 px-5 py-3 text-[0.86rem] font-medium tracking-[0.01em] text-zinc-200 transition hover:border-white/30 hover:text-white">
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-[0.84rem] font-medium tracking-[0.08em] text-zinc-400">Ingresa tu código</p>
                  <h2 className="text-3xl font-semibold tracking-tight text-white">Verifica para continuar.</h2>
                  <p className="text-base leading-relaxed text-zinc-300">Te enviamos un código a <span className="font-medium text-white">jesus@correo.com</span>. Escríbelo aquí para continuar con tu compra.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-200">Código OTP</label>
                  <input value={otpValue} onChange={(event) => setOtpValue(event.target.value)} placeholder="123456" className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-white/25" />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-400">
                  <span>04:59</span>
                  <button className="transition hover:text-white">Reenviar código</button>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button onClick={handleVerifyCode} disabled={otpValue.trim().length < 6} className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.86rem] font-semibold tracking-[0.01em] text-white shadow-[0_18px_45px_rgba(130,89,208,0.45)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50" style={{ background: colors.accent }}>
                    Verificar código
                    <FiArrowRight className="text-sm" />
                  </button>
                  <button onClick={() => setOtpStep("closed")} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 px-5 py-3 text-[0.86rem] font-medium tracking-[0.01em] text-zinc-200 transition hover:border-white/30 hover:text-white">
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <FullscreenLoader
        isOpen={checkoutLoaderVisible}
        label="Procesando compra"
        title="Estamos preparando tus boletos."
        description="Verificando tu pago, confirmando tu acceso y dejando listo el siguiente paso sin sacarte del flujo."
      />
    </main>
  );
}
