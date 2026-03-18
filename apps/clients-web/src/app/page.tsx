import { Card, HeroPanel, SectionHeader, StatCard, StatusBadge } from "@dcompass/ui";
import { FiArrowUpRight, FiBarChart2, FiClock, FiCompass, FiMapPin, FiUsers } from "react-icons/fi";

const navLinks = [
  { label: "Discovery", href: "#explore" },
  { label: "Eventos", href: "#events" },
  { label: "Inteligencia", href: "#insights" },
  { label: "Backstage", href: "#backend" }
];

const heroStats = [
  {
    label: "Partners activos",
    value: "28",
    helper: "Salones, labels y clubs",
    delta: "+12% MoM",
    tone: "positive" as const,
    icon: <FiUsers />
  },
  {
    label: "Eventos en boarding",
    value: "16",
    helper: "Calendario Q2",
    delta: "+6 reservas",
    tone: "info" as const,
    icon: <FiClock />
  },
  {
    label: "Capacidad verificada",
    value: "4.2K",
    helper: "asientos premium",
    delta: "+18% vs dic",
    tone: "positive" as const,
    icon: <FiMapPin />
  }
];

const valuePillars = [
  {
    title: "Descubrimiento operativo",
    summary: "El home expone qué experiencias están listas y por qué importan.",
    detail: "Cada historia explica qué datos, partners y status respaldan la promesa premium.",
    icon: <FiCompass className="text-xl text-white" />
  },
  {
    title: "Experiencias premium",
    summary: "Los eventos se muestran como momentos curados, no banners genéricos.",
    detail: "Lineups, locaciones y ritmos se combinan para reflejar la pulcritud DCompass.",
    icon: <FiUsers className="text-xl text-white" />
  },
  {
    title: "Conversión guiada",
    summary: "Los CTAs acompañan la narrativa e invitan a la siguiente acción concreta.",
    detail: "Solicitar acceso, revisar el calendario o consultar inteligencia desde el primer scroll.",
    icon: <FiBarChart2 className="text-xl text-white" />
  }
];

const discoveryHighlights = [
  {
    label: "Status operativo",
    description: "Fechas, puertas y avances de ticketing listos para compartir con el equipo."
  },
  {
    label: "Lineups narrativos",
    description: "Artistas y momentos agrupados en frases que transmiten una experiencia real."
  },
  {
    label: "Acciones claras",
    description: "Botones y textos que guían a explorar el calendario o agendar un demo."
  }
];

const discoveryPanels = [
  {
    title: "Curated journeys",
    summary: "Routes that mix dining, art, and after-hours soundscapes for owner guests.",
    tag: "Experiencias",
    fields: ["category", "slug", "curator", "duration", "availability"]
  },
  {
    title: "Client intent",
    summary: "Track intent signals so hosts know when to unlock invites or upgrade access.",
    tag: "Inteligencia",
    fields: ["clientId", "segments", "intentScore", "lastTouch", "notifications"]
  },
  {
    title: "Partner zones",
    summary: "Expose partner-defined campuses, assets, and exclusive rituals in one surface.",
    tag: "Backstage",
    fields: ["partnerId", "venueIds", "story", "status", "images"]
  }
];

const eventPreviews = [
  {
    title: "Nocturne Premiere",
    subtitle: "Immersive dinner · Salon V, CDMX",
    dateLabel: "Mar 28 · 20:00",
    location: "Roma Norte · Mexico City",
    priceRange: "$420 – $850 USD",
    capacity: "120 seats",
    lineup: ["Nina López · Live", "Resonant Choir", "DJ @alto"],
    statusLabel: "Ticketing live",
    statusTone: "positive" as const,
    tags: ["lineup curated", "members only"],
    backendFields: [
      "id",
      "slug",
      "title",
      "heroImage",
      "lineup",
      "priceRange",
      "capacity",
      "status",
      "location",
      "startTime"
    ]
  },
  {
    title: "Campo Norte Residency",
    subtitle: "Alpine lounge · Monterrey",
    dateLabel: "Apr 06 · 18:30",
    location: "Valle de Chipinque",
    priceRange: "$290 – $620 USD",
    capacity: "220 seats",
    lineup: ["Loom Ensemble", "Guitarría Collective"],
    statusLabel: "Invites released",
    statusTone: "info" as const,
    tags: ["wellness", "private"],
    backendFields: [
      "id",
      "slug",
      "title",
      "description",
      "lineup",
      "startTime",
      "doors",
      "priceRange",
      "tags",
      "status"
    ]
  },
  {
    title: "Midnight Observatory",
    subtitle: "Rooftop set · Punta Mita",
    dateLabel: "May 12 · 22:00",
    location: "Punta Mita · Nayarit",
    priceRange: "$520 – $980 USD",
    capacity: "140 seats",
    lineup: ["Orbit Duo", "Aura Strings"],
    statusLabel: "Capacity capped",
    statusTone: "warning" as const,
    tags: ["travel", "members travel"],
    backendFields: [
      "id",
      "slug",
      "title",
      "startTime",
      "venue",
      "priceRange",
      "capacity",
      "status",
      "lineup",
      "tags"
    ]
  }
];

