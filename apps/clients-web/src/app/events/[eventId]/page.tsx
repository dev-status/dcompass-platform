import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, SectionHeader, StatusBadge } from "@dcompass/ui";
import { FiArrowLeft, FiClock, FiCompass, FiMapPin } from "react-icons/fi";
import { eventShowcase } from "../../../data/events";

const actionBase =
  "inline-flex items-center justify-center rounded-full px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] transition";

export default function EventDetailPage({ params }: { params: { eventId: string } }) {
  const event = eventShowcase.find((item) => item.id === params.eventId);

  if (!event) {
    notFound();
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#01030b] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_40%)] blur-3xl" />
      </div>

      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(2,3,8,.1), rgba(2,3,8,.95)), url(${event?.cover})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 sm:py-12 lg:px-10 lg:py-16">
          <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.35em] text-zinc-300">
            <Link href="/" className="flex items-center gap-2 text-zinc-400 transition hover:text-white">
              <FiArrowLeft className="text-base" />
              Home premium
            </Link>
            <span className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.35em]">
              <FiCompass className="text-sm" />
              Catálogo · detalle público
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-zinc-200">
              <StatusBadge label={event?.status.label ?? "Detalle"} tone={event?.status.tone ?? "info"} />
              <span>{event?.category}</span>
              {event?.availabilityDetail && <span className="text-white/70">{event.availabilityDetail}</span>}
            </div>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              {event?.title}
            </h1>
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-400">{event?.subtitle}</p>
            <p className="max-w-3xl text-sm text-zinc-100">{event?.heroStatement}</p>
            <div className="flex flex-wrap items-center gap-5 text-[0.75rem] uppercase tracking-[0.28em] text-zinc-200">
              <span className="flex items-center gap-2">
                <FiClock className="text-base" />
                {event?.dateLabel}
              </span>
              <span className="flex items-center gap-2">
                <FiMapPin className="text-base" />
                {event?.location}
              </span>
            </div>
          </div>

          <p className="max-w-4xl text-sm text-zinc-200">{event?.heroNarrative}</p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={event?.ctaHref ?? "mailto:contact@dcompass.dev"}
              className={`${actionBase} border border-white/30 bg-white/90 text-[#020308] shadow-[0_16px_30px_rgba(2,8,16,0.65)] hover:bg-white`}
            >
              {event?.ctaLabel ?? "Solicitar acceso"}
            </a>
            <Link
              href="/#events"
              className={`${actionBase} border border-white/30 text-white/80 hover:text-white`}
            >
              Volver al calendario
            </Link>
            {event?.ctaSubLabel && <span className="text-[0.65rem] uppercase tracking-[0.3em] text-zinc-300">{event.ctaSubLabel}</span>}
          </div>
        </div>
      </section>

      <main className="relative mx-auto max-w-6xl space-y-10 px-6 pb-16 pt-16 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-zinc-400">Narrativa</p>
              <p className="text-lg leading-relaxed text-zinc-200">{event?.description}</p>
              <div className="space-y-3">
                <p className="text-[0.65rem] uppercase tracking-[0.35em] text-zinc-400">Lineup destacado</p>
                <ul className="space-y-2 text-sm text-zinc-100">
                  {event?.lineup.map((entry) => (
                    <li key={entry} className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-white/70" />
                      {entry}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {event?.highlights?.map((highlight) => (
                  <div key={highlight.title} className="rounded-2xl border border-white/10 bg-[#01030f]/70 p-3">
                    <p className="text-[0.55rem] uppercase tracking-[0.35em] text-zinc-500">{highlight.title}</p>
                    <p className="text-sm text-zinc-200">{highlight.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <SectionHeader
                eyebrow="Propósito"
                title="Experiencia completa"
                description="El detail comunica hero, lineup, logística y datos clave para que el backend y el equipo comercial tengan claridad."
              />
              <p className="text-sm text-zinc-300">{event?.heroNarrative}</p>
            </div>
          </div>

          <div className="space-y-5">
            <Card variant="glass" className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="space-y-2">
                <p className="text-[0.65rem] uppercase tracking-[0.4em] text-zinc-400">Locación</p>
                <p className="text-2xl font-semibold text-white">{event?.venueInfo?.name}</p>
                <p className="text-sm text-zinc-300">
                  {event?.venueInfo?.address} · {event?.venueInfo?.neighborhood}
                </p>
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{event?.venueInfo?.city}</p>
                {event?.venueInfo?.note && <p className="text-sm text-zinc-300">{event.venueInfo.note}</p>}
              </div>
              <div className="space-y-3">
                {event?.logistics?.map((item) => (
                  <div key={item.label} className="flex flex-col gap-1">
                    <p className="text-[0.65rem] uppercase tracking-[0.35em] text-zinc-400">{item.label}</p>
                    <p className="text-sm text-white">{item.detail}</p>
                    {item.helper && <p className="text-xs text-zinc-400">{item.helper}</p>}
                  </div>
                ))}
              </div>
            </Card>
            <Card variant="glass" className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.35em] text-zinc-400">Data contract</p>
                  <p className="text-lg font-semibold text-white">Campos públicos</p>
                </div>
                <StatusBadge label="Sprint 00009" tone="info" />
              </div>
              <div className="space-y-3">
                {event?.dataPoints?.map((point) => (
                  <div key={point.label} className="rounded-2xl border border-white/10 bg-[#01030f]/80 p-3">
                    <p className="text-[0.65rem] uppercase tracking-[0.35em] text-zinc-400">{point.label}</p>
                    <p className="text-sm font-semibold text-white">{point.value}</p>
                    {point.helper && <p className="text-xs text-zinc-400">{point.helper}</p>}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SectionHeader
              eyebrow="Tickets"
              title="Tipos de acceso y precios"
              description="Mockups para descubrir cómo el pricing y la disponibilidad se comunican desde el detalle."
            />
            <StatusBadge label="Mock pricing" tone="positive" />
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {event?.ticketTiers?.map((ticket) => (
              <div key={ticket.tier} className="space-y-2 rounded-2xl border border-white/10 bg-[#020308]/70 p-5">
                <p className="text-[0.65rem] uppercase tracking-[0.35em] text-zinc-400">{ticket.tier}</p>
                <p className="text-2xl font-semibold text-white">{ticket.price}</p>
                <p className="text-sm text-zinc-300">{ticket.description}</p>
                <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-zinc-400">
                  <span>{ticket.availability}</span>
                  <span className="text-emerald-300">{ticket.status}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-zinc-400">
            <span className="font-semibold text-white">Disponibilidad real</span>
            <span>{event?.availability}</span>
            <span>{event?.priceLabel}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={event?.ctaHref ?? "mailto:contact@dcompass.dev"}
              className={`${actionBase} border border-white/30 bg-white/90 text-[#020308] hover:bg-white`}
            >
              {event?.ctaLabel ?? "Solicitar acceso"}
            </a>
            <Link
              href="/#events"
              className={`${actionBase} border border-white/30 text-white/80 hover:text-white`}
            >
              Ver otras experiencias
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
