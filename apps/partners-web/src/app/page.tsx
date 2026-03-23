"use client";

import Image from "next/image";
import { useState } from "react";
import type { IconType } from "react-icons";
import {
  FiArrowRight,
  FiBarChart2,
  FiBell,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiClipboard,
  FiCreditCard,
  FiHome,
  FiLock,
  FiMenu,
  FiSearch,
  FiShield,
  FiSettings,
  FiTicket,
  FiUser,
  FiUserCheck,
  FiUsers
} from "react-icons/fi";
import { brandAssets, StatusBadge } from "@dcompass/ui";

type Role = "partner" | "admin";

type MenuItem = {
  label: string;
  icon: IconType;
  badge?: string;
};

const partnerMenu: MenuItem[] = [
  { label: "Inicio", icon: FiHome },
  { label: "Eventos", icon: FiCalendar },
  { label: "Boletos", icon: FiTicket },
  { label: "Equipo", icon: FiUsers },
  { label: "Reportes", icon: FiBarChart2 },
  { label: "Configuración", icon: FiSettings }
];

const adminMenu: MenuItem[] = [
  { label: "Inicio", icon: FiHome },
  { label: "Usuarios", icon: FiUserCheck },
  { label: "Partners", icon: FiUsers },
  { label: "Eventos", icon: FiCalendar },
  { label: "Órdenes", icon: FiCreditCard },
  { label: "Accesos", icon: FiLock },
  { label: "Roles", icon: FiShield },
  { label: "Configuración", icon: FiSettings },
  { label: "Auditoría", icon: FiClipboard, badge: "nuevo" }
];

const partnerHighlights = [
  { label: "Eventos activos", value: "12", delta: "+2 vs semana" },
  { label: "Boletos vendidos", value: "3,745", delta: "+18% vs mes" },
  { label: "Ingreso proyectado", value: "$245K", delta: "meta 82%" }
];

const partnerEvents = [
  { title: "Luminous Sessions", date: "Hoy · 20:00" },
  { title: "Afterglow Festival", date: "Jue 14 · 22:00" },
  { title: "Analog Dreams", date: "Vie 22 · 19:30" }
];

const adminHighlights = [
  { label: "Partners activos", value: "58", delta: "+4 en 30d" },
  { label: "Usuarios validados", value: "1,220", delta: "estable" },
  { label: "Incidentes críticos", value: "3", delta: "resueltos 1h" }
];

const adminSignals = [
  { label: "Alertas de integridad", value: "3", tone: "warning" },
  { label: "Últimos accesos", value: "12 hrs", tone: "positive" },
  { label: "Órdenes pendientes", value: "42", tone: "info" }
];

export default function PartnersWebHome() {
  const [role, setRole] = useState<Role>("partner");

  const handleRoleToggle = () => {
    setRole((current) => (current === "partner" ? "admin" : "partner"));
  };

  const ShellChildren = role === "partner" ? <PartnerHome /> : <AdminHome />;

  return (
    <div className="min-h-screen bg-[#020308] text-white">
      <AppShell role={role} onRequestRoleSwitch={handleRoleToggle}>
        {ShellChildren}
      </AppShell>
    </div>
  );
}

