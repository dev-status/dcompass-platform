"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { brandAssets, colors } from "@dcompass/ui";
import { FiAlertCircle, FiArrowRight, FiEye, FiEyeOff, FiTool } from "react-icons/fi";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const minPasswordLength = 8;

export default function PartnersLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const normalizedEmail = email.trim();

  const validation = useMemo(() => {
    const errors = {
      email: normalizedEmail.length === 0 ? "Ingresa tu correo." : !emailRegex.test(normalizedEmail) ? "Ingresa un correo válido." : "",
      password:
        password.length === 0
          ? "Ingresa tu contraseña."
          : password.length < minPasswordLength
            ? `Usa al menos ${minPasswordLength} caracteres.`
            : ""
    };

    return {
      errors,
      isValid: Object.values(errors).every((value) => !value)
    };
  }, [normalizedEmail, password]);

  const showError = (fieldError: string) => submitAttempted && Boolean(fieldError);

  const inputClassName = (hasError: boolean) =>
    `w-full rounded-2xl border bg-white/[0.03] px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-white/25 ${
      hasError ? "border-red-400/70" : "border-white/10"
    }`;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempted(true);
  };

  return (
    <main className="min-h-screen bg-[#020308] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_42%)] blur-3xl" />
        <div className="absolute right-0 top-0 h-[28rem] w-[28rem] bg-[radial-gradient(circle,_rgba(130,89,208,0.20),_transparent_60%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] items-start justify-center px-5 py-6 sm:px-6 lg:items-center lg:px-10 lg:py-8">
        <section className="flex w-full items-center justify-center">
          <div className="w-full max-w-[34rem] space-y-5">
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Image
                    src={brandAssets.mainLogo}
                    alt="DCompass símbolo principal"
                    width={44}
                    height={44}
                    className="h-10 w-10 rounded-xl object-contain"
                  />
                  <div>
                    <Image
                      src={brandAssets.lettersLogo}
                      alt="DCOMPASS"
                      width={160}
                      height={34}
                      className="h-5 w-auto"
                    />
                    <p className="mt-1 text-[0.72rem] tracking-[0.14em] text-zinc-500">PARTNERS</p>
                  </div>
                </div>
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Inicia sesión</h1>
                <p className="max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                  Entra para continuar con la operación de tu cuenta y tus eventos.
                </p>
              </div>
            </div>

            <div className="w-full rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 py-6 shadow-[0_30px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:px-8 sm:py-8 lg:px-10 lg:py-10">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex rounded-2xl border border-white/10 bg-white/[0.05] p-3" style={{ color: colors.accent }}>
                    <FiTool className="text-lg" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-white">Acceso para partners</h2>
                    <p className="max-w-md text-sm leading-relaxed text-zinc-300">
                      Usa tu cuenta para entrar al panel de trabajo de DCompass Partners.
                    </p>
                  </div>
                </div>

                <form className="space-y-5" noValidate onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-zinc-200">
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="tu@empresa.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      aria-invalid={showError(validation.errors.email)}
                      aria-describedby={showError(validation.errors.email) ? "email-error" : undefined}
                      className={inputClassName(showError(validation.errors.email))}
                    />
                    {showError(validation.errors.email) ? (
                      <p id="email-error" className="inline-flex items-center gap-2 text-sm text-red-300">
                        <FiAlertCircle className="text-sm" />
                        {validation.errors.email}
                      </p>
                    ) : null}
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
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        aria-invalid={showError(validation.errors.password)}
                        aria-describedby={showError(validation.errors.password) ? "password-error" : undefined}
                        className={`${inputClassName(showError(validation.errors.password))} pr-12`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-0 inline-flex items-center px-4 text-zinc-400 transition hover:text-white"
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                      </button>
                    </div>
                    {showError(validation.errors.password) ? (
                      <p id="password-error" className="inline-flex items-center gap-2 text-sm text-red-300">
                        <FiAlertCircle className="text-sm" />
                        {validation.errors.password}
                      </p>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    disabled={!validation.isValid}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.92rem] font-semibold tracking-[0.01em] text-white shadow-[0_18px_45px_rgba(130,89,208,0.45)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:brightness-100"
                    style={{ background: colors.accent }}
                  >
                    Entrar al panel
                    <FiArrowRight className="text-sm" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
