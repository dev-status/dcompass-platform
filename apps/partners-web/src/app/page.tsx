import { HeroPanel, StatusBadge, MONOREPO_ID } from "@dcompass/ui";
import { partnerProfileSchema } from "@dcompass/domain";

const partnerHighlights = [
  "Contratos vigilados",
  "Tickets reservados",
  "Alertas y métricas en vivo"
];

const partnerExample = partnerProfileSchema.parse({
  id: "partner-123",
  name: "Lima Night",
  email: "hello@limanight.com",
  company: "Lima Night Entertainment"
});

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-black to-slate-950 text-white">
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16">
        <div className="flex flex-wrap items-center gap-4">
          <StatusBadge label="Partners Web" tone="positive" detail="Next.js · Turborepo" />
          <span className="text-xs uppercase tracking-[0.5em] text-zinc-400">{MONOREPO_ID}</span>
        </div>
        <HeroPanel
          title="Operar un evento con confianza"
          summary="Centraliza la creación de eventos, el control de stock y la revisión del admin sin que el partner pierda el control creativo."
          highlight="Portal para partners"
          actions={[
            { label: "Configurar auth", href: "#packages", description: "Firebase + Prisma" },
            { label: "Vislumbrar scanner", href: "../scanner-app", description: "App dedicada" }
          ]}
          accent="#0ea5e9"
        >
          <div className="flex flex-wrap gap-4">
            {partnerHighlights.map((label) => (
              <StatusBadge key={label} label={label} tone="info" />
            ))}
          </div>
        </HeroPanel>
        <section id="packages" className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Perfil de partner</h2>
            <StatusBadge label={partnerExample.company ? "contracted" : "draft"} tone="warning" />
          </div>
          <p className="text-sm text-zinc-400">
            Los esquemas del dominio viven en <code>@dcompass/domain</code>, lo que facilita compartir enums y validaciones
            entre apps y paquetes.
          </p>
          <ul className="grid gap-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
            <li>{partnerExample.name}</li>
            <li>{partnerExample.email}</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