function AppShell({ role, onRequestRoleSwitch, children }: { role: Role; onRequestRoleSwitch: () => void; children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const currentMenu = role === "partner" ? partnerMenu : adminMenu;

  return (
    <div className="flex min-h-screen">
      <aside
        className={`hidden lg:flex flex-col border-r border-white/10 bg-[#03050b] transition-all duration-200 ${
          sidebarCollapsed ? "w-20" : "w-72"
        }`}
      >
        <SidebarContent menu={currentMenu} collapsed={sidebarCollapsed} role={role} />
        <button
          type="button"
          onClick={() => setSidebarCollapsed((prev) => !prev)}
          className="mt-auto flex items-center justify-center gap-2 border-t border-white/5 px-4 py-3 text-xs uppercase tracking-[0.3em] text-zinc-400 transition hover:text-white"
        >
          <span className="sr-only">Colapsar menú</span>
          {sidebarCollapsed ? <FiChevronRight className="h-4 w-4" /> : <FiChevronLeft className="h-4 w-4" />}
        </button>
      </aside>

      <div className="flex flex-1 flex-col">
        <Topbar role={role} onOpenDrawer={() => setDrawerOpen(true)} onRoleSwitch={onRequestRoleSwitch} />
        <main className="flex-1 overflow-y-auto px-5 py-6 sm:px-6 lg:px-10">{children}</main>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setDrawerOpen(false)} />
          <div className="relative z-50 w-72 max-w-xs border-r border-white/5 bg-[#03050b]/95 px-5 py-6 shadow-2xl">
            <SidebarContent menu={currentMenu} collapsed={false} role={role} />
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white"
            >
              Cerrar menú
              <FiChevronLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarContent({ menu, collapsed, role }: { menu: MenuItem[]; collapsed: boolean; role: Role }) {
  return (
    <div className="flex h-full flex-col gap-6 px-5 py-6">
      <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
        <Image
          src={brandAssets.mainLogo}
          alt="DCOMPASS"
          width={32}
          height={32}
          className="h-10 w-10 rounded-xl object-contain"
        />
        {!collapsed && (
          <div>
            <Image src={brandAssets.lettersLogo} alt="DCOMPASS" width={120} height={28} className="h-4 w-auto" />
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-zinc-500">{role === "partner" ? "Partners" : "Admin"}</p>
          </div>
        )}
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {menu.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`group flex items-center gap-3 rounded-2xl border border-white/10 px-3 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5 ${
              collapsed ? "justify-center" : ""}
            }`}
            title={item.label}
          >
            <item.icon className="h-5 w-5 text-zinc-200" />
            {!collapsed && (
              <span className="flex-1 text-left">
                {item.label}
                {item.badge ? <span className="ml-2 rounded-full bg-rose-500/20 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.3em] text-rose-200">{item.badge}</span> : null}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className={`flex items-center gap-3 rounded-2xl border border-white/10 px-3 py-3 ${collapsed ? "justify-center" : ""}`}>
        <FiUser className="h-5 w-5 text-zinc-300" />
        {!collapsed && (
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Sesión activa</p>
            <p className="text-sm font-semibold text-white">Partner hub</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Topbar({ role, onOpenDrawer, onRoleSwitch }: { role: Role; onOpenDrawer: () => void; onRoleSwitch: () => void }) {
  const nextRole = role === "partner" ? "admin" : "partner";

  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-[#020308]/80 px-5 py-4 backdrop-blur backdrop-saturate-150 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenDrawer}
          className="lg:hidden rounded-full border border-white/10 p-2 text-white transition hover:border-white/30"
          aria-label="Abrir menú"
        >
          <FiMenu className="h-5 w-5" />
        </button>
        <div className="hidden items-center gap-3 lg:flex">
          <Image src={brandAssets.mainLogo} alt="DCOMPASS" width={30} height={30} className="h-9 w-9 rounded-xl object-contain" />
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-zinc-500">Partners hub</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-white">Panel {role}</p>
              <StatusBadge label={role} tone={role === "partner" ? "positive" : "info"} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3 text-sm text-white lg:justify-start lg:pl-4">
        <button
          type="button"
          onClick={onRoleSwitch}
          className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 uppercase tracking-[0.3em] text-[0.65rem] text-white transition hover:border-white/30 lg:flex"
        >
          Ver como {nextRole}
        </button>
        <button
          type="button"
          className="rounded-full border border-white/10 bg-white/5 p-2 transition hover:border-white/30"
          aria-label="Buscar"
        >
          <FiSearch className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="rounded-full border border-white/10 bg-white/5 p-2 transition hover:border-white/30"
          aria-label="Alertas"
        >
          <FiBell className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <FiUser className="h-4 w-4" />
          <div className="text-left leading-tight">
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-zinc-500">Operador</p>
            <p className="text-xs font-semibold text-white">DCompass Crew</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function PartnerHome() {
  return (
    <section className="space-y-6">
      <div className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">Panel operativo</p>
            <h1 className="text-3xl font-semibold text-white">Centro de control partner</h1>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge label="Live" tone="positive" />
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white transition hover:border-white/40"
            >
              Entrar al panel
              <FiArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
        <p className="max-w-3xl text-sm text-zinc-300">
          Opera tus eventos, revisa el estado de la boletería y coordina equipos desde un solo lugar. Mantén el sistema listo para cada noche.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {partnerHighlights.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
            <p className="text-xs text-zinc-400">{item.delta}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#03050b]/80 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">Próximos eventos</p>
            <h2 className="text-xl font-semibold text-white">Agenda semanal</h2>
          </div>
          <button
            type="button"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-300 underline-offset-4 transition hover:text-white"
          >
            Ver todos
          </button>
        </div>
        <div className="mt-6 space-y-3">
          {partnerEvents.map((event) => (
            <div key={event.title} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-white">{event.title}</p>
                <p className="text-xs text-zinc-400">{event.date}</p>
              </div>
              <StatusBadge label="Activo" tone="positive" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdminHome() {
  return (
    <section className="space-y-6">
      <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
        <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">Control global</p>
        <h1 className="text-3xl font-semibold text-white">Comando administrativo</h1>
        <p className="text-sm text-zinc-300">
          Supervisa partners, usuarios y accesos críticos con el mismo tono sobrio que el panel operativo. Mantén la dirección visual uniforme.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {adminHighlights.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
            <p className="text-xs text-zinc-400">{item.delta}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4 rounded-2xl border border-white/10 bg-[#03050b]/80 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">Estado del sistema</p>
            <h2 className="text-xl font-semibold text-white">Señales clave</h2>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[0.7rem] uppercase tracking-[0.3em] text-white transition hover:border-white/40"
          >
            Generar informe
            <FiArrowRight className="h-3 w-3" />
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {adminSignals.map((signal) => (
            <div key={signal.label} className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">{signal.label}</p>
                <StatusBadge label={signal.tone === "warning" ? "Alerta" : signal.tone === "positive" ? "Listo" : "Info"} tone={signal.tone} />
              </div>
              <p className="mt-3 text-2xl font-semibold text-white">{signal.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
