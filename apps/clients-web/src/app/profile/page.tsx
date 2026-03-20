"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { FirebaseError } from "firebase/app";
import { colors } from "@dcompass/ui";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { sendEmailVerification } from "firebase/auth";
import { FiAlertCircle, FiArrowRight, FiEdit3, FiX } from "react-icons/fi";
import { firebaseStorage } from "@/lib/firebase/client";
import { updateProfile } from "@/lib/auth-api";
import { useAuth } from "@/components/auth-provider";

const memberSinceFormatter = new Intl.DateTimeFormat("es-MX", {
  month: "long",
  year: "numeric"
});

type VerifyStatus = "idle" | "sending" | "sent" | "error";
type SaveNameStatus = "idle" | "saving" | "error";
type SavePhotoStatus = "idle" | "saving" | "error";

function formatMemberSince(value?: string) {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return memberSinceFormatter.format(parsed);
}

const VALID_IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
const VALID_IMAGE_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_AVATAR_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_AVATAR_DIMENSION = 512;
const AVATAR_OUTPUT_QUALITY = 0.85;
const DEFAULT_STORAGE_ERROR_MESSAGE = "Ocurrió un error. Inténtalo más tarde.";
const FIREBASE_STORAGE_ERROR_MESSAGES: Record<string, string> = {
  "storage/unauthenticated": "Necesitas iniciar sesión para actualizar tu foto.",
  "storage/unauthorized": "No tienes permiso para cambiar esta imagen.",
  "storage/quota-exceeded": "Has alcanzado el límite de almacenamiento.",
  "storage/retry-limit-exceeded": "No pudimos subir tu imagen. Intenta de nuevo.",
  "storage/canceled": "La subida fue cancelada.",
  "storage/invalid-checksum": "El archivo no se pudo verificar.",
  "storage/object-not-found": "No pudimos encontrar el archivo para actualizar.",
  "storage/bucket-not-found": "No pudimos acceder al almacenamiento.",
  "storage/project-not-found": "No pudimos encontrar el proyecto de Firebase.",
  "storage/unknown": DEFAULT_STORAGE_ERROR_MESSAGE
};

function getFileExtension(fileName: string) {
  const match = fileName.toLowerCase().match(/\.([^.]+)$/);
  return match?.[1] ?? "";
}

function getExtensionFromMimeType(mimeType: string) {
  const normalized = mimeType.toLowerCase();
  if (normalized === "image/jpeg" || normalized === "image/jpg") return "jpg";
  if (normalized === "image/png") return "png";
  if (normalized === "image/webp") return "webp";
  return "jpg";
}

function validatePhotoFile(file: File) {
  const normalizedMime = file.type.toLowerCase();
  if (
    !VALID_IMAGE_EXTENSIONS.includes(getFileExtension(file.name)) &&
    !VALID_IMAGE_MIME_TYPES.includes(normalizedMime)
  ) {
    return "Solo se permiten imágenes en formato JPG, PNG o WEBP.";
  }

  if (file.size > MAX_AVATAR_FILE_SIZE_BYTES) {
    return "La imagen no debe pesar más de 5 MB.";
  }

  return null;
}

async function prepareAvatarFile(file: File) {
  const bitmap = await createImageBitmap(file);
  const ratio = Math.min(1, MAX_AVATAR_DIMENSION / bitmap.width, MAX_AVATAR_DIMENSION / bitmap.height);
  const width = Math.max(1, Math.round(bitmap.width * ratio));
  const height = Math.max(1, Math.round(bitmap.height * ratio));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) {
    bitmap.close();
    throw new Error("No se pudo procesar la imagen.");
  }
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const outputType = file.type || "image/jpeg";
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (!result) {
          reject(new Error("No se pudo procesar la imagen."));
          return;
        }
        resolve(result);
      },
      outputType,
      AVATAR_OUTPUT_QUALITY
    );
  });

  return new File([blob], file.name, { type: blob.type || outputType });
}

function getFriendlyFirebaseStorageErrorMessage(error: unknown) {
  if (error instanceof FirebaseError) {
    return FIREBASE_STORAGE_ERROR_MESSAGES[error.code] ?? DEFAULT_STORAGE_ERROR_MESSAGE;
  }

  return DEFAULT_STORAGE_ERROR_MESSAGE;
}

