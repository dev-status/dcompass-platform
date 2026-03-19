"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { brandAssets, colors, FullscreenLoader } from "@dcompass/ui";
import { FiArrowRight, FiMail, FiMapPin, FiSearch, FiSend, FiTag, FiUser } from "react-icons/fi";

const transferContext = {
  orderId: "DCP-2048",
  event: "Noches en Supra Roma",
  venue: "Supra Roma · CDMX",
  date: "Viernes 22 de marzo · 10:00 PM",
  image: "/hero/hero-v2.png",
  ticket: {
    id: "BOL-001",
    label: "Boleto 1 de 2",
    accessLabel: "Acceso general",
    currentOwner: "Jesús Romero"
  }
};

const simulatedRecipient = {
  name: "Sofía Martínez",
  email: "sofia@correo.com"
};

export default function TransferTicketPage() {
  const router = useRouter();
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [note, setNote] = useState("");
  const [searchTouched, setSearchTouched] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail);
  const recipientFound = useMemo(() => searchTouched && isEmailValid, [isEmailValid, searchTouched]);
  const canContinue = recipientFound && recipientName.trim().length >= 3;

  const handleSearchRecipient = () => {
    setSearchTouched(true);

    if (isEmailValid) {
      setRecipientName(simulatedRecipient.name);
      return;
    }

    setRecipientName("");
  };

  const handleContinueTransfer = () => {
    if (!canContinue) {
      return;
    }

    setLoaderVisible(true);

    window.setTimeout(() => {
      router.push(`/my-tickets/${transferContext.ticket.id}/transfer/pending`);
    }, 2200);
  };

  return (
    <main className="min-h-screen bg-[#020308] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_40%)] blur-3xl" />
        <div className="absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(130,89,208,0.24),_transparent_62%)]" />
      </div>

      <div className="relative">
        <header className="border-b border-white/10 bg-[#020308]/92 backdrop-blur-2xl">
          <div className="mx-auto flex w-full max-w-[1440px] items-center gap-6 px-5 py-4 sm:px-6 lg:px-10">
            <Link href="/" className="flex items-center gap-3 sm:gap-4">
              <Image src={brandAssets.mainLogo} alt="DCompass símbolo principal" width={54} height={54} priority className="h-10 w-10 rounded-xl object-contain sm:h-11 sm:w-11" />
              <Image src={brandAssets.lettersLogo} alt="DCOMPASS" width={190} height={40} priority className="h-5 w-auto sm:h-6" />
            </Link>
          </div>
        </header>

        <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-5 py-8 sm:px-6 lg:px-10 lg:py-10">
          <div className="space-y-3">
            <Link href="/my-tickets/demo" className="inline-flex w-fit items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-white">
              <FiArrowRight className="rotate-180 text-sm" />
              Volver
            </Link>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Transferir boleto</h1>
              <p className="max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">Busca al destinatario por correo y confirma que el boleto irá a la persona correcta antes de continuar.</p>
            </div>
          </div>

          <div className="grid gap-8 xl:grid-cols-[0.98fr_1.02fr] xl:items-start">
            <div className="space-y-6">
              <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
                <div className="relative aspect-[16/8] w-full border-b border-white/10 bg-[#070914]">
                  <Image src={transferContext.image} alt={transferContext.event} fill priority className="object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,3,8,0.08),rgba(2,3,8,0.76))]" />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <h2 className="text-3xl font-semibold text-white sm:text-4xl">{transferContext.event}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-300">{transferContext.ticket.label} · {transferContext.ticket.accessLabel}</p>
                  </div>
                </div>

                <div className="space-y-6 p-6 sm:p-8">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-sm font-medium text-zinc-400">Evento</p>
                      <p className="mt-2 text-base font-semibold text-white">{transferContext.event}</p>
                      <p className="mt-2 text-sm text-zinc-300">{transferContext.date}</p>
                    </div>
                    <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-sm font-medium text-zinc-400">Orden</p>
                      <p className="mt-2 text-base font-semibold text-white">{transferContext.orderId}</p>
                      <p className="mt-2 text-sm text-zinc-300">{transferContext.venue}</p>
                    </div>
                  </div>

                  <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-zinc-400">Boleto seleccionado</p>
                        <h3 className="text-2xl font-semibold text-white">{transferContext.ticket.label}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-zinc-300">
                          <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1">{transferContext.ticket.accessLabel}</span>
                          <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1">Titular actual: {transferContext.ticket.currentOwner}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <form className="grid gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-200">Correo del destinatario</label>
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-zinc-300">
                          <FiMail className="text-base" />
                          <input
                            value={recipientEmail}
                            onChange={(event) => {
                              setRecipientEmail(event.target.value);
                              setSearchTouched(false);
                              setRecipientName("");
                            }}
                            placeholder="persona@correo.com"
                            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleSearchRecipient}
                          className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.84rem] font-semibold tracking-[0.01em] text-white shadow-[0_18px_45px_rgba(130,89,208,0.45)] transition hover:brightness-110"
                          style={{ background: colors.accent }}
                        >
                          Buscar
                          <FiSearch className="text-sm" />
                        </button>
                      </div>
                      {!isEmailValid && searchTouched && <p className="text-xs text-amber-300">Ingresa un correo válido para buscar al destinatario.</p>}
                      {recipientFound && <p className="text-xs text-emerald-300">Encontramos una cuenta asociada a este correo.</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-200">Nombre del destinatario</label>
                      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-zinc-300 opacity-90">
                        <FiUser className="text-base" />
                        <input
                          value={recipientName}
                          readOnly
                          placeholder="Se completará al encontrar el correo"
                          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-200">Mensaje opcional</label>
                      <textarea
                        value={note}
                        onChange={(event) => setNote(event.target.value)}
                        placeholder="Puedes agregar un mensaje corto para acompañar la transferencia."
                        rows={4}
                        className="w-full rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500"
                      />
                    </div>
                  </form>
                </div>
              </section>
            </div>

            <aside className="grid gap-6 xl:sticky xl:top-28">
              <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                <div className="space-y-3">
                  <p className="text-[0.84rem] font-medium tracking-[0.08em] text-zinc-400">Resumen de transferencia</p>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">Confirma a quién se lo estás enviando.</h2>
                  <p className="text-sm leading-relaxed text-zinc-300">Antes de continuar, conviene revisar el boleto elegido, el correo buscado y el nombre encontrado.</p>
                </div>

                <div className="mt-6 grid gap-4">
                  <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-4">
                    <p className="text-sm font-medium text-zinc-400">Boleto</p>
                    <div className="mt-3 flex items-center gap-3 text-white">
                      <FiTag className="text-base" style={{ color: colors.accent }} />
                      <span className="text-sm">{transferContext.ticket.label}</span>
                    </div>
                  </div>

                  <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-4">
                    <p className="text-sm font-medium text-zinc-400">Evento</p>
                    <div className="mt-3 flex items-center gap-3 text-white">
                      <FiMapPin className="text-base" style={{ color: colors.accent }} />
                      <span className="text-sm">{transferContext.venue}</span>
                    </div>
                  </div>

                  <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-4">
                    <p className="text-sm font-medium text-zinc-400">Destinatario</p>
                    <div className="mt-3 flex items-center gap-3 text-white">
                      <FiMail className="text-base" style={{ color: colors.accent }} />
                      <span className="text-sm">{recipientEmail || "Aún sin definir"}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-3 text-white">
                      <FiUser className="text-base" style={{ color: colors.accent }} />
                      <span className="text-sm">{recipientName || "Pendiente de búsqueda"}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={handleContinueTransfer}
                    disabled={!canContinue}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.86rem] font-semibold tracking-[0.01em] text-white shadow-[0_18px_45px_rgba(130,89,208,0.45)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ background: colors.accent }}
                  >
                    Continuar transferencia
                    <FiSend className="text-sm" />
                  </button>
                  <Link href="/my-tickets/demo" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 px-5 py-3 text-[0.86rem] font-medium tracking-[0.01em] text-zinc-200 transition hover:border-white/30 hover:text-white">
                    Cancelar
                  </Link>
                </div>
              </section>
            </aside>
          </div>
        </section>
      </div>

      <FullscreenLoader
        isOpen={loaderVisible}
        label="Preparando transferencia"
        title="Estamos dejando listo el siguiente paso."
        description="Validando el destinatario y preparando la transferencia del boleto para confirmación."
      />
    </main>
  );
}
