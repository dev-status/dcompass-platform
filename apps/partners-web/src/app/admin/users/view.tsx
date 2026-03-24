"use client";

import Image from "next/image";
import { useState } from "react";
import { brandAssets, colors } from "@dcompass/ui";
import {
  FiActivity,
  FiBarChart2,
  FiChevronLeft,
  FiEdit3,
  FiFileText,
  FiFilter,
  FiHome,
  FiMenu,
  FiMoreHorizontal,
  FiPlus,
  FiSearch,
  FiSettings,
  FiShield,
  FiSliders,
  FiUsers,
  FiX
} from "react-icons/fi";

const adminSidebarItems = [
  { label: "Inicio", icon: FiHome },
  { label: "Usuarios", icon: FiUsers, active: true },
  { label: "Partners", icon: FiShield },
  { label: "Eventos", icon: FiActivity },
  { label: "Órdenes", icon: FiFileText },
  { label: "Accesos", icon: FiActivity },
  { label: "Roles", icon: FiSliders },
  { label: "Configuración", icon: FiSettings },
  { label: "Auditoría", icon: FiBarChart2 }
];

const userMetrics = [
  { label: "Usuarios activos", value: "18,240", note: "+124 hoy" },
  { label: "Admins", value: "14", note: "2 con acceso nuevo" },
  { label: "Partners con acceso", value: "126", note: "5 pendientes" },
  { label: "Scanners activos", value: "49", note: "8 en eventos hoy" }
];

