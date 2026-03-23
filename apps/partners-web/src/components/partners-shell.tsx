"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { brandAssets, colors } from "@dcompass/ui";
import {
  FiActivity,
  FiBarChart2,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiFileText,
  FiHome,
  FiLogOut,
  FiMenu,
  FiSearch,
  FiSettings,
  FiShield,
  FiSliders,
  FiTag,
  FiUsers,
  FiX
} from "react-icons/fi";
import type { AppRole } from "@/lib/auth/session";

type NavItem = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
};

const partnerSidebarItems: NavItem[] = [
  { label: "Inicio", icon: FiHome, href: "/partner" },
  { label: "Eventos", icon: FiCalendar, href: "/partner" },
  { label: "Boletos", icon: FiTag, href: "/partner" },
  { label: "Equipo", icon: FiUsers, href: "/partner" },
  { label: "Reportes", icon: FiBarChart2, href: "/partner" },
  { label: "Configuración", icon: FiSettings, href: "/partner" }
];

const adminSidebarItems: NavItem[] = [
  { label: "Inicio", icon: FiHome, href: "/admin" },
  { label: "Usuarios", icon: FiUsers, href: "/admin" },
  { label: "Partners", icon: FiShield, href: "/admin" },
  { label: "Eventos", icon: FiActivity, href: "/admin" },
  { label: "Órdenes", icon: FiFileText, href: "/admin" },
  { label: "Accesos", icon: FiActivity, href: "/admin" },
  { label: "Roles", icon: FiSliders, href: "/admin" },
  { label: "Configuración", icon: FiSettings, href: "/admin" },
  { label: "Auditoría", icon: FiBarChart2, href: "/admin" }
];

const partnerMetrics = [
  { label: "Eventos activos", value: "12", note: "+2 esta semana" },
  { label: "Boletos vendidos", value: "4,280", note: "+18% vs semana anterior" },
  { label: "Accesos hoy", value: "836", note: "Actualizado hace 2 min" },
  { label: "Ingresos estimados", value: "$248,000", note: "Corte provisional" }
];

const partnerEvents = [
  { name: "Noches en Supra Roma", venue: "Supra Roma", date: "Hoy · 10:00 PM", status: "Activo" },
  { name: "Casa Aurora Session", venue: "Casa Aurora", date: "Mañana · 9:30 PM", status: "Preventa" },
  { name: "Juárez Session 03", venue: "Foro Juárez", date: "Dom · 8:00 PM", status: "Últimos accesos" }
];

const adminModulesPreview = [
  "Usuarios",
  "Roles y permisos",
  "Partners",
  "Eventos",
  "Boletos y órdenes",
  "Check-in / escaneos",
  "Pagos y cortes",
  "Logs / auditoría"
];

const adminMetrics = [
  { label: "Usuarios activos", value: "18,240", note: "+4.8% esta semana" },
  { label: "Partners operando", value: "126", note: "5 pendientes de revisión" },
  { label: "Eventos esta semana", value: "84", note: "12 con alta demanda" },
  { label: "Incidencias abiertas", value: "7", note: "2 requieren atención" }
];

