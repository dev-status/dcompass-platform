"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { brandAssets, colors, FullscreenLoader } from "@dcompass/ui";
import { FiArrowRight, FiClock, FiMail, FiUser, FiX } from "react-icons/fi";
import { buildTicketBundle } from "@/data/ticketBundle";

const simulatedRecipient = {
  name: "Sofía Martínez",
  email: "sofia@correo.com",
};

export default function TransferPendingPage({ params }: { params: { ticketId: string } }) {
  const router = useRouter();
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);

  const ticketBundle = useMemo(() => buildTicketBundle(params.ticketId), [params.ticketId]);
  const ticket = ticketBundle.tickets[0];

  const pendingTransfer = {
    ticketId: ticketBundle.orderId,
    event: ticketBundle.event,
    date: `${ticketBundle.date} · ${ticketBundle.time}`,
    venue: ticketBundle.venue,
    ticketLabel: ticket.label,
    accessLabel: ticket.accessLabel,
    recipientName: simulatedRecipient.name,
    recipientEmail: simulatedRecipient.email,
    expiresIn: "15 minutos",
    image: ticketBundle.image,
  };

  useEffect(() => {
    if (!cancelModalOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [cancelModalOpen]);

  const handleConfirmCancel = () => {
    setCancelModalOpen(false);
    setLoaderVisible(true);

    window.setTimeout(() => {
      router.push(`/mis-boletos/${params.ticketId}`);
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
            <Link href={`/mis-boletos/${params.ticketId}`} className="inline-flex w-fit items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-white">
              <FiArrowRight className="rotate-180 text-sm" />
              Volver
            </Link>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Transferencia pendiente</h1>
              <p className="max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">Ya transferiste el boleto. Ahora falta que Sofía Martínez lo acepte.</p>
            </div>
          </div>

          <div className="grid gap-8 xl:grid-cols-[1.02fr_0.98fr] xl:items-start">
            <div className="space-y-6">
              <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
                <div className="relative aspect-[16/8] w-full border-b border-white/10 bg-[#070914]">
                  <Image src={pendingTransfer.image} alt={pendingTransfer.event} fill priority className="object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,3,8,0.08),rgba(2,3,8,0.76))]" />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <h2 className="text-3xl font-semibold text-white sm:text-4xl">{pendingTransfer.event}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-300">{pendingTransfer.ticketLabel} · {pendingTransfer.accessLabel}</p>
                  </div>
                </div>

                <div className="space-y-6 p-6 sm:p-8">
                  <div className="rounded-[1.6rem] border border-amber-400/20 bg-amber-400/10 p-5">
                    <div className="flex items-start gap-4">
                      <div className="inline-flex rounded-2xl border border-amber-300/20 bg-white/[0.08] p-3 text-amber-200">
                        <FiClock className="text-base" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">Esperando aceptación</h3>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-200">El boleto quedará pendiente hasta que <span className="font-medium text-white">{pendingTransfer.recipientName}</span> acepte la transferencia.</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-sm font-medium text-zinc-400">Destinatario</p>
                      <div className="mt-3 flex items-center gap-3 text-white">
                        <FiUser className="text-base" style={{ color: colors.accent }} />
                        <span className="text-sm">{pendingTransfer.recipientName}</span>
                      </div>
                      <div className="mt-3 flex items-center gap-3 text-white">
                        <FiMail className="text-base" style={{ color: colors.accent }} />
                        <span className="text-sm">{pendingTransfer.recipientEmail}</span>
                      </div>
                    </div>

                    <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-sm font-medium text-zinc-400">Vigencia de la solicitud</p>
                      <p className="mt-2 text-2xl font-semibold text-white">{pendingTransfer.expiresIn}</p>
                      <p className="mt-2 text-sm text-zinc-300">Si no la acepta a tiempo, el boleto vuelve al titular original.</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <aside className="grid gap-6 xl:sticky xl:top-28">
              <button
                onClick={() => setCancelModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 px-5 py-3 text-[0.86rem] font-medium tracking-[0.01em] text-zinc-200 transition hover:border-white/30 hover:text-white"
              >
                Cancelar transferencia
              </button>
            </aside>
          </div>
        </section>
      </div>

      {cancelModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto px-5 pt-[10vh] pb-6 sm:pt-[12vh]">
          <button className="absolute inset-0 bg-black/75 backdrop-blur-sm" aria-label="Cerrar confirmación" onClick={() => setCancelModalOpen(false)} />

          <div className="relative z-[71] w-full max-w-md rounded-[2rem] border border-white/10 bg-[#070914] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.5)] sm:p-7">
            <button
              onClick={() => setCancelModalOpen(false)}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:text-white"
              aria-label="Cerrar modal"
            >
              <FiX className="text-base" />
            </button>

            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight text-white">¿Cancelar transferencia?</h2>
              <p className="text-sm leading-relaxed text-zinc-300">Si la cancelas, {pendingTransfer.recipientName} dejará de ver esta solicitud y el boleto volverá a quedar disponible en tu cuenta.</p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setCancelModalOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 px-5 py-3 text-[0.86rem] font-medium tracking-[0.01em] text-zinc-200 transition hover:border-white/30 hover:text-white"
              >
                Seguir con transferencia
              </button>
              <button
                onClick={handleConfirmCancel}
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.86rem] font-semibold tracking-[0.01em] text-white shadow-[0_18px_45px_rgba(130,89,208,0.45)] transition hover:brightness-110"
                style={{ background: colors.accent }}
              >
                Sí, cancelar transferencia
              </button>
            </div>
          </div>
        </div>
      )}

      <FullscreenLoader
        isOpen={loaderVisible}
        label="Cancelando transferencia"
        title="Estamos devolviendo el boleto a tu cuenta."
        description="Cerrando la solicitud pendiente y dejando nuevamente disponible este acceso para ti."
      />
    </main>
  );
}
