"use client";

import Image from "next/image";
import { useState } from "react";
import { brandAssets, colors } from "@dcompass/ui";
import { FiBarChart2, FiCalendar, FiChevronLeft, FiChevronRight, FiHome, FiMenu, FiSearch, FiSettings, FiTag, FiUsers, FiX } from "react-icons/fi";

const partnerSidebarItems = [
  { label: "Inicio", icon: FiHome, active: true },
  { label: "Eventos", icon: FiCalendar },
  { label: "Boletos", icon: FiTag },
  { label: "Equipo", icon: FiUsers },
  { label: "Reportes", icon: FiBarChart2 },
  { label: "Configuración", icon: FiSettings }
];

const adminModulesPreview = [
  "Usuarios",
  "Roles y permisos",
  "Partners",
  "Eventos",
  "Boletos y órdenes",
  "Check-in / escaneos",
  "Pagos y cortes",
  "Logs / auditoría",
  "Configuración global"
];

const metrics = [
  { label: "Eventos activos", value: "12", note: "+2 esta semana" },
  { label: "Boletos vendidos", value: "4,280", note: "+18% vs semana anterior" },
  { label: "Accesos hoy", value: "836", note: "Actualizado hace 2 min" },
  { label: "Ingresos estimados", value: "$248,000", note: "Corte provisional" }
];

const events = [
  { name: "Noches en Supra Roma", venue: "Supra Roma", date: "Hoy · 10:00 PM", status: "Activo" },
  { name: "Casa Aurora Session", venue: "Casa Aurora", date: "Mañana · 9:30 PM", status: "Preventa" },
  { name: "Juárez Session 03", venue: "Foro Juárez", date: "Dom · 8:00 PM", status: "Últimos accesos" }
];

function PartnerAvatar() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-sm font-semibold text-white">
      JR
    </div>
  );
}

