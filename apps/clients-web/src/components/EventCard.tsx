import Link from "next/link";
import { Card, StatusBadge } from "@dcompass/ui";
import { FiArrowRight, FiClock, FiMapPin } from "react-icons/fi";

export type EventStatusTone = "positive" | "warning" | "info" | "danger";

export type TicketTier = {
  tier: string;
  price: string;
  description: string;
  availability: string;
  status: string;
};

export type LogisticItem = {
  label: string;
  detail: string;
  helper?: string;
};

export type VenueInfo = {
  name: string;
  address: string;
  city: string;
  neighborhood?: string;
  note?: string;
};

export type EventHighlight = {
  title: string;
  detail: string;
};

export type DataPoint = {
  label: string;
  value: string;
  helper?: string;
};

export type EventCardData = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  cover: string;
  dateLabel: string;
  location: string;
  priceLabel: string;
  status: {
    label: string;
    tone: EventStatusTone;
  };
  availability: string;
  tags: string[];
  badges: string[];
  description: string;
  lineup: string[];
  backendFields: string[];
  heroStatement?: string;
  heroNarrative?: string;
  availabilityDetail?: string;
  venueInfo?: VenueInfo;
  logistics?: LogisticItem[];
  ticketTiers?: TicketTier[];
  highlights?: EventHighlight[];
  dataPoints?: DataPoint[];
  ctaLabel?: string;
  ctaSubLabel?: string;
  ctaHref?: string;
};

type EventCardProps = {
  event: EventCardData;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link
      href={`/events/${event.id}`}
      className="group block"
      aria-label={`Ver detalle del evento ${event.title}`}
    >
      <Card
        variant="glass"
        className="group overflow-hidden rounded-[1.8rem] border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-0 shadow-[0_18px_45px_rgba(0,0,0,0.5)] transition duration-200 hover:-translate-y-1"
      >
        <div
          className="relative h-52 overflow-hidden rounded-t-[1.8rem] bg-zinc-900"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(2, 3, 8, 0.1), rgba(2, 3, 8, 0.95)), url(${event.cover})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="relative z-10 flex h-full flex-col justify-between p-4">
            <div className="flex items-center justify-between gap-2">
              <StatusBadge label={event.status.label} tone={event.status.tone} />
              <div className="flex items-center gap-2 text-[0.55rem] uppercase tracking-[0.3em] text-white">
                {event.badges.map((badge) => (
                  <span key={badge} className="rounded-full border border-white/40 bg-black/50 px-3 py-1 text-[0.6rem] font-semibold">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[0.55rem] uppercase tracking-[0.3em] text-white/70">{event.category}</p>
              <h3 className="text-2xl font-semibold leading-tight text-white">{event.title}</h3>
              <p className="text-sm text-white/70">{event.subtitle}</p>
            </div>
          </div>
        </div>
        <div className="space-y-3 p-5">
          <div className="space-y-1 text-sm text-zinc-300">
            <p className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.4em] text-zinc-400">
              <FiClock className="text-base" />
              {event.dateLabel}
            </p>
            <p className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.4em] text-zinc-400">
              <FiMapPin className="text-base" />
              {event.location}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white">{event.priceLabel}</p>
            <span className="text-[0.65rem] uppercase tracking-[0.35em] text-emerald-300">{event.availability}</span>
          </div>
          <p className="text-sm leading-relaxed text-zinc-300">{event.description}</p>
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.35em] text-zinc-500">Lineup</p>
            <ul className="mt-2 space-y-1 text-sm text-zinc-200">
              {event.lineup.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-zinc-400">
            {event.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-[0.65rem]">
                {tag}
              </span>
            ))}
          </div>
          <div className="grid gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-zinc-400 sm:grid-cols-2">
            {event.backendFields.map((field) => (
              <span key={field} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-[0.65rem]">
                {field}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4 pt-2 text-[0.65rem] uppercase tracking-[0.3em] text-zinc-400">
            <span className="font-semibold text-white">Ver detalle</span>
            <FiArrowRight className="text-lg text-white/60 transition group-hover:text-white" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
