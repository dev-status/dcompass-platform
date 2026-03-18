import type { EventCardData } from "@/components/EventCard";

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
    backendFields: ["id", "slug", "heroImage", "lineup", "startTime", "status"]
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
    backendFields: ["id", "slug", "startTime", "doors", "priceRange", "venue", "status"]
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
    backendFields: ["id", "slug", "venue", "lineup", "capacity", "status"]
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
    backendFields: ["id", "slug", "description", "priceRange", "tags", "status"]
  }
];
