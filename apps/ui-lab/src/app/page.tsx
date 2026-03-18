import Image from "next/image";
import { Button, Card, ColorSwatch, EmptyState, HeroPanel, InputField, SectionHeader, StatCard, StatusBadge, brandAssets, colors, surfaces, surfaceTokens, typography } from "@dcompass/ui";
import styles from "./page.module.css";

const palette = [
  { label: "Canvas", value: colors.background, description: "Fondo gráfico principal" },
  { label: "Panel", value: colors.surface, description: "Superficie de contenidos" },
  { label: "Accent", value: colors.accent, description: "Llamadas a la acción" },
  { label: "Glow", value: colors.accentBlend, description: "Overlays y opacidades" },
  { label: "Partners", value: surfaces.partners, description: "Modo partners" },
  { label: "Success", value: colors.success, description: "Confirmaciones" },
  { label: "Warning", value: colors.warning, description: "Alertas suaves" },
  { label: "Danger", value: colors.danger, description: "Urgencias" }
];

const typographyScale = [
  {
    label: "Display / H1",
    size: typography.scale.display,
    weight: typography.weights.bold,
    sample: "DCompass",
    note: "Headline hero"
  },
  {
    label: "Hero / H2",
    size: typography.scale.hero,
    weight: typography.weights.semibold,
    sample: "Nightlife intelligence",
    note: "Section title"
  },
  {
    label: "Headline",
    size: typography.scale.headline,
    weight: typography.weights.medium,
    sample: "Premium ticketing",
    note: "Sub headers"
  },
  {
    label: "Body",
    size: typography.scale.body,
    weight: typography.weights.regular,
    sample: "Comprar, transferir y vivir el evento con calma.",
    note: "Informational copy"
  },
  {
    label: "Label",
    size: typography.scale.label,
    weight: typography.weights.medium,
    sample: "Partners",
    note: "Caps + micro copy"
  }
];

export default function Page() {
  return (
    <main className={styles.page}>
      <div className={styles.heroSection}>
        <HeroPanel
          highlight="Sistema visual"
          title="Base de diseño DCompass"
          summary="Tokens, recursos y primitives premium para diseñar la experiencia antes de implementar los flujos de producto."
          accent={colors.accent}
          actions={[
            { label: "Ver paleta", href: "#paleta", description: "Colors & surfaces", accent: "secondary" },
            { label: "Explorar componentes", href: "#componentes", description: "Buttons, cards, inputs" }
          ]}
        >
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <StatusBadge label="Premium" tone="positive" />
            <StatusBadge label="Dark luxury" tone="info" />
            <StatusBadge label="Partners" tone="warning" />
          </div>
        </HeroPanel>
      </div>

      <section className={`${styles.section} ${styles.split}`} id="paleta">
        <div>
          <SectionHeader
            eyebrow="Paleta"
            title="Colores base y acentos"
            description="La paleta premium se despliega en tonos de fondo profundo, morado brillante y variantes para comunicar estados y contextos."
          />
          <div className={styles.paletteGrid}>
            {palette.map((color) => (
              <ColorSwatch key={color.label} label={color.label} value={color.value} description={color.description} />
            ))}
          </div>
        </div>
        <div className={styles.logoStack}>
          <Card title="Marca central">
            <Image src={brandAssets.mainLogo} alt="DCompass logo" width={340} height={140} />
          </Card>
          <Card title="Lettermarks">
            <Image src={brandAssets.lettersLogo} alt="DCompass letters" width={260} height={120} />
            <div className="mt-3">
              <Image src={brandAssets.partnersLettersLogo} alt="Partners letters" width={260} height={120} />
            </div>
          </Card>
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeader
          eyebrow="Tipografía"
          title="Escalas y reglas"
          description="Space Grotesk + Inter mantienen la jerarquía. Los tamaños grandes usan Tracking neutral, los textos secundarios se apoyan en body legible."
        />
        <div className={styles.componentGrid}>
          {typographyScale.map((token) => (
            <Card key={token.label} title={token.label}>
              <p
                style={{
                  fontSize: token.size,
                  fontFamily: typography.fonts.heading,
                  color: colors.textPrimary,
                  fontWeight: token.weight
                }}
              >
                {token.sample}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.3em]" style={{ color: colors.textSecondary }}>
                {token.note} · {token.size}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeader
          eyebrow="Superficies"
          title="Contextos visuales"
          description="Mostrar variantes core y partners ya desde la base ayuda a validar contraste y jerarquía antes de construir product screens."
        />
        <div className={styles.surfaceGrid}>
          {surfaceTokens.map((surface) => (
            <Card
              key={surface.name}
              title={surface.name}
              style={{
                background: surface.color,
                borderColor: surface.accent,
                borderWidth: 1,
                boxShadow: "0 20px 40px rgba(0,0,0,0.55)"
              }}
            >
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                {surface.description}
              </p>
              <StatusBadge label="Surface" tone="info" />
            </Card>
          ))}
        </div>
      </section>

      <section className={styles.section} id="componentes">
        <SectionHeader
          eyebrow="Componentes"
          title="Primitivas reutilizables"
          description="Buttons, inputs, cards y badges ensamblados con los tokens del sistema."
        />
        <div className={styles.componentGrid}>
          <Card title="Buttons">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Comprar ahora</Button>
              <Button variant="secondary">Explorar eventos</Button>
              <Button variant="ghost">Partners</Button>
            </div>
          </Card>

          <Card title="Inputs">
            <InputField label="Código de acceso" placeholder="DCP-XXXX" helperText="Mayúsculas, no se aceptan espacios" />
          </Card>

          <Card title="Badges">
            <div className={styles.badgeRow}>
              <StatusBadge label="Activo" tone="positive" />
              <StatusBadge label="Información" tone="info" />
              <StatusBadge label="Advertencia" tone="warning" />
              <StatusBadge label="Crítico" tone="danger" />
            </div>
          </Card>

          <Card title="Stats">
            <StatCard label="Tickets Premium" value="1,245" helper="Ventas semanales" delta="+4.3%" tone="positive" />
          </Card>

          <Card title="Empty states">
            <EmptyState
              title="Sin vistas todavía"
              description="Agrega tareas del roadmap para que los partners puedan crear experiencias inolvidables."
              icon={<span className="text-2xl">✨</span>}
              action={<Button variant="secondary">Documentar sistema</Button>}
            />
          </Card>
        </div>
      </section>
    </main>
  );
}
