"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { brandAssets, colors } from "@dcompass/ui";
import { FiArrowRight, FiCalendar, FiClock, FiDownload, FiMapPin, FiTag, FiUser, FiX } from "react-icons/fi";

const ticketBundleTemplate = {
  orderId: "DCP-2048",
  event: "Noches en Supra Roma",
  category: "DJ Set · Roma Norte",
  date: "Viernes 22 de marzo",
  time: "10:00 PM",
  venue: "Supra Roma · CDMX",
  image: "/hero/hero-v2.png",
  status: "Accesos listos",
  ticketType: "General",
  holder: "Jesús Romero",
  purchaseSummary: "2 boletos en una sola compra",
  accessCode: "DCP-SUPRA-2048",
  tickets: [
    {
      id: "BOL-001",
      label: "Boleto 1 de 2",
      qrValue: "QX-2048-01",
      accessLabel: "Acceso general",
      owner: "Jesús Romero",
    },
    {
      id: "BOL-002",
      label: "Boleto 2 de 2",
      qrValue: "QX-2048-02",
      accessLabel: "Acceso general",
      owner: "Jesús Romero",
    },
  ],
};

function formatRemaining(seconds: number) {
  const safe = Math.max(0, seconds);
  const minutes = Math.floor(safe / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(safe % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${secs}`;
}

export default function TicketDetailPage({ params }: { params: { ticketId: string } }) {
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [remainingSeconds] = useState(47);

  const ticketBundle = useMemo(
    () => ({ ...ticketBundleTemplate, orderId: params.ticketId }),
    [params.ticketId]
  );

  const { tickets } = ticketBundle;

  const activeTicket = useMemo(
    () => tickets.find((ticket) => ticket.id === activeTicketId) ?? null,
    [activeTicketId, tickets]
  );

  useEffect(() => {
    if (!activeTicket) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeTicket]);

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
              <Image
                src={brandAssets.mainLogo}
                alt="DCompass símbolo principal"
                width={54}
                height={54}
                priority
                className="h-10 w-10 rounded-xl object-contain sm:h-11 sm:w-11"
              />
              <Image src={brandAssets.lettersLogo} alt="DCOMPASS" width={190} height={40} priority className="h-5 w-auto sm:h-6" />
            </Link>
          </div>
        </header>

        <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-5 py-8 sm:px-6 lg:px-10 lg:py-10">
          <div className="space-y-3">
            <Link href="/mis-boletos" className="inline-flex w-fit items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-white">
              <FiArrowRight className="rotate-180 text-sm" />
              Volver
            </Link>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Ver boleto</h1>
              <p className="max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                Consulta los boletos de esta compra y abre el QR que necesites cuando llegue el momento de entrar.
              </p>
            </div>
          </div>

          <div className="grid gap-8 xl:grid-cols-[1.02fr_0.98fr] xl:items-start">
            <div className="space-y-6">
              <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
                <div className="relative aspect-[16/8] w-full border-b border-white/10 bg-[#070914]">
                  <Image src={ticketBundle.image} alt={ticketBundle.event} fill priority className="object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,3,8,0.08),rgba(2,3,8,0.76))]" />
                  <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[0.74rem] font-medium tracking-[0.01em] text-zinc-100 backdrop-blur-sm">
                    {ticketBundle.status}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="text-[0.74rem] tracking-[0.01em] text-zinc-300">{ticketBundle.category}</p>
                    <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">{ticketBundle.event}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-300">{ticketBundle.purchaseSummary}</p>
                  </div>
                </div>

                <div className="space-y-6 p-6 sm:p-8">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
                      <FiCalendar className="mt-0.5 text-base" style={{ color: colors.accent }} />
                      <div>
                        <p className="text-sm font-medium text-zinc-400">Fecha</p>
                        <p className="mt-1 text-sm text-white">{ticketBundle.date}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
                      <FiClock className="mt-0.5 text-base" style={{ color: colors.accent }} />
                      <div>
                        <p className="text-sm font-medium text-zinc-400">Hora</p>
                        <p className="mt-1 text-sm text-white">{ticketBundle.time}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
                      <FiMapPin className="mt-0.5 text-base" style={{ color: colors.accent }} />
                      <div>
                        <p className="text-sm font-medium text-zinc-400">Venue</p>
                        <p className="mt-1 text-sm text-white">{ticketBundle.venue}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
                      <FiTag className="mt-0.5 text-base" style={{ color: colors.accent }} />
                      <div>
                        <p className="text-sm font-medium text-zinc-400">Tipo de acceso</p>
                        <p className="mt-1 text-sm text-white">{ticketBundle.ticketType}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {tickets.map((ticket) => (
                      <article key={ticket.id} className="rounded-[1.7rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium text-zinc-400">{ticket.label}</p>
                              <h3 className="mt-2 text-2xl font-semibold text-white">{ticket.accessLabel}</h3>
                            </div>

                            <div className="flex flex-wrap gap-3 text-sm text-zinc-300">
                              <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1">Titular: {ticket.owner}</span>
                              <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1">Orden {ticketBundle.orderId}</span>
                            </div>
                          </div>

                          <div className="flex w-full max-w-[18rem] flex-col gap-3 text-center sm:flex-row sm:justify-end">
                            <button
                              onClick={() => setActiveTicketId(ticket.id)}
                              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.86rem] font-semibold tracking-[0.01em] text-white shadow-[0_18px_45px_rgba(130,89,208,0.45)] transition hover:brightness-110"
                              style={{ background: colors.accent }}
                            >
                              Ver QR
                              <FiArrowRight className="text-sm" />
                            </button>
                            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 px-5 py-3 text-[0.86rem] font-medium tracking-[0.01em] text-zinc-200 transition hover:border-white/30 hover:text-white">
                              Transferir
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            <aside className="grid gap-6 xl:sticky xl:top-28">
              <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                <div className="space-y-3">
                  <p className="text-[0.84rem] font-medium tracking-[0.08em] text-zinc-400">Resumen de acceso</p>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">Todo lo esencial, en un solo lugar.</h2>
                  <p className="text-sm leading-relaxed text-zinc-300">Revisa rápidamente la información del evento, la compra y los accesos incluidos en esta orden.</p>
                </div>

                <div className="mt-6 grid gap-4">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4">
                    <p className="text-sm font-medium text-zinc-400">Titular</p>
                    <div className="mt-3 flex items-center gap-3 text-white">
                      <FiUser className="text-base" style={{ color: colors.accent }} />
                      <span className="text-sm">{ticketBundle.holder}</span>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4">
                    <p className="text-sm font-medium text-zinc-400">Código de compra</p>
                    <p className="mt-3 text-base font-semibold text-white">{ticketBundle.accessCode}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <button className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.86rem] font-semibold tracking-[0.01em] text-white shadow-[0_18px_45px_rgba(130,89,208,0.45)] transition hover:brightness-110" style={{ background: colors.accent }}>
                    Descargar comprobante
                    <FiDownload className="text-sm" />
                  </button>
                  <Link href="/mis-boletos" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 px-5 py-3 text-[0.86rem] font-medium tracking-[0.01em] text-zinc-200 transition hover:border-white/30 hover:text-white">
                    Volver a Mis boletos
                  </Link>
                </div>
              </section>
            </aside>
          </div>
        </section>
      </div>

      {activeTicket && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto px-5 pt-[9vh] pb-6 sm:pt-[11vh]">
          <button className="absolute inset-0 bg-black/75 backdrop-blur-sm" aria-label="Cerrar QR" onClick={() => setActiveTicketId(null)} />

          <div className="relative z-[71] w-full max-w-md rounded-[2rem] border border-white/10 bg-[#070914] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.5)] sm:p-7">
            <button
              onClick={() => setActiveTicketId(null)}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:text-white"
              aria-label="Cerrar modal"
            >
              <FiX className="text-base" />
            </button>

            <div className="space-y-3">
              <p className="text-[0.84rem] font-medium tracking-[0.08em] text-zinc-400">{activeTicket.label}</p>
              <h2 className="text-3xl font-semibold tracking-tight text-white">Código listo para acceso.</h2>
              <p className="text-sm leading-relaxed text-zinc-300">Este QR estará activo solo por unos segundos antes de renovarse.</p>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white p-4 text-black shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
              <div className="mx-auto grid max-w-[14rem] grid-cols-10 gap-1">
                {Array.from({ length: 100 }).map((_, index) => (
                  <span
                    key={index}
                    className="aspect-square rounded-[2px]"
                    style={{ backgroundColor: (index * 7 + Math.floor(index / 10)) % 5 < 2 ? "#000000" : "#ffffff" }}
                  />
                ))}
              </div>
              <p className="mt-5 text-center text-[0.72rem] font-medium tracking-[0.18em] text-zinc-500">{activeTicket.qrValue}</p>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-4">
                <p className="text-sm font-medium text-zinc-400">Vigencia restante</p>
                <p className="mt-2 text-2xl font-semibold text-white">{formatRemaining(remainingSeconds)}</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-4">
                <p className="text-sm font-medium text-zinc-400">Acceso</p>
                <p className="mt-2 text-base font-semibold text-white">{activeTicket.accessLabel}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