function Sidebar({
  collapsed,
  mobile = false,
  onClose,
  onToggleCollapse
}: {
  collapsed: boolean;
  mobile?: boolean;
  onClose?: () => void;
  onToggleCollapse?: () => void;
}) {
  return (
    <aside
      className={`flex h-full flex-col border-r border-white/10 bg-[#050711] ${collapsed ? "w-[5.4rem]" : "w-[18rem]"} transition-[width] duration-300 ease-out`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/8 px-4 py-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <Image src={brandAssets.mainLogo} alt="DCompass" width={40} height={40} className="h-10 w-10 shrink-0 rounded-xl object-contain" />
          {!collapsed ? (
            <div className="min-w-0">
              <Image src={brandAssets.lettersLogo} alt="DCOMPASS" width={150} height={28} className="h-4 w-auto" />
              <p className="mt-1 text-[0.68rem] tracking-[0.18em] text-zinc-500">PARTNERS</p>
            </div>
          ) : null}
        </div>
        {mobile && onClose ? (
          <button onClick={onClose} className="text-zinc-400 transition hover:text-white" aria-label="Cerrar menú">
            <FiX />
          </button>
        ) : null}
      </div>

      <nav className="flex-1 space-y-2 px-3 py-4">
        {partnerSidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              className={`flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                item.active
                  ? "border border-white/12 bg-white/[0.10] text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
                  : "border border-transparent text-zinc-400 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <Icon className="shrink-0 text-[1rem]" />
              {!collapsed ? <span className="text-sm font-medium">{item.label}</span> : null}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-3 py-4">
        <div className={`flex ${collapsed ? "justify-center" : "justify-end"}`}>
          <button
            type="button"
            onClick={onToggleCollapse}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:text-white"
            aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
          >
            <FiChevronLeft className={`text-base transition-transform duration-300 ${collapsed ? "rotate-180" : "rotate-0"}`} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default function PartnersHomePage() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#020308] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_42%)] blur-3xl" />
        <div className="absolute right-0 top-0 h-[28rem] w-[28rem] bg-[radial-gradient(circle,_rgba(130,89,208,0.18),_transparent_62%)]" />
      </div>

      <div className="relative flex min-h-screen lg:h-screen lg:min-h-0 lg:overflow-hidden">
        <div className="hidden lg:flex lg:h-full">
          <Sidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed((prev) => !prev)} />
        </div>

        {mobileMenuOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button className="absolute inset-0 bg-black/70" onClick={() => setMobileMenuOpen(false)} aria-label="Cerrar menú" />
            <div className="absolute left-0 top-0 h-full">
              <Sidebar collapsed={false} mobile onClose={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        ) : null}

        <section className="flex min-h-screen flex-1 flex-col lg:h-screen lg:min-h-0">
          <header className="border-b border-white/8 bg-[#020308]/92 px-5 py-4 backdrop-blur-2xl sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-200 transition hover:text-white lg:hidden"
                  aria-label="Abrir menú"
                >
                  <FiMenu />
                </button>
                <div className="hidden lg:block" />
              </div>

              <div className="relative hidden max-w-md flex-1 lg:block">
                <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Buscar eventos, boletos o equipo"
                  className="w-full rounded-full border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-white/25"
                />
              </div>

              <div className="ml-auto flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold text-white">Jesús Romero</p>
                  <p className="text-xs text-zinc-400">jesus@partner.com</p>
                </div>
                <PartnerAvatar />
              </div>
            </div>
          </header>

          <div className="flex-1 px-5 py-6 sm:px-6 lg:overflow-y-auto lg:px-8 lg:py-8">
            <div className="space-y-8">
              <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-2">
                  <p className="text-[0.8rem] tracking-[0.14em] text-zinc-500">PANEL DE PARTNERS</p>
                  <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Bienvenido de vuelta.</h1>
                  <p className="max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                    Revisa el estado de tus eventos, la actividad del día y los movimientos clave de tu operación.
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[0.9rem] font-semibold text-white shadow-[0_18px_45px_rgba(130,89,208,0.35)] transition hover:brightness-110"
                  style={{ background: colors.accent }}
                >
                  Crear evento
                  <FiChevronRight className="text-sm" />
                </button>
              </section>

              <section className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
                {metrics.map((metric) => (
                  <article key={metric.label} className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
                    <p className="text-sm font-medium text-zinc-400">{metric.label}</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{metric.value}</p>
                    <p className="mt-2 text-sm text-zinc-500">{metric.note}</p>
                  </article>
                ))}
              </section>

              <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-zinc-400">Próximos eventos</p>
                      <h2 className="mt-1 text-2xl font-semibold text-white">Actividad en curso</h2>
                    </div>
                    <button type="button" className="text-sm font-medium text-zinc-300 transition hover:text-white">
                      Ver todos
                    </button>
                  </div>

                  <div className="mt-6 space-y-4">
                    {events.map((event) => (
                      <div key={event.name} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="text-base font-semibold text-white">{event.name}</p>
                            <p className="mt-1 text-sm text-zinc-400">{event.venue}</p>
                          </div>
                          <div className="text-left sm:text-right">
                            <p className="text-sm text-zinc-300">{event.date}</p>
                            <span className="mt-2 inline-flex rounded-full border border-white/10 px-3 py-1 text-[0.72rem] tracking-[0.08em] text-zinc-200">
                              {event.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] sm:p-8">
                  <p className="text-sm font-medium text-zinc-400">Escalabilidad del shell</p>
                  <h2 className="mt-1 text-2xl font-semibold text-white">Pensando en ADMIN</h2>

                  <div className="mt-6 space-y-3">
                    <p className="text-sm leading-relaxed text-zinc-400">
                      Este shell puede compartirse entre PARTNER y ADMIN, cambiando sólo el árbol de navegación y la prioridad de módulos.
                    </p>

                    <div className="grid gap-3 pt-2">
                      {adminModulesPreview.map((module) => (
                        <div key={module} className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-300">
                          {module}
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