const adminAlerts = [
  {
    title: "Revisión pendiente de partner",
    detail: "Hay 3 partners nuevos esperando validación administrativa.",
    status: "Importante"
  },
  {
    title: "Actividad inusual en accesos",
    detail: "Un evento reportó un pico de escaneos fuera del promedio esperado.",
    status: "Revisar"
  },
  {
    title: "Cambios recientes en roles",
    detail: "Se actualizaron permisos en 4 cuentas durante las últimas 24 horas.",
    status: "Auditar"
  }
];

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-sm font-semibold text-white">
      {initials}
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((token) => token.trim()[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ShellSidebar({
  collapsed,
  mobile = false,
  role,
  onClose,
  onToggleCollapse
}: {
  collapsed: boolean;
  mobile?: boolean;
  role: AppRole;
  onClose?: () => void;
  onToggleCollapse?: () => void;
}) {
  const items = role === "partner" ? partnerSidebarItems : adminSidebarItems;
  const sectionLabel = role === "partner" ? "PARTNERS" : "ADMIN";

  return (
    <aside className={`flex h-full flex-col border-r border-white/10 bg-[#050711] ${collapsed ? "w-[5.4rem]" : "w-[18rem]"} transition-[width] duration-300 ease-out`}>
      <div className="flex items-center justify-between gap-3 border-b border-white/8 px-4 py-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <Image src={brandAssets.mainLogo} alt="DCompass" width={40} height={40} className="h-10 w-10 shrink-0 rounded-xl object-contain" />
          {!collapsed ? (
            <div className="min-w-0">
              <Image src={brandAssets.lettersLogo} alt="DCOMPASS" width={150} height={28} className="h-4 w-auto" />
              <p className="mt-1 text-[0.68rem] tracking-[0.18em] text-zinc-500">{sectionLabel}</p>
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
        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === 0;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                isActive
                  ? "border border-white/12 bg-white/[0.10] text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
                  : "border border-transparent text-zinc-400 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <Icon className="shrink-0 text-[1rem]" />
              {!collapsed ? <span className="text-sm font-medium">{item.label}</span> : null}
            </Link>
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

function Header({
  role,
  fullName,
  email,
  onOpenMenu,
  onLogout,
  secondaryCta
}: {
  role: AppRole;
  fullName: string;
  email: string;
  onOpenMenu: () => void;
  onLogout: () => Promise<void>;
  secondaryCta?: React.ReactNode;
}) {
  return (
    <header className="border-b border-white/8 bg-[#020308]/92 px-5 py-4 backdrop-blur-2xl sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onOpenMenu}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-200 transition hover:text-white lg:hidden"
          aria-label="Abrir menú"
        >
          <FiMenu />
        </button>

        <div className="relative hidden max-w-md flex-1 lg:block">
          <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder={role === "partner" ? "Buscar eventos, boletos o equipo" : "Buscar usuarios, partners o eventos"}
            className="w-full rounded-full border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-white/25"
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          {secondaryCta}
          <button
            type="button"
            onClick={() => void onLogout()}
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-300 transition hover:text-white lg:inline-flex"
          >
            <FiLogOut className="text-sm" />
            Salir
          </button>
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-white">{fullName}</p>
            <p className="text-xs text-zinc-400">{email}</p>
          </div>
          <Avatar initials={getInitials(fullName)} />
        </div>
      </div>
    </header>
  );
}

export function PartnersHomeShell({ fullName, email, canAccessAdmin }: { fullName: string; email: string; canAccessAdmin: boolean }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/session/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#020308] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_42%)] blur-3xl" />
        <div className="absolute right-0 top-0 h-[28rem] w-[28rem] bg-[radial-gradient(circle,_rgba(130,89,208,0.18),_transparent_62%)]" />
      </div>

      <div className="relative flex min-h-screen lg:h-screen lg:min-h-0 lg:overflow-hidden">
        <div className="hidden lg:flex lg:h-full">
          <ShellSidebar role="partner" collapsed={collapsed} onToggleCollapse={() => setCollapsed((prev) => !prev)} />
        </div>

        {mobileMenuOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button className="absolute inset-0 bg-black/70" onClick={() => setMobileMenuOpen(false)} aria-label="Cerrar menú" />
            <div className="absolute left-0 top-0 h-full">
              <ShellSidebar role="partner" collapsed={false} mobile onClose={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        ) : null}

        <section className="flex min-h-screen flex-1 flex-col lg:h-screen lg:min-h-0">
          <Header
            role="partner"
            fullName={fullName}
            email={email}
            onOpenMenu={() => setMobileMenuOpen(true)}
            onLogout={handleLogout}
            secondaryCta={canAccessAdmin ? <Link href="/admin" className="hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-300 transition hover:text-white lg:inline-flex">Ver admin</Link> : null}
          />

          <div className="flex-1 px-5 py-6 sm:px-6 lg:overflow-y-auto lg:px-8 lg:py-8">
            <div className="space-y-8">
              <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-2">
                  <p className="text-[0.8rem] tracking-[0.14em] text-zinc-500">PANEL DE PARTNERS</p>
                  <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Bienvenido de vuelta.</h1>
                  <p className="max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">Revisa el estado de tus eventos, la actividad del día y los movimientos clave de tu operación.</p>
                </div>
                <button type="button" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[0.9rem] font-semibold text-white shadow-[0_18px_45px_rgba(130,89,208,0.35)] transition hover:brightness-110" style={{ background: colors.accent }}>
                  Crear evento
                  <FiChevronRight className="text-sm" />
                </button>
              </section>

              <section className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
                {partnerMetrics.map((metric) => (
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
                    <button type="button" className="text-sm font-medium text-zinc-300 transition hover:text-white">Ver todos</button>
                  </div>
                  <div className="mt-6 space-y-4">
                    {partnerEvents.map((event) => (
                      <div key={event.name} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="text-base font-semibold text-white">{event.name}</p>
                            <p className="mt-1 text-sm text-zinc-400">{event.venue}</p>
                          </div>
                          <div className="text-left sm:text-right">
                            <p className="text-sm text-zinc-300">{event.date}</p>
                            <span className="mt-2 inline-flex rounded-full border border-white/10 px-3 py-1 text-[0.72rem] tracking-[0.08em] text-zinc-200">{event.status}</span>
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
                    <p className="text-sm leading-relaxed text-zinc-400">Este shell puede compartirse entre PARTNER y ADMIN, cambiando sólo el árbol de navegación y la prioridad de módulos.</p>
                    <div className="grid gap-3 pt-2">
                      {adminModulesPreview.map((module) => (
                        <div key={module} className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-300">{module}</div>
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

export function AdminHomeShell({ fullName, email, canAccessPartner }: { fullName: string; email: string; canAccessPartner: boolean }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/session/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#020308] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_42%)] blur-3xl" />
        <div className="absolute left-0 top-0 h-[28rem] w-[28rem] bg-[radial-gradient(circle,_rgba(130,89,208,0.18),_transparent_62%)]" />
      </div>
      <div className="relative flex min-h-screen lg:h-screen lg:min-h-0 lg:overflow-hidden">
        <div className="hidden lg:flex lg:h-full">
          <ShellSidebar role="admin" collapsed={collapsed} onToggleCollapse={() => setCollapsed((prev) => !prev)} />
        </div>

        {mobileMenuOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button className="absolute inset-0 bg-black/70" onClick={() => setMobileMenuOpen(false)} aria-label="Cerrar menú" />
            <div className="absolute left-0 top-0 h-full">
              <ShellSidebar role="admin" collapsed={false} mobile onClose={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        ) : null}

        <section className="flex min-h-screen flex-1 flex-col lg:h-screen lg:min-h-0">
          <Header
            role="admin"
            fullName={fullName}
            email={email}
            onOpenMenu={() => setMobileMenuOpen(true)}
            onLogout={handleLogout}
            secondaryCta={canAccessPartner ? <Link href="/partner" className="hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-300 transition hover:text-white lg:inline-flex">Ver partner</Link> : null}
          />

          <div className="flex-1 px-5 py-6 sm:px-6 lg:overflow-y-auto lg:px-8 lg:py-8">
            <div className="space-y-8">
              <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-2">
                  <p className="text-[0.8rem] tracking-[0.14em] text-zinc-500">CENTRO DE CONTROL</p>
                  <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Visión global del sistema.</h1>
                  <p className="max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">Supervisa usuarios, partners, actividad operativa y decisiones críticas desde un solo lugar.</p>
                </div>
                <button type="button" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[0.9rem] font-semibold text-white shadow-[0_18px_45px_rgba(130,89,208,0.35)] transition hover:brightness-110" style={{ background: colors.accent }}>
                  Revisar incidencias
                  <FiChevronRight className="text-sm" />
                </button>
              </section>

              <section className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
                {adminMetrics.map((metric) => (
                  <article key={metric.label} className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
                    <p className="text-sm font-medium text-zinc-400">{metric.label}</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{metric.value}</p>
                    <p className="mt-2 text-sm text-zinc-500">{metric.note}</p>
                  </article>
                ))}
              </section>

              <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
                <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-zinc-400">Alertas y foco</p>
                      <h2 className="mt-1 text-2xl font-semibold text-white">Lo importante hoy</h2>
                    </div>
                    <button type="button" className="text-sm font-medium text-zinc-300 transition hover:text-white">Ver actividad</button>
                  </div>
                  <div className="mt-6 space-y-4">
                    {adminAlerts.map((alert) => (
                      <div key={alert.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-base font-semibold text-white">{alert.title}</p>
                            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{alert.detail}</p>
                          </div>
                          <span className="inline-flex rounded-full border border-white/10 px-3 py-1 text-[0.72rem] tracking-[0.08em] text-zinc-200">{alert.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
                <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] sm:p-8">
                  <p className="text-sm font-medium text-zinc-400">Módulos rápidos</p>
                  <h2 className="mt-1 text-2xl font-semibold text-white">Operación administrativa</h2>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {adminModulesPreview.map((module) => (
                      <div key={module} className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-300">{module}</div>
                    ))}
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
