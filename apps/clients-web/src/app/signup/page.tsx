"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { brandAssets, colors } from "@dcompass/ui";
import { AuthProcessLoader } from "@/components/auth-process-loader";
import { useAuth } from "@/components/auth-provider";
import { FiAlertCircle, FiArrowLeft, FiArrowRight, FiCheckCircle, FiEye, FiEyeOff, FiLock, FiShield, FiStar } from "react-icons/fi";

const signupPoints = [
  "Guarda eventos y sigue tus próximos planes desde un solo lugar.",
  "Recibe acceso más claro a tus boletos y movimientos.",
  "Empieza con una cuenta simple y termina de completar tu perfil después."
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const minPasswordLength = 8;

export default function Page() {
  const router = useRouter();
  const { signup, loading, loadingState, appUser, firebaseUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const normalizedName = name.trim();
  const normalizedEmail = email.trim();

  useEffect(() => {
    if (!loading && (appUser || firebaseUser)) {
      router.replace("/");
    }
  }, [appUser, firebaseUser, loading, router]);

  const validation = useMemo(() => {
    const errors = {
      name: normalizedName.length < 2 ? "Escribe tu nombre completo." : "",
      email: normalizedEmail.length === 0 ? "Ingresa tu correo." : !emailRegex.test(normalizedEmail) ? "Ingresa un correo válido." : "",
      password:
        password.length === 0
          ? "Ingresa una contraseña."
          : password.length < minPasswordLength
            ? `Usa al menos ${minPasswordLength} caracteres.`
            : "",
      confirmPassword:
        confirmPassword.length === 0
          ? "Confirma tu contraseña."
          : confirmPassword !== password
            ? "Las contraseñas no coinciden."
            : ""
    };

    return {
      errors,
      isValid: Object.values(errors).every((value) => !value)
    };
  }, [confirmPassword, normalizedEmail, normalizedName, password]);

  const showError = (fieldError: string) => submitAttempted && Boolean(fieldError);

  const inputClassName = (hasError: boolean) =>
    `w-full rounded-2xl border bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-white/25 ${
      hasError ? "border-red-400/70" : "border-white/10"
    }`;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempted(true);
    setSubmitError(null);

    if (!validation.isValid) {
      return;
    }

    try {
      await signup({
        fullName: normalizedName,
        email: normalizedEmail,
        password
      });
      router.push("/");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "No se pudo crear la cuenta.");
    }
  };

  const loaderMessage =
    loadingState === "signup"
      ? "Estamos creando tu cuenta y preparando tu acceso."
      : loadingState === "restoring"
        ? "Ya detectamos una sesión activa y te estamos llevando al inicio."
        : loadingState === "logout"
          ? "Estamos cerrando tu sesión."
          : "Estamos preparando tu acceso.";

  return (
    <>
      {(loadingState === "signup" || (loadingState === "restoring" && (appUser || firebaseUser))) && (
        <AuthProcessLoader message={loaderMessage} />
      )}

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
                  <p className="text-[0.82rem] font-medium tracking-[0.08em] text-zinc-300">Crear cuenta</p>
                  <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl xl:text-[3.7rem]">
                    Crea tu cuenta y encuentra tu siguiente plan.
                  </h1>
                  <p className="max-w-lg text-base leading-relaxed text-zinc-200 sm:text-lg">
                    Crea tu acceso y deja listo tu siguiente plan.
                  </p>
                </div>

                <div className="grid gap-3 sm:max-w-xl">
                  {signupPoints.map((point) => (
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
                    <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Crea tu cuenta</h1>
                    <p className="max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">Empieza con tus datos y deja listo tu acceso a eventos, boletos y próximos planes.</p>
                  </div>
                </div>

                <div className="w-full max-w-[34rem] rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 py-6 shadow-[0_30px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:px-8 sm:py-8 lg:px-10 lg:py-10">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="inline-flex rounded-2xl border border-white/10 bg-white/[0.05] p-3" style={{ color: colors.accent }}>
                        <FiStar className="text-lg" />
                      </div>

                      <div className="space-y-3">
                        <p className="max-w-md text-base leading-relaxed text-zinc-300">
                          Empieza con tus datos y deja listo tu acceso a eventos, boletos y próximos planes.
                        </p>
                      </div>
                    </div>

                    <form className="space-y-5" noValidate onSubmit={handleSubmit}>
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-zinc-200">
                          Nombre
                        </label>
                        <input
                          id="name"
                          type="text"
                          placeholder="Tu nombre"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          aria-invalid={showError(validation.errors.name)}
                          aria-describedby={showError(validation.errors.name) ? "name-error" : undefined}
                          className={inputClassName(showError(validation.errors.name))}
                        />
                        {showError(validation.errors.name) ? (
                          <p id="name-error" className="inline-flex items-center gap-2 text-sm text-red-300">
                            <FiAlertCircle className="text-sm" />
                            {validation.errors.name}
                          </p>
                        ) : null}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-zinc-200">
                          Correo electrónico
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="tu@correo.com"
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
                        <label htmlFor="password" className="text-sm font-medium text-zinc-200">
                          Contraseña
                        </label>
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

                      <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-zinc-200">
                          Confirmar contraseña
                        </label>
                        <div className="relative">
                          <input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            aria-invalid={showError(validation.errors.confirmPassword)}
                            aria-describedby={showError(validation.errors.confirmPassword) ? "confirm-password-error" : undefined}
                            className={`${inputClassName(showError(validation.errors.confirmPassword))} pr-12`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="absolute inset-y-0 right-0 inline-flex items-center px-4 text-zinc-400 transition hover:text-white"
                            aria-label={showConfirmPassword ? "Ocultar confirmación de contraseña" : "Mostrar confirmación de contraseña"}
                          >
                            {showConfirmPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                          </button>
                        </div>
                        {showError(validation.errors.confirmPassword) ? (
                          <p id="confirm-password-error" className="inline-flex items-center gap-2 text-sm text-red-300">
                            <FiAlertCircle className="text-sm" />
                            {validation.errors.confirmPassword}
                          </p>
                        ) : null}
                      </div>

                      {submitError ? (
                        <p className="inline-flex items-center gap-2 text-sm text-red-300">
                          <FiAlertCircle className="text-sm" />
                          {submitError}
                        </p>
                      ) : null}

                      <button
                        type="submit"
                        disabled={!validation.isValid || loading}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.92rem] font-semibold tracking-[0.01em] text-white shadow-[0_18px_45px_rgba(130,89,208,0.45)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:brightness-100"
                        style={{ background: colors.accent }}
                      >
                        {loading ? "Creando cuenta..." : "Crear cuenta"}
                        <FiArrowRight className="text-sm" />
                      </button>
                    </form>

                    <div className="grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                        <div className="mb-3 inline-flex rounded-2xl border border-white/10 bg-white/[0.05] p-3" style={{ color: colors.accent }}>
                          <FiShield className="text-base" />
                        </div>
                        <h3 className="text-base font-semibold text-white">Acceso protegido</h3>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                          Tu cuenta queda lista para guardar movimientos y accesos con más seguridad.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                        <div className="mb-3 inline-flex rounded-2xl border border-white/10 bg-white/[0.05] p-3" style={{ color: colors.accent }}>
                          <FiLock className="text-base" />
                        </div>
                        <h3 className="text-base font-semibold text-white">Empieza simple</h3>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                          Crea tu cuenta primero y completa lo demás cuando ya estés dentro.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-white/10 pt-5 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
                      <p>
                        ¿Ya tienes acceso?{" "}
                        <Link href="/login" className="font-medium transition hover:text-white" style={{ color: colors.accent }}>
                          Inicia sesión
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
    </>
  );
}
