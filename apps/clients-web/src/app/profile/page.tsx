"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { FiCamera, FiCheckCircle, FiEdit3, FiInfo, FiLogOut, FiX } from "react-icons/fi";
import { sendEmailVerification } from "firebase/auth";
import { useAuth } from "@/components/auth-provider";

const memberSinceFormatter = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "long",
  year: "numeric"
});

type VerifyStatus = "idle" | "sending" | "sent" | "error";

function formatMemberSince(value?: string) {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return memberSinceFormatter.format(parsed);
}

function getInitials(fullName?: string) {
  if (!fullName) {
    return "DC";
  }

  const parts = fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  if (!parts.length) {
    return "DC";
  }

  return parts.map((part) => part[0].toUpperCase()).join("");
}

export default function ProfilePage() {
  const { appUser, firebaseUser, loading, logout, loadingState } = useAuth();
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; name: string } | null>(null);
  const [nameModalOpen, setNameModalOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [nameFeedback, setNameFeedback] = useState<string | null>(null);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const previewUrl = selectedPhoto?.url;

    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [selectedPhoto]);

  const initials = useMemo(() => getInitials(appUser?.fullName), [appUser?.fullName]);
  const memberSince = useMemo(() => formatMemberSince(appUser?.createdAt), [appUser?.createdAt]);
  const originalName = appUser?.fullName ?? "";
  const nameHasChanges = Boolean(appUser) && nameInput.trim().length > 0 && nameInput.trim() !== originalName.trim();
  const canSaveName = nameHasChanges && nameInput.trim().length >= 3;

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const url = URL.createObjectURL(file);
    setSelectedPhoto({ url, name: file.name });
    setPhotoModalOpen(true);
    event.target.value = "";
  };

  const closePhotoModal = () => {
    setPhotoModalOpen(false);
    setSelectedPhoto(null);
  };

  const openNameModal = () => {
    setNameInput(originalName);
    setNameFeedback(null);
    setNameModalOpen(true);
  };

  const closeNameModal = () => {
    setNameModalOpen(false);
    setNameFeedback(null);
  };

  const handleNameSave = () => {
    setNameFeedback("La actualización real del nombre aún no está conectada con el backend.");
  };

  const openVerifyModal = () => {
    setVerifyStatus("idle");
    setVerifyModalOpen(true);
  };

  const closeVerifyModal = () => {
    setVerifyModalOpen(false);
    if (verifyStatus === "sent") {
      setVerifyStatus("idle");
    }
  };

  const handleSendVerification = async () => {
    if (!firebaseUser) {
      return;
    }

    setVerifyStatus("sending");

    try {
      await sendEmailVerification(firebaseUser);
      setVerifyStatus("sent");
    } catch (error) {
      console.error("Failed to send verification email", error);
      setVerifyStatus("error");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#010207] text-white">
        <div className="grid min-h-screen place-items-center px-5">
          <p className="text-sm text-zinc-400">Cargando tu sesión...</p>
        </div>
      </main>
    );
  }

  if (!appUser) {
    return (
      <main className="min-h-screen bg-[#010207] text-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-6 px-5 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Mi perfil</p>
          <h1 className="text-3xl font-semibold text-white">Necesitas iniciar sesión</h1>
          <p className="max-w-2xl text-sm text-zinc-400">
            Para ver tu perfil, tus datos y tus interacciones con DCompass debes iniciar sesión con tu cuenta.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/login"
              className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/signup"
              className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
            >
              Crear cuenta
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#010207] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_42%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(130,89,208,0.25),_transparent_60%)]" />
      </div>
      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 py-10 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm uppercase tracking-[0.3em] text-zinc-400">
          <span>Mi perfil</span>
          <div className="flex flex-wrap items-center gap-3 text-[0.72rem] tracking-[0.3em] text-zinc-500">
            <Link href="/" className="transition hover:text-white">
              Inicio
            </Link>
            <Link href="/events" className="transition hover:text-white">
              Eventos
            </Link>
          </div>
        </div>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_25px_90px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-gradient-to-b from-white/10 to-white/[0.02] text-4xl font-semibold text-white">
                  {appUser.avatarUrl ? (
                    <Image src={appUser.avatarUrl} alt="Avatar" width={112} height={112} className="h-full w-full object-cover" unoptimized />
                  ) : (
                    <span>{initials}</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handlePhotoClick}
                  className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-sm transition hover:bg-white/10"
                  aria-label="Editar foto de perfil"
                >
                  <FiCamera className="text-lg text-white" />
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-semibold text-white">{appUser.fullName}</h1>
                  <button
                    type="button"
                    onClick={openNameModal}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm transition hover:border-white/40"
                    aria-label="Editar nombre"
                  >
                    <FiEdit3 className="text-lg text-white" />
                  </button>
                </div>
                <p className="text-sm text-zinc-300">{appUser.email}</p>
                {memberSince && (
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Miembro desde {memberSince}</p>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => void logout()}
              disabled={loadingState === "logout"}
              className="ml-auto flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/50 disabled:opacity-60"
            >
              <FiLogOut className="text-sm" />
              {loadingState === "logout" ? "Cerrando..." : "Cerrar sesión"}
            </button>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr]">
            <article className="rounded-[1.6rem] border border-white/10 bg-[#05060c]/90 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Correo electrónico</p>
                  <p className="mt-1 text-sm text-zinc-200">{appUser.email}</p>
                </div>
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.68rem] font-semibold tracking-[0.3em] ${
                    appUser.emailVerified
                      ? "border border-emerald-300/40 bg-emerald-500/10 text-emerald-300"
                      : "border border-amber-400/40 bg-amber-500/10 text-amber-300"
                  }`}
                >
                  <FiCheckCircle className="text-[0.9rem]" />
                  {appUser.emailVerified ? "Verificado" : "Sin verificar"}
                </span>
              </div>
              {!appUser.emailVerified && (
                <div className="mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-50 shadow-[0_15px_60px_rgba(237,144,12,0.25)]">
                  <p className="text-sm text-amber-50/80">
                    Verificar tu correo desbloquea acceso completo a beneficios y notificaciones importantes.
                  </p>
                  <button
                    type="button"
                    onClick={openVerifyModal}
                    className="mt-4 inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/40"
                  >
                    Verificar correo
                  </button>
                </div>
              )}
            </article>
          </div>
        </section>
      </div>

      {photoModalOpen && selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-start justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={closePhotoModal} aria-hidden="true" />
          <div className="relative mt-16 w-full max-w-md rounded-[1.8rem] border border-white/10 bg-[#04060c]/95 p-6 shadow-[0_25px_90px_rgba(0,0,0,0.76)]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Guardar foto</h2>
              <button
                type="button"
                onClick={closePhotoModal}
                aria-label="Cerrar modal"
                className="text-zinc-400 transition hover:text-white"
              >
                <FiX />
              </button>
            </div>
            <div className="mt-4">
              <div className="h-40 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <Image src={selectedPhoto.url} alt="Vista previa foto" width={420} height={260} className="h-full w-full object-cover" unoptimized />
              </div>
              <p className="mt-3 text-sm text-zinc-400">Solo se aplica como vista previa. La carga real aún no está disponible.</p>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closePhotoModal}
                className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={closePhotoModal}
                className="rounded-full border border-white/10 bg-gradient-to-r from-[#7b4dff] to-[#e053ff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:brightness-110"
              >
                Guardar foto
              </button>
            </div>
          </div>
        </div>
      )}

      {nameModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={closeNameModal} aria-hidden="true" />
          <div className="relative mt-16 w-full max-w-md rounded-[1.8rem] border border-white/10 bg-[#04060c]/95 p-6 shadow-[0_25px_90px_rgba(0,0,0,0.76)]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Editar nombre</h2>
              <button
                type="button"
                onClick={closeNameModal}
                aria-label="Cerrar modal"
                className="text-zinc-400 transition hover:text-white"
              >
                <FiX />
              </button>
            </div>
            <p className="mt-3 text-sm text-zinc-400">Este nombre se muestra en tu perfil público.</p>
            <input
              type="text"
              value={nameInput}
              onChange={(event) => setNameInput(event.target.value)}
              className="mt-4 w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-base text-white outline-none focus:border-white/60"
              minLength={3}
            />
            {nameFeedback && (
              <p className="mt-3 flex items-center gap-2 text-xs text-zinc-400">
                <FiInfo />
                {nameFeedback}
              </p>
            )}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeNameModal}
                className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleNameSave}
                disabled={!canSaveName}
                className="rounded-full border border-white/10 bg-gradient-to-r from-[#7b4dff] to-[#e053ff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:brightness-110 disabled:opacity-60"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {verifyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={closeVerifyModal} aria-hidden="true" />
          <div className="relative mt-16 w-full max-w-md rounded-[1.8rem] border border-white/10 bg-[#04060c]/95 p-6 shadow-[0_25px_90px_rgba(0,0,0,0.76)]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Verificar correo</h2>
              <button
                type="button"
                onClick={closeVerifyModal}
                aria-label="Cerrar modal"
                className="text-zinc-400 transition hover:text-white"
              >
                <FiX />
              </button>
            </div>
            <p className="mt-3 text-sm text-zinc-400">
              Se enviará un correo de verificación a <strong>{appUser.email}</strong>
            </p>
            {verifyStatus === "sent" && (
              <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-emerald-300">
                <FiCheckCircle />
                Correo enviado. Revisa tu bandeja.
              </div>
            )}
            {verifyStatus === "error" && (
              <p className="mt-4 text-sm text-rose-400">No pudimos enviar el correo. Intenta más tarde.</p>
            )}
            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={closeVerifyModal}
                className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/50"
              >
                {verifyStatus === "sent" ? "Cerrar" : "Cancelar"}
              </button>
              {verifyStatus !== "sent" && (
                <button
                  type="button"
                  onClick={handleSendVerification}
                  disabled={verifyStatus === "sending"}
                  className="rounded-full border border-white/10 bg-gradient-to-r from-[#7b4dff] to-[#e053ff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:brightness-110 disabled:opacity-60"
                >
                  {verifyStatus === "sending" ? "Enviando..." : "Enviar correo"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
