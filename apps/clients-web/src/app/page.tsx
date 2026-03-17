import { HeroPanel, StatusBadge, MONOREPO_ID } from "@dcompass/ui";
import { DCompassRole } from "@dcompass/domain";

const upcomingHighlights = [
  {
    title: "Discover experiences",
    body: "Partners can showcase curated events, highlight lineups, and keep demand transparent before tickets drop.",
    status: "positive"
  },
  {
    title: "Client profiles",
    body: "Saved favorites, invitations, and event alerts keep the experience personal while staying premium.",
    status: "info"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020409] text-white">
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16">
        <div className="flex flex-wrap items-center gap-4">
          <StatusBadge label="Clients Web" tone="info" detail="Next.js · Tailwind · pnpm" />
          <span className="text-xs uppercase tracking-[0.5em] text-zinc-500">{MONOREPO_ID}</span>
        </div>
        <HeroPanel
          title="Un lugar premium para tus boletos"
          summary="Clientes, eventos y acceso controlado en una misma experiencia web. Esta superficie inicial ya escucha al backend compartido, a la estrategia de seguridad y a la futura app de scanner."
          highlight="Portal de clientes"
          actions={[
            {
              label: "Ver roadmap",
              href: "https://quantis.dev",
              description: "Fase de reestructuración",
              accent: "primary"
            },
            {
              label: "Explorar paquetes",
              href: "#packages",
              description: "Dominio, auth, db",
              accent: "secondary"
            }
          ]}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {upcomingHighlights.map((item) => (
              <article
                key={item.title}
                className="space-y-1 rounded-2xl border border-white/10 p-4 text-sm text-zinc-300"
              >
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p>{item.body}</p>
                <StatusBadge label="ready" tone={item.status as "positive" | "info" | "warning"} />
              </article>
            ))}
          </div>
        </HeroPanel>
        <section id="packages" className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Paquetes de dominio</h2>
            <StatusBadge label={DCompassRole.PARTNER} tone="warning" />
          </div>
          <p className="text-sm text-zinc-400">
            La capa compartida maneja auth, validaciones y la representación del dominio. Las apps pueden
            importar tipados y helpers mientras siguen desarrollándose en paralelo.
          </p>
        </section>
      </main>
    </div>
  );
}
