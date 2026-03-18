import type { EventCardData } from "../components/EventCard";

export const eventShowcase: EventCardData[] = [
  {
    id: "nocturne-premiere",
    title: "Nocturne Premiere",
    subtitle: "Immersive dinner · Salon V, CDMX",
    category: "Residencia · Members",
    cover: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    dateLabel: "Mar 28 · 20:00",
    location: "Roma Norte · Ciudad de México",
    priceLabel: "Desde $420 USD",
    status: { label: "Disponibilidad abierta", tone: "positive" },
    availability: "32 asientos",
    tags: ["lineup curado", "members only"],
    badges: ["Residencia", "Nuevo"],
    description:
      "Cena inmersiva con cuerdas acústicas, electrónica suave y ambientación cinematográfica para 120 invitados selectos.",
    lineup: ["Nina López · voz", "Resonant Choir", "DJ @alto"],
    backendFields: ["id", "slug", "heroImage", "lineup", "startTime", "status"],
    heroStatement: "Cena sensorial que mezcla ritmos orgánicos con diseño lumínico.",
    heroNarrative:
      "Los guests son guiados por un setlist curado, estaciones gastronómicas y un ritual de apertura firmado por curadores DCompass.",
    availabilityDetail: "32 asientos premium · Doors 19:00",
    venueInfo: {
      name: "Salón V",
      address: "Tamaulipas 321",
      city: "Ciudad de México",
      neighborhood: "Roma Norte",
      note: "Check-in audiovisual con concierge y welcome cocktail."
    },
    logistics: [
      { label: "Puertas", detail: "19:00", helper: "Concierge & velvet rope" },
      { label: "Show", detail: "20:00 · 80 min", helper: "Dinner · performance · after" },
      { label: "Dress code", detail: "Black tie opcional", helper: "Texturas aurora + glitter" }
    ],
    ticketTiers: [
      {
        tier: "Table Duo",
        price: "$1,200 USD",
        description: "Mesa con servicio dedicado para dos invitados + pairing personalizado.",
        availability: "12 mesas",
        status: "Disponible"
      },
      {
        tier: "Table Social",
        price: "$2,200 USD",
        description: "Mesa para cuatro con acciones VIP y welcome flight.",
        availability: "5 mesas",
        status: "Limitado"
      },
      {
        tier: "Entry Pass",
        price: "$320 USD",
        description: "Seat individual en lounge + ritmos after-hours.",
        availability: "28 boletos",
        status: "Disponible"
      }
    ],
    highlights: [
      { title: "Narrativa sonora", detail: "Se intercalan cuerdas, choir y electronic pulses." },
      { title: "Dinner ritual", detail: "Chef-in-residence diseña un menú en tres actos." },
      { title: "Capacidad", detail: "Sólo 120 invitados para preservar exclusividad." }
    ],
    dataPoints: [
      { label: "Slug", value: "nocturne-premiere", helper: "URL amigable en catálogo" },
      { label: "Status", value: "Disponibilidad abierta", helper: "Home y detail comparten el mismo valor" },
      { label: "Lineup", value: "Nina López · Resonant Choir · DJ @alto" },
      { label: "Venue ID", value: "salon-v", helper: "Contratos y assets asociados" }
    ],
    ctaLabel: "Solicitar acceso",
    ctaSubLabel: "Confirmamos disponibilidad privada en 24h",
    ctaHref: "mailto:contact@dcompass.dev"
  },
  {
    id: "campo-norte-residency",
    title: "Campo Norte Residency",
    subtitle: "Alpine lounge · Monterrey",
    category: "Viajes · Nuevas audiencias",
    cover: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1200&q=80",
    dateLabel: "Abr 06 · 18:30",
    location: "Valle de Chipinque · Nuevo León",
    priceLabel: "Desde $290 USD",
    status: { label: "Invites released", tone: "info" },
    availability: "50 espacios",
    tags: ["wellness", "private"],
    badges: ["Residencia"],
    description:
      "Residencia de cuatro noches que combina ritmos minimalistas con rituales naturaleza-sincronizados y bienestar premium.",
    lineup: ["Loom Ensemble", "Guitarría Collective"],
    backendFields: ["id", "slug", "startTime", "doors", "priceRange", "venue", "status"],
    heroStatement: "Wellness retreat con sonido curado a cielo abierto.",
    heroNarrative:
      "Las noches incluyen sets acústicos, delegaciones artísticas y sesiones wellness guiadas con partners en senderos privados.",
    availabilityDetail: "50 espacios · Puertas 18:00",
    venueInfo: {
      name: "Alpine Lounge",
      address: "Camino Dinares 88",
      city: "Monterrey",
      neighborhood: "Valle de Chipinque",
      note: "Shuttle privado y concierge planificación de viaje."
    },
    logistics: [
      { label: "Puertas", detail: "18:00", helper: "Concierge de montaña" },
      { label: "Residencia", detail: "4 noches", helper: "Rutinas wellness + ambient" },
      { label: "Dress", detail: "Athleisure premium", helper: "Texturas ligeras y capas" }
    ],
    ticketTiers: [
      {
        tier: "Sunrise Suite",
        price: "$650 USD",
        description: "Cama privada + ritual de bienvenida + tasting.",
        availability: "20 suites",
        status: "Disponible"
      },
      {
        tier: "Mesa Social",
        price: "$420 USD",
        description: "Área lounge para cuatro con mixologist y curated servings.",
        availability: "10 mesas",
        status: "Limitado"
      },
      {
        tier: "Alpine Walk-In",
        price: "$290 USD",
        description: "Acceso individual al lineup nocturno + lounge.",
        availability: "20 pases",
        status: "Disponible"
      }
    ],
    highlights: [
      { title: "Ruta corta", detail: "Conexión VIP desde aeropuerto y montaña." },
      { title: "Backstage nature", detail: "Sound design pensado para brisas nocturnas." },
      { title: "Wellness", detail: "Imanes de salud + rituals guiados por coaches." }
    ],
    dataPoints: [
      { label: "Slug", value: "campo-norte-residency", helper: "Ruta en catálogo" },
      { label: "Status", value: "Invites released", helper: "Indicador de home" },
      { label: "Venue", value: "Alpine Lounge" },
      { label: "Ticket types", value: "Sunrise · Social · Walk-In" }
    ],
    ctaLabel: "Solicitar acceso",
    ctaSubLabel: "Validamos itinerarios y transporte",
    ctaHref: "mailto:contact@dcompass.dev"
  },
  {
    id: "midnight-observatory",
    title: "Midnight Observatory",
    subtitle: "Rooftop set · Punta Mita",
    category: "Travel · Elevación",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    dateLabel: "May 12 · 22:00",
    location: "Punta Mita · Nayarit",
    priceLabel: "Desde $520 USD",
    status: { label: "Capacidad limitada", tone: "warning" },
    availability: "Últimos 14 boletos",
    tags: ["travel", "members travel"],
    badges: ["Destino"],
    description:
      "Set nocturno en rooftop con vista al Pacífico, cuerdas neón y sistema de sonido adaptado a brisas marinas.",
    lineup: ["Orbit Duo", "Aura Strings"],
    backendFields: ["id", "slug", "venue", "lineup", "capacity", "status"],
    heroStatement: "Observatorio nocturno con vista al Pacífico.",
    heroNarrative:
      "Acceso exclusivo al rooftop de un retreat de lujo, con sets progresivos que acompañan la luna llena y service premium.",
    availabilityDetail: "Últimos 14 boletos · Doors 21:00",
    venueInfo: {
      name: "Mirador Punta Mita",
      address: "Blvd. Punta Mita 220",
      city: "Punta Mita",
      neighborhood: "Riviera Nayarit",
      note: "Clima templado con circuito privado de movilidad."
    },
    logistics: [
      { label: "Puertas", detail: "21:00", helper: "Shuttle desde la bahía" },
      { label: "Set", detail: "22:00 - 01:00", helper: "Ritmo progresivo · after" },
      { label: "Dress", detail: "Resort elegant", helper: "Capas ligeras + brillos" }
    ],
    ticketTiers: [
      {
        tier: "Sky Deck Duo",
        price: "$1,050 USD",
        description: "2 accesos + panel dedicado en rooftop + mixologist.",
        availability: "6 mesas",
        status: "Limitado"
      },
      {
        tier: "Sea Level", 
        price: "$520 USD",
        description: "Acceso general con lounge frontal y vista al Pacífico.",
        availability: "8 pases",
        status: "Disponible"
      },
      {
        tier: "After Set", 
        price: "$180 USD",
        description: "Pase de 1:00am con DJs invitados y sunset lounge.",
        availability: "12 pases",
        status: "Disponible"
      }
    ],
    highlights: [
      { title: "Vista", detail: "Point-of-view al Pacífico y su juego de luces." },
      { title: "Diseño", detail: "Sound system curado para brisas marinas." },
      { title: "Destino", detail: "Perks de hospitalidad y suites boutique." }
    ],
    dataPoints: [
      { label: "Slug", value: "midnight-observatory" },
      { label: "Status", value: "Capacidad limitada", helper: "Home muestra mismos estados" },
      { label: "Lineup", value: "Orbit Duo · Aura Strings" },
      { label: "Capacity", value: "160 invitados" }
    ],
    ctaLabel: "Solicitar acceso",
    ctaSubLabel: "Confirmamos transporte y suites asociadas",
    ctaHref: "mailto:contact@dcompass.dev"
  },
  {
    id: "cumbre-de-gala",
    title: "Cumbre de Gala",
    subtitle: "Salón Lumière · CDMX",
    category: "Cultura · Imperdible",
    cover: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    dateLabel: "Jun 04 · 21:00",
    location: "Polanco · Ciudad de México",
    priceLabel: "Desde $680 USD",
    status: { label: "Últimos boletos", tone: "warning" },
    availability: "12 boletos",
    tags: ["high society", "artistry"],
    badges: ["Edición limitada", "Ranking"],
    description:
      "Gala de colaboración con artistas invitados y 3 actos curados por maestros en escenografía inmersiva.",
    lineup: ["Lucié & Nox", "Orquesta Fulgor"],
    backendFields: ["id", "slug", "description", "priceRange", "tags", "status"],
    heroStatement: "Gala con tres actos y escenarios dcompass.",
    heroNarrative:
      "Una noche de arte, música y hospitality con accesos a cabinas reservadas y una after lounge cerrada.",
    availabilityDetail: "12 boletos · Puertas 20:30",
    venueInfo: {
      name: "Salón Lumière",
      address: "Montes Urales 55",
      city: "Ciudad de México",
      neighborhood: "Polanco",
      note: "Lobby curated y amenaza de valet premium."
    },
    logistics: [
      { label: "Puertas", detail: "20:30", helper: "Hospitality desk y valet" },
      { label: "Actos", detail: "21:00 - 00:30", helper: "3 transiciones + moda" },
      { label: "Dress", detail: "Black tie + couture", helper: "Guests seleccionados" }
    ],
    ticketTiers: [
      {
        tier: "Cabina Lumière",
        price: "$1,800 USD",
        description: "Cabina modular con host dedicado y bottle service.",
        availability: "3 cabinas",
        status: "Limitado"
      },
      {
        tier: "Butaca Premium",
        price: "$680 USD",
        description: "Asiento numerado + ritual de bienvenida + playlist physical.",
        availability: "6 asientos",
        status: "Disponible"
      },
      {
        tier: "After Lounge",
        price: "$320 USD",
        description: "Acceso a la after lounge y menu de digestivos.",
        availability: "10 pases",
        status: "Disponible"
      }
    ],
    highlights: [
      { title: "Curaduría cultural", detail: "3 actos que conectan arte, jazz y electrónica." },
      { title: "Hospitality", detail: "Concierge gourmet y valet priority." },
      { title: "Ranking", detail: "Invitados confirmados por partners de lujo." }
    ],
    dataPoints: [
      { label: "Slug", value: "cumbre-de-gala" },
      { label: "Status", value: "Últimos boletos", helper: "Urgency visible en catálogo" },
      { label: "Lineup", value: "Lucié & Nox · Orquesta Fulgor" },
      { label: "Tags", value: "High society · artistry" }
    ],
    ctaLabel: "Solicitar acceso",
    ctaSubLabel: "Elevamos tu invitación en menos de 24h",
    ctaHref: "mailto:contact@dcompass.dev"
  }
];