function getInitials(fullName?: string) {
  if (!fullName) return "DC";
  const parts = fullName.trim().split(/\s+/).filter(Boolean).slice(0, 2);
  if (!parts.length) return "DC";
  return parts.map((part) => part[0]?.toUpperCase()).join("");
}

function FloatingEditButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute -right-1.5 -top-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/12 bg-[#11131d] text-zinc-200 shadow-[0_18px_45px_rgba(0,0,0,0.35)] transition hover:border-white/25 hover:text-white"
      aria-label={label}
    >
      <FiEdit3 className="text-[11px]" />
    </button>
  );
}

function GenericAvatar({ name }: { name: string }) {
  const initials = getInitials(name);

  return (
    <div className="flex h-24 w-24 items-center justify-center rounded-[1.75rem] border border-white/10 bg-white/[0.05] text-2xl font-semibold text-white shadow-[0_18px_45px_rgba(130,89,208,0.25)]">
      {initials}
    </div>
  );
}

function ModalFrame({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-5 pt-[10vh] sm:pt-[12vh]">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-md rounded-[1.8rem] border border-white/10 bg-[#04060c]/95 p-6 shadow-[0_25px_90px_rgba(0,0,0,0.76)]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Cerrar modal" className="text-zinc-400 transition hover:text-white">
            <FiX />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { appUser, firebaseUser, loading, logout, loadingState, setAppUser } = useAuth();
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<{ file: File; url: string; name: string } | null>(null);
  const [photoStatus, setPhotoStatus] = useState<SavePhotoStatus>("idle");
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [nameModalOpen, setNameModalOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [nameStatus, setNameStatus] = useState<SaveNameStatus>("idle");
  const [nameError, setNameError] = useState<string | null>(null);
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

  const memberSince = useMemo(() => formatMemberSince(appUser?.createdAt), [appUser?.createdAt]);
  const originalName = appUser?.fullName ?? "";
  const normalizedName = nameInput.trim();
  const nameHasChanges = Boolean(appUser) && normalizedName.length > 0 && normalizedName !== originalName.trim();
  const canSaveName = nameHasChanges && normalizedName.length >= 2 && nameStatus !== "saving";

  const handlePhotoClick = () => fileInputRef.current?.click();

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validationError = validatePhotoFile(file);
    if (validationError) {
      setSelectedPhoto(null);
      setPhotoError(validationError);
      setPhotoStatus("idle");
      setPhotoModalOpen(false);
      event.target.value = "";
      return;
    }

    const url = URL.createObjectURL(file);
    setSelectedPhoto({ file, url, name: file.name });
    setPhotoError(null);
    setPhotoStatus("idle");
    setPhotoModalOpen(true);
    event.target.value = "";
  };

  const closePhotoModal = () => {
    setPhotoModalOpen(false);
    setSelectedPhoto(null);
    setPhotoError(null);
    setPhotoStatus("idle");
  };

  const openNameModal = () => {
    setNameInput(originalName);
    setNameError(null);
    setNameStatus("idle");
    setNameModalOpen(true);
  };

  const closeNameModal = () => {
    setNameModalOpen(false);
    setNameError(null);
    setNameStatus("idle");
  };

  const handleNameSave = async () => {
    if (!appUser || !firebaseUser || !canSaveName) return;

    setNameStatus("saving");
    setNameError(null);

    try {
      const idToken = await firebaseUser.getIdToken();
      const session = await updateProfile({ idToken, fullName: normalizedName });
      setAppUser(session.user);
      setNameModalOpen(false);
    } catch (error) {
      setNameError(error instanceof Error ? error.message : "No se pudo actualizar tu nombre.");
      setNameStatus("error");
      return;
    }

    setNameStatus("idle");
  };

  const handleSavePhoto = async () => {
    if (!appUser || !firebaseUser || !selectedPhoto) return;

    setPhotoStatus("saving");
    setPhotoError(null);

    try {
      const optimizedFile = await prepareAvatarFile(selectedPhoto.file);
      const extension = getExtensionFromMimeType(optimizedFile.type);
      const storageRef = ref(firebaseStorage, `users/${appUser.firebaseUid ?? appUser.id}/avatar.${extension}`);
      await uploadBytes(storageRef, optimizedFile, { contentType: optimizedFile.type });
      const avatarUrl = await getDownloadURL(storageRef);
      const idToken = await firebaseUser.getIdToken();
      const session = await updateProfile({ idToken, avatarUrl });
      setAppUser(session.user);
      closePhotoModal();
    } catch (error) {
      const friendlyMessage =
        error instanceof FirebaseError
          ? getFriendlyFirebaseStorageErrorMessage(error)
          : error instanceof Error
            ? error.message
            : DEFAULT_STORAGE_ERROR_MESSAGE;
      setPhotoError(friendlyMessage);
      setPhotoStatus("error");
    }
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
    if (!firebaseUser) return;
    setVerifyStatus("sending");
    try {
      await sendEmailVerification(firebaseUser);
      setVerifyStatus("sent");
    } catch {
      setVerifyStatus("error");
    }
  };

  if (loading) {
    return <main className="min-h-screen bg-[#010207] text-white"><div className="grid min-h-screen place-items-center px-5"><p className="text-sm text-zinc-400">Cargando tu sesión...</p></div></main>;
  }

  if (!appUser) {
    return (
      <main className="min-h-screen bg-[#010207] text-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-6 px-5 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Mi perfil</p>
          <h1 className="text-3xl font-semibold text-white">Necesitas iniciar sesión</h1>
          <p className="max-w-2xl text-sm text-zinc-400">Para ver tu perfil, tus datos y tus interacciones con DCompass debes iniciar sesión con tu cuenta.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/login" className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40">Iniciar sesión</Link>
            <Link href="/signup" className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40">Crear cuenta</Link>
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
      <div className="relative mx-auto flex w-full max-w-[880px] flex-col gap-8 px-5 py-10 lg:px-10">
        <div className="space-y-3">
          <Link href="/" className="inline-flex w-fit items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-white">
            <FiArrowRight className="rotate-180 text-sm" /> Volver
          </Link>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Mi perfil</h1>
            <p className="max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">Revisa la información principal de tu cuenta y completa lo necesario para dejarla al día.</p>
          </div>
        </div>

        <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.webp" className="hidden" onChange={handlePhotoChange} />

        <section className="space-y-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="relative w-fit">
              {appUser.avatarUrl ? (
                <div className="relative h-24 w-24 overflow-hidden rounded-[1.75rem] border border-white/10">
                  <Image src={appUser.avatarUrl} alt={appUser.fullName} fill className="object-cover" unoptimized />
                </div>
              ) : (
                <GenericAvatar name={appUser.fullName} />
              )}
              <FloatingEditButton onClick={handlePhotoClick} label="Editar foto" />
            </div>

            <div className="space-y-3 pt-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-semibold text-white">{appUser.fullName}</h2>
                <button type="button" onClick={openNameModal} className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/12 bg-[#11131d] text-zinc-200 shadow-[0_18px_45px_rgba(0,0,0,0.35)] transition hover:border-white/25 hover:text-white" aria-label="Editar nombre">
                  <FiEdit3 className="text-[11px]" />
                </button>
              </div>
              <p className="text-sm text-zinc-300">{appUser.email}</p>
              {memberSince ? <p className="text-sm text-zinc-400">Miembro desde {memberSince}</p> : null}
            </div>

            <button
              type="button"
              onClick={() => void logout()}
              disabled={loadingState === "logout"}
              className="ml-auto rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/50 disabled:opacity-60"
            >
              {loadingState === "logout" ? "Cerrando..." : "Cerrar sesión"}
            </button>
          </div>

          {photoError && !photoModalOpen ? (
            <p className="text-sm text-rose-400">{photoError}</p>
          ) : null}

          {!appUser.emailVerified ? (
            <div className="max-w-2xl rounded-[1.5rem] border border-amber-400/20 bg-amber-400/10 p-4">
              <div className="flex items-start gap-3">
                <FiAlertCircle className="mt-0.5 text-base text-amber-300" />
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-amber-100">Tu correo aún no está verificado.</p>
                  <p className="text-sm leading-relaxed text-amber-50/85">Verifícalo para darle más seguridad a tu cuenta y dejar este paso completo desde el inicio.</p>
                  <button type="button" onClick={openVerifyModal} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.8rem] font-semibold text-white shadow-[0_18px_45px_rgba(130,89,208,0.35)] transition hover:brightness-110" style={{ background: colors.accent }}>
                    Verificar correo <FiArrowRight className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </section>
      </div>

      {photoModalOpen && selectedPhoto ? (
        <ModalFrame title="Actualizar foto" onClose={closePhotoModal}>
          <p className="mt-3 text-sm text-zinc-400">Revisa la imagen seleccionada antes de guardarla en tu perfil.</p>
          <div className="mt-4 h-40 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <Image src={selectedPhoto.url} alt="Vista previa foto" width={420} height={260} className="h-full w-full object-cover" unoptimized />
          </div>
          {photoError ? <p className="mt-3 text-sm text-rose-400">{photoError}</p> : null}
          <div className="mt-6 flex items-center justify-end gap-3">
            <button type="button" onClick={closePhotoModal} className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/50">Cancelar</button>
            <button type="button" onClick={() => void handleSavePhoto()} disabled={photoStatus === "saving"} className="rounded-full border border-white/10 bg-gradient-to-r from-[#7b4dff] to-[#e053ff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:brightness-110 disabled:opacity-60">
              {photoStatus === "saving" ? "Guardando..." : "Guardar foto"}
            </button>
          </div>
        </ModalFrame>
      ) : null}

      {nameModalOpen ? (
        <ModalFrame title="Editar nombre" onClose={closeNameModal}>
          <p className="mt-3 text-sm text-zinc-400">Actualiza el nombre que se mostrará dentro de tu cuenta.</p>
          <input type="text" value={nameInput} onChange={(event) => setNameInput(event.target.value)} className="mt-4 w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-base text-white outline-none focus:border-white/60" minLength={2} autoFocus />
          {nameError ? <p className="mt-3 text-sm text-rose-400">{nameError}</p> : null}
          <div className="mt-6 flex items-center justify-end gap-3">
            <button type="button" onClick={closeNameModal} className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/50">Cancelar</button>
            <button type="button" onClick={() => void handleNameSave()} disabled={!canSaveName} className="rounded-full border border-white/10 bg-gradient-to-r from-[#7b4dff] to-[#e053ff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:brightness-110 disabled:opacity-60">
              {nameStatus === "saving" ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </ModalFrame>
      ) : null}

      {verifyModalOpen ? (
        <ModalFrame title={verifyStatus === "sent" ? "Correo enviado" : "Verificar correo"} onClose={closeVerifyModal}>
          {verifyStatus === "sent" ? (
            <>
              <p className="mt-3 text-sm text-zinc-300">Te enviamos un correo de verificación a <strong>{appUser.email}</strong>. Revisa tu bandeja de entrada para continuar.</p>
              <div className="mt-6 flex items-center justify-end gap-3">
                <button type="button" onClick={closeVerifyModal} className="rounded-full border border-white/10 bg-gradient-to-r from-[#7b4dff] to-[#e053ff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:brightness-110">Entendido</button>
              </div>
            </>
          ) : (
            <>
              <p className="mt-3 text-sm text-zinc-400">Se enviará un correo de verificación a <strong>{appUser.email}</strong>.</p>
              {verifyStatus === "error" ? <p className="mt-4 text-sm text-rose-400">No pudimos enviar el correo. Intenta más tarde.</p> : null}
              <div className="mt-6 flex items-center justify-between gap-3">
                <button type="button" onClick={closeVerifyModal} className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/50">Cancelar</button>
                <button type="button" onClick={() => void handleSendVerification()} disabled={verifyStatus === "sending"} className="rounded-full border border-white/10 bg-gradient-to-r from-[#7b4dff] to-[#e053ff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:brightness-110 disabled:opacity-60">
                  {verifyStatus === "sending" ? "Enviando..." : "Enviar correo"}
                </button>
              </div>
            </>
          )}
        </ModalFrame>
      ) : null}
    </main>
  );
}
