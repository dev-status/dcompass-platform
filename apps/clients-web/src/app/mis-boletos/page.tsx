import Image from "next/image";
import Link from "next/link";
import { brandAssets, colors } from "@dcompass/ui";
import { FiArrowRight, FiCalendar, FiClock, FiMapPin, FiTag } from "react-icons/fi";

const tickets = [
  {
    id: "DCP-2048",
    title: "Noches en Supra Roma",
    category: "DJ Set · Roma Norte",
    date: "Viernes 22 de marzo",
    time: "10:00 PM",
    venue: "Supra Roma · CDMX",
    access: "2 × General",
    status: "Listos para usar",
    image: "/hero/hero-v2.png",
    highlight: true,
  },
  {
    id: "DCP-2056",
    title: "Casa Aurora Sessions",
    category: "Live Set · Condesa",
    date: "Sábado 23 de marzo",
    time: "9:30 PM",
    venue: "Casa Aurora · CDMX",
    access: "1 × Early Access",
    status: "Disponibles",
    image: "/hero/hero-v2.png",
  },
  {
    id: "DCP-2071",
    title: "Azotea 9",
    category: "Rooftop Session · Juárez",
    date: "Sábado 30 de marzo",
    time: "6:00 PM",
    venue: "Azotea 9 · CDMX",
    access: "2 × Mesa compartida",
    status: "Pendiente de abrir QR",
    image: "/hero/hero-v2.png",
  },
];

export default function MisBoletosPage() {
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
              <Image
                src={brandAssets.lettersLogo}
                alt="DCOMPASS"
                width={190}
                height={40}
                priority
                className="h-5 w-auto sm:h-6"
              />
            </Link>
          </div>
        </header>

        <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-5 py-8 sm:px-6 lg:px-10 lg:py-10">
          <div className="space-y-3">
            <Link href="/events" className="inline-flex w-fit items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-white">
              <FiArrowRight className="rotate-180 text-sm" />
              Volver
            </Link>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Mis boletos</h1>
              <p className="max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                Un lugar claro para revisar tus accesos, identificar tu siguiente evento y entrar rápido al boleto correcto cuando lo necesites.
              </p>
            </div>
          </div>

          <div className="grid gap-8 xl:grid-cols-[1.02fr_0.98fr] xl:items-start">
            <div className="space-y-6">
              <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div className="space-y-2">
                    <p className="text-[0.84rem] font-medium tracking-[0.08em] text-zinc-400">Centro de accesos</p>
                    <h2 className="text-3xl font-semibold tracking-tight text-white">Tus próximos boletos, primero.</h2>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-zinc-300">
                    {tickets.length} boletos / compras visibles
                  </div>
                </div>

                <div className="mt-6 grid gap-5">
                  {tickets.map((ticket) => (
                    <article
                      key={ticket.id}
                      className={`overflow-hidden rounded-[1.7rem] border bg-white/[0.035] ${
                        ticket.highlight ? "border-white/20 shadow-[0_24px_70px_rgba(130,89,208,0.12)]" : "border-white/10"
                      }`}
                    >
                      <div className="grid gap-0 lg:grid-cols-[0.84fr_1.16fr]">
                        <div className="relative min-h-[13rem] border-b border-white/10 lg:border-b-0 lg:border-r">
                          <Image src={ticket.image} alt={ticket.title} fill className="object-cover" />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,3,8,0.08),rgba(2,3,8,0.78))]" />
                          <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[0.74rem] font-medium tracking-[0.01em] text-zinc-100 backdrop-blur-sm">
                            {ticket.status}
                          </div>
                          <div className="absolute inset-x-0 bottom-0 p-5">
                            <p className="text-[0.74rem] tracking-[0.01em] text-zinc-300">{ticket.category}</p>
                            <h3 className="mt-2 text-2xl font-semibold text-white">{ticket.title}</h3>
                          </div>
                        </div>

                        <div className="space-y-5 p-5 sm:p-6">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
                              <FiCalendar className="mt-0.5 text-base" style={{ color: colors.accent }} />
                              <div>
                                <p className="text-sm font-medium text-zinc-400">Fecha</p>
                                <p className="mt-1 text-sm text-white">{ticket.date}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
                              <FiClock className="mt-0.5 text-base" style={{ color: colors.accent }} />
                              <div>
                                <p className="text-sm font-medium text-zinc-400">Hora</p>
                                <p className="mt-1 text-sm text-white">{ticket.time}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
                              <FiMapPin className="mt-0.5 text-base" style={{ color: colors.accent }} />
                              <div>
                                <p className="text-sm font-medium text-zinc-400">Venue</p>
                                <p className="mt-1 text-sm text-white">{ticket.venue}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
                              <FiTag className="mt-0.5 text-base" style={{ color: colors.accent }} />
                              <div>
                                <p className="text-sm font-medium text-zinc-400">Acceso</p>
                                <p className="mt-1 text-sm text-white">{ticket.access}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.86rem] font-semibold tracking-[0.01em] text-white shadow-[0_18px_45px_rgba(130,89,208,0.45)] transition hover:brightness-110"
                              style={{ background: colors.accent }}
                            >
                              Ver boleto
                              <FiArrowRight className="text-sm" />
                            </button>
                            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 px-5 py-3 text-[0.86rem] font-medium tracking-[0.01em] text-zinc-200 transition hover:border-white/30 hover:text-white">
                              Descargar comprobante
                            </button>
                          </div>

                          <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-300">
                            Orden <span className="font-medium text-white">{ticket.id}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <aside className="hidden xl:block" />
          </div>
        </section>
      </div>
    </main>
  );
}