const users = [
  {
    name: "Jesús Romero",
    email: "jesus@dcompass.mx",
    role: "Admin",
    status: "Activo",
    context: "Core operations",
    lastAccess: "Hoy · 08:42"
  },
  {
    name: "Andrea Salazar",
    email: "andrea@partner.mx",
    role: "Partner",
    status: "Activo",
    context: "Casa Aurora",
    lastAccess: "Hoy · 07:58"
  },
  {
    name: "Luis Ortega",
    email: "luis@scanner.mx",
    role: "Scanner",
    status: "Activo",
    context: "Foro Juárez",
    lastAccess: "Hoy · 09:14"
  },
  {
    name: "Mariana Cruz",
    email: "mariana@partner.mx",
    role: "Partner",
    status: "Pendiente",
    context: "Noches en Supra",
    lastAccess: "Ayer · 18:03"
  },
  {
    name: "Daniel Ríos",
    email: "daniel@ops.mx",
    role: "Admin",
    status: "Suspendido",
    context: "Finance / audits",
    lastAccess: "Vie · 11:26"
  }
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((token) => token.trim()[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function AdminAvatar({ name }: { name: string }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-sm font-semibold text-white">
      {getInitials(name)}
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
    <aside className={`flex h-full flex-col border-r border-white/10 bg-[#050711] ${collapsed ? "w-[5.4rem]" : "w-[18rem]"} transition-[width] duration-300 ease-out`}>
      <div className="flex items-center justify-between gap-3 border-b border-white/8 px-4 py-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <Image src={brandAssets.mainLogo} alt="DCompass" width={40} height={40} className="h-10 w-10 shrink-0 rounded-xl object-contain" />
          {!collapsed ? (
            <div className="min-w-0">
              <Image src={brandAssets.lettersLogo} alt="DCOMPASS" width={150} height={28} className="h-4 w-auto" />
              <p className="mt-1 text-[0.68rem] tracking-[0.18em] text-zinc-500">ADMIN</p>
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
        {adminSidebarItems.map((item) => {
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

function StatusPill({ label }: { label: string }) {
  const tone =
    label === "Activo"
      ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
      : label === "Pendiente"
        ? "border-amber-400/30 bg-amber-500/10 text-amber-200"
        : "border-rose-400/30 bg-rose-500/10 text-rose-200";

  return <span className={`inline-flex rounded-full border px-3 py-1 text-[0.72rem] tracking-[0.08em] ${tone}`}>{label}</span>;
}

type AdminUsersViewProps = {
  fullName: string;
  email: string;
};

export default function AdminUsersView({ fullName, email }: AdminUsersViewProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#020308] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_42%)] blur-3xl" />
        <div className="absolute left-0 top-0 h-[28rem] w-[28rem] bg-[radial-gradient(circle,_rgba(130,89,208,0.18),_transparent_62%)]" />
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
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-200 transition hover:text-white lg:hidden"
                aria-label="Abrir menú"
              >
                <FiMenu />
              </button>

              <div className="relative hidden max-w-md flex-1 lg:block">
                <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Buscar usuarios por nombre, correo o rol"
                  className="w-full rounded-full border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-white/25"
                />
              </div>

              <div className="ml-auto flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold text-white">{fullName}</p>
                  <p className="text-xs text-zinc-400">{email}</p>
                </div>
                <AdminAvatar name={fullName} />
              </div>
            </div>
          </header>

          <div className="flex-1 px-5 py-6 sm:px-6 lg:overflow-y-auto lg:px-8 lg:py-8">
            <div className="space-y-8">
              <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-2">
                  <p className="text-[0.8rem] tracking-[0.14em] text-zinc-500">ADMIN · USUARIOS</p>
                  <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Gestión de usuarios.</h1>
                  <p className="max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">Administra cuentas, revisa accesos y controla el estado operativo de usuarios internos, partners y scanners.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button type="button" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-zinc-200 transition hover:text-white">
                    <FiFilter className="text-sm" />
                    Filtros
                  </button>
                  <button type="button" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[0.9rem] font-semibold text-white shadow-[0_18px_45px_rgba(130,89,208,0.35)] transition hover:brightness-110" style={{ background: colors.accent }}>
                    <FiPlus className="text-sm" />
                    Nuevo usuario
                  </button>
                </div>
              </section>

              <section className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
                {userMetrics.map((metric) => (
                  <article key={metric.label} className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
                    <p className="text-sm font-medium text-zinc-400">{metric.label}</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{metric.value}</p>
                    <p className="mt-2 text-sm text-zinc-500">{metric.note}</p>
                  </article>
                ))}
              </section>

              <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
                <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] sm:p-8">
                  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="text-sm font-medium text-zinc-400">Directorio operativo</p>
                      <h2 className="mt-1 text-2xl font-semibold text-white">Usuarios recientes</h2>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs uppercase tracking-[0.14em] text-zinc-400">
                      256 resultados
                    </div>
                  </div>

                  <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#060913]">
                    <div className="hidden grid-cols-[1.3fr_0.8fr_0.85fr_0.8fr_0.7fr] gap-4 border-b border-white/10 px-5 py-4 text-[0.72rem] uppercase tracking-[0.14em] text-zinc-500 md:grid">
                      <span>Usuario</span>
                      <span>Rol</span>
                      <span>Contexto</span>
                      <span>Último acceso</span>
                      <span className="text-right">Acciones</span>
                    </div>

                    <div className="divide-y divide-white/8">
                      {users.map((user) => (
                        <div key={user.email} className="grid gap-4 px-5 py-4 md:grid-cols-[1.3fr_0.8fr_0.85fr_0.8fr_0.7fr] md:items-center">
                          <div>
                            <p className="text-sm font-semibold text-white">{user.name}</p>
                            <p className="mt-1 text-sm text-zinc-400">{user.email}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-zinc-200">{user.role}</span>
                            <StatusPill label={user.status} />
                          </div>
                          <p className="text-sm text-zinc-300">{user.context}</p>
                          <p className="text-sm text-zinc-400">{user.lastAccess}</p>
                          <div className="flex items-center justify-start gap-2 md:justify-end">
                            <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:text-white" aria-label={`Editar ${user.name}`}>
                              <FiEdit3 className="text-sm" />
                            </button>
                            <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:text-white" aria-label={`Más acciones para ${user.name}`}>
                              <FiMoreHorizontal className="text-sm" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>

                <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] sm:p-8">
                  <p className="text-sm font-medium text-zinc-400">Reglas rápidas</p>
                  <h2 className="mt-1 text-2xl font-semibold text-white">Controles de acceso</h2>
                  <div className="mt-6 space-y-4">
                    <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-sm font-semibold text-white">Altas pendientes</p>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">5 cuentas nuevas esperan revisión de rol antes de quedar activas en producción.</p>
                    </div>
                    <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-sm font-semibold text-white">Separación de funciones</p>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">Mantén separados accesos de admin, partner y scanner salvo cuentas internas explícitamente autorizadas.</p>
                    </div>
                    <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-sm font-semibold text-white">Auditoría</p>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">Todo cambio de rol debe quedar trazable con usuario otorgante, fecha y contexto operativo.</p>
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