const intelligenceCards = [
  {
    title: "Audience heatmaps",
    summary: "Live segmentation by geography, taste, and spend so hosts can match invitations.",
    detail: "Signals update every 4 hours during prep windows.",
    chips: ["geo spread", "intent score", "repeat demand"]
  },
  {
    title: "Operational readiness",
    summary: "Inventory, staffing, and collection flows are visible before the release is public.",
    detail: "Automated sanity checks track capacity, VIP hospitality, and security approvals.",
    chips: ["hold codes", "floor plans", "capacity sync"]
  }
];

const intelligenceStats = [
  { label: "Decision latency", value: "11 días", helper: "Media desde invitación" },
  { label: "High-intent clients", value: "420", helper: "Alertas premium" },
  { label: "Avg. spend", value: "$612", helper: "Venta directa" }
];

const dataSignals = [
  {
    name: "Eventos",
    description: "Base para hero, preview y compact cards.",
    include: [
      "id",
      "slug",
      "title",
      "description",
      "startTime",
      "endTime",
      "lineup",
      "priceRange",
      "status",
      "venue",
      "capacity"
    ],
    touchpoints: "hero / eventos"
  },
  {
    name: "Clientes",
    description: "Permite personalizar invitaciones y estados.",
    include: [
      "clientId",
      "tier",
      "preferences",
      "intentScore",
      "lastInteraction",
      "invites"
    ],
    touchpoints: "discovery"
  },
  {
    name: "Partners",
    description: "Define zonas de experiencia y activos compartidos.",
    include: ["partnerId", "venueIds", "assets", "status", "story", "contacts"],
    touchpoints: "backstage"
  }
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020308] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_45%)] blur-3xl" />
        <div className="absolute top-16 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(130,89,208,0.35),_transparent_60%)]" />
        <div className="absolute bottom-0 right-0 h-60 w-60 translate-x-1/3 translate-y-1/3 rounded-full bg-[radial-gradient(circle,_rgba(45,214,168,0.2),_transparent_70%)]" />
      </div>
      <div className="relative">
        <header className="sticky top-0 z-30 mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 backdrop-blur-xl border-b border-white/10 bg-[#020308]/80 shadow-[0_20px_45px_rgba(0,0,0,0.65)] transition duration-200 md:gap-6">
          <div className="space-y-1">
            <p className="text-[0.65rem] uppercase tracking-[0.6em] text-zinc-500">DCompass</p>
            <p className="text-2xl font-semibold uppercase tracking-tight text-white">Clients Web</p>
          </div>
          <nav className="hidden items-center gap-5 text-[0.65rem] uppercase tracking-[0.32em] text-zinc-400 md:flex">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="transition hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 md:gap-3">
            <a
              href="#explore"
              className="hidden rounded-full border border-white/30 px-3 py-2 text-[0.65rem] uppercase tracking-[0.3em] text-white transition hover:border-white/70 md:inline-flex"
            >
              Explorar
            </a>
            <a
              href="mailto:contact@dcompass.dev"
              className="rounded-full bg-white/90 px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#020308] shadow-[0_18px_45px_rgba(2,8,16,0.6)] ring-1 ring-white/60 transition duration-200 hover:bg-white"
            >
              Solicitar acceso
            </a>
          </div>
        </header>
        <main className="mx-auto max-w-6xl space-y-12 px-6 pb-16 pt-6 md:space-y-14">
          <HeroPanel
            highlight="Clients Hub"
            title="Un centro premium para descubrir, invitar y vivir DCompass"
            summary="El home no es una vitrina: es el punto de inicio donde discovery, inteligencia y operaciones ya se sienten como producto real."
            actions={[
              { label: "Explorar experiencias", description: "Calendario privado y descubrimiento guiado", href: "#events", accent: "primary" },
              { label: "Solicitar acceso", description: "Agendar una llamada con el equipo", href: "mailto:contact@dcompass.dev", accent: "secondary" }
            ]}
          >
            <div className="grid gap-4 md:grid-cols-3">
              {heroStats.map((stat) => (
                <StatCard
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  helper={stat.helper}
                  delta={stat.delta}
                  tone={stat.tone}
                  icon={stat.icon}
                />
              ))}
            </div>
          </HeroPanel>

          <section className="space-y-6">
            <div className="flex flex-col gap-1.5">
              <SectionHeader
                eyebrow="Propuesta"
                title="Un home que ya parece un producto real"
                description="El primer scroll funciona como un pitch claro: discovery, eventos, confianza y acciones en un solo flujo."
              />
              <p className="max-w-3xl text-sm text-zinc-300">
                Aquí no se vende humo. Cada bloque comparte qué datos necesita el backend, qué activos deben mantenerse frescos y por qué el usuario debe avanzar. Es un home con ritmo, pero con intención.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {valuePillars.map((pillar) => (
                <Card key={pillar.title} variant="glass" className="space-y-4 p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-white/10 p-2">{pillar.icon}</div>
                      <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">{pillar.title}</p>
                    </div>
                    <StatusBadge label="Live mock" tone="info" />
                  </div>
                  <p className="text-lg font-semibold text-white">{pillar.summary}</p>
                  <p className="text-sm text-zinc-300 leading-relaxed">{pillar.detail}</p>
                </Card>
              ))}
            </div>
          </section>

          <section id="explore" className="space-y-5 scroll-mt-28 md:scroll-mt-36">
            <div className="flex flex-col gap-1.5">
              <SectionHeader
                eyebrow="Discovery"
                title="Explora la experiencia digna de DCompass"
                description="Paneles que mezclan historia, backstage y datos para que cada equipo entienda qué entregar y qué medir desde el primer momento."
              />
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-zinc-400">
                Cada bloque informa qué debe entregar el backend: categorías, segmentos y activos.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {discoveryPanels.map((panel) => (
                <Card key={panel.title} variant="glass" className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">{panel.tag}</p>
                    <StatusBadge label="Live mock" tone="info" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{panel.title}</h3>
                    <p className="text-sm text-zinc-300">{panel.summary}</p>
                  </div>
                  <div className="space-y-1 text-[0.7rem] uppercase tracking-[0.28em] text-zinc-400">
                    {panel.fields.map((field) => (
                      <p key={field}>{field}</p>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section id="events" className="space-y-5 scroll-mt-28 md:scroll-mt-36">
            <div className="flex flex-col gap-1.5">
              <SectionHeader
                eyebrow="Experiencias"
                title="Eventos destacados en camino"
                description="Tarjetas con fecha, locación, lineups y rango de precios para mostrar qué datos pedir al backend sin abrir todavía el catálogo completo."
                meta={<StatusBadge label="Sprint 00005" tone="info" />}
              />
              <div className="flex flex-wrap gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-zinc-400">
                <span className="flex items-center gap-1 text-white">
                  <FiArrowUpRight className="text-xs" /> Insights en vivo
                </span>
                <span>Rolling release</span>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <Card variant="glass" className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Descubrimiento guiado</p>
                    <h3 className="text-3xl font-semibold text-white">El home ya presenta eventos con contexto</h3>
                  </div>
                  <StatusBadge label="Live mock" tone="positive" />
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Este bloque resalta cómo un evento premium se comunica desde la portada: qué ocurre, quién lo protagoniza y por qué debe interesar. Los datos de backend se presentan junto con la narrativa para que el discovery sea tangible.
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {discoveryHighlights.map((highlight) => (
                    <div key={highlight.label} className="rounded-2xl border border-white/10 bg-[#01030f]/70 p-3">
                      <p className="text-[0.65rem] uppercase tracking-[0.3em] text-zinc-400">{highlight.label}</p>
                      <p className="text-sm text-zinc-200 leading-relaxed">{highlight.description}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-zinc-300">
                  <a href="#events" className="font-semibold text-white">
                    Explorar calendario
                  </a>
                  <span className="flex items-center gap-1 rounded-full border border-white/20 px-3 py-1">
                    Insights · Story
                  </span>
                </div>
              </Card>
              <div className="space-y-4">
                {eventPreviews.map((event) => (
                  <Card key={event.title} variant="glass" className="space-y-4 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">{event.subtitle}</p>
                        <h3 className="text-2xl font-semibold text-white">{event.title}</h3>
                      </div>
                      <StatusBadge label={event.statusLabel} tone={event.statusTone} />
                    </div>
                    <div className="space-y-1 text-sm text-zinc-300 leading-relaxed">
                      <p className="flex items-center gap-2">
                        <FiClock className="text-base" /> {event.dateLabel}
                      </p>
                      <p className="flex items-center gap-2">
                        <FiMapPin className="text-base" /> {event.location}
                      </p>
                      <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Price range</p>
                      <p className="text-lg font-semibold text-white">{event.priceRange}</p>
                    </div>
                    <div className="space-y-1 text-sm text-zinc-300 leading-relaxed">
                      <p className="text-[0.65rem] uppercase tracking-[0.25em] text-zinc-400">Lineup</p>
                      <ul className="space-y-1">
                        {event.lineup.map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-white/70" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[0.6rem] uppercase tracking-[0.25em] text-zinc-400">
                      <span>{event.capacity}</span>
                      {event.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/10 px-3 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-1 rounded-2xl bg-white/5 p-3 text-[0.7rem] uppercase tracking-[0.25em] text-zinc-300">
                      <p>Backend fields</p>
                      <div className="flex flex-wrap gap-2">
                        {event.backendFields.map((field) => (
                          <span key={field} className="rounded-full border border-white/10 px-2 py-1">
                            {field}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.3em] text-zinc-400">
                      <span>Discovery ready</span>
                      <a className="font-semibold text-white" href="mailto:contact@dcompass.dev">
                        Solicitar acceso
                      </a>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section id="insights" className="space-y-5 scroll-mt-28 md:scroll-mt-36">
            <div className="flex flex-col gap-1.5">
              <SectionHeader
                eyebrow="Inteligencia"
                title="Operaciones, demanda y señales de invitados"
                description="La inteligencia no es un extra: es la base que da confianza a los equipos, y aquí se ve con claridad."
              />
              <p className="text-sm text-zinc-400">
                Los datos estructurados muestran por qué DCompass es premium: liderazgo, control y anticipación.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {intelligenceStats.map((stat) => (
                <StatCard key={stat.label} label={stat.label} value={stat.value} helper={stat.helper} tone="neutral" />
              ))}
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {intelligenceCards.map((card) => (
                <Card key={card.title} variant="glass" className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                    <FiBarChart2 className="text-lg text-zinc-300" />
                  </div>
                  <p className="text-sm text-zinc-300">{card.summary}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">{card.detail}</p>
                  <div className="flex flex-wrap gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-zinc-300">
                    {card.chips.map((chip) => (
                      <span key={chip} className="rounded-full border border-white/10 px-3 py-1">
                        {chip}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section id="backend" className="space-y-5 scroll-mt-28 md:scroll-mt-36">
            <SectionHeader
              eyebrow="Backstage"
              title="Señales de datos que el backend debe entregar"
              description="Estos mocks dejan claro qué entidades y campos necesitaremos cuando avancemos a auth y datos reales, sin romper el home actual."
            />
            <div className="grid gap-5 md:grid-cols-3">
              {dataSignals.map((signal) => (
                <Card key={signal.name} variant="glass" className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">{signal.name}</h3>
                    <FiCompass className="text-sm text-zinc-400" />
                  </div>
                  <p className="text-sm text-zinc-300">{signal.description}</p>
                  <p className="text-[0.6rem] uppercase tracking-[0.28em] text-zinc-500">Campos clave</p>
                  <div className="flex flex-wrap gap-2 text-[0.65rem] text-zinc-200">
                    {signal.include.map((field) => (
                      <span key={field} className="rounded-full bg-white/5 px-3 py-1 text-[0.65rem]">
                        {field}
                      </span>
                    ))}
                  </div>
                  <div className="text-[0.65rem] uppercase tracking-[0.3em] text-zinc-400">Touchpoints: {signal.touchpoints}</div>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-5 rounded-3xl border border-white/10 bg-white/5 px-6 py-10 text-center text-white">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Próximo paso</p>
            <h3 className="text-3xl font-semibold">Convierte este home en la puerta premium de DCompass</h3>
            <p className="text-sm text-zinc-300">
              El descubrimiento y la conversión no son dos etapas distintas: están enlazadas en la experiencia que acabamos de construir. Mantén el ritmo y lleva las acciones a esa siguiente llamada o demo.
            </p>
            <div className="flex flex-col gap-3 pt-3 text-[0.65rem] uppercase tracking-[0.3em] text-zinc-300 sm:flex-row sm:justify-center">
              <a
                href="#events"
                className="rounded-full border border-white/30 px-5 py-2 font-semibold text-white transition hover:bg-white/10"
              >
                Ver el calendario
              </a>
              <a
                href="mailto:contact@dcompass.dev"
                className="rounded-full bg-[#e7f2ff]/90 px-5 py-2 font-semibold uppercase tracking-[0.3em] text-[#020308] transition hover:bg-[#ffffff]"
              >
                Solicitar acceso
              </a>
            </div>
          </section>
        </main>
        <footer className="border-t border-white/10 bg-[#03050a]/70">
          <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-10 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-zinc-500">DCompass</p>
              <p className="text-lg font-semibold text-white">Clients Web</p>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-4 text-[0.65rem] uppercase tracking-[0.32em] text-zinc-400">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="transition hover:text-white">
                  {link.label}
                </a>
              ))}
            </div>
            <p className="text-[0.65rem] uppercase tracking-[0.32em] text-zinc-500">
              contact@dcompass.dev · Estatus premium
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
