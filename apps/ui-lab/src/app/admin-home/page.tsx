"use client";

import Image from "next/image";
import { useState } from "react";
import { brandAssets, colors } from "@dcompass/ui";
import {
  FiActivity,
  FiBarChart2,
  FiChevronLeft,
  FiChevronRight,
  FiFileText,
  FiHome,
  FiMenu,
  FiSearch,
  FiSettings,
  FiShield,
  FiSliders,
  FiUsers,
  FiX
} from "react-icons/fi";

const adminSidebarItems = [
  { label: "Inicio", icon: FiHome, active: true },
  { label: "Usuarios", icon: FiUsers },
  { label: "Partners", icon: FiShield },
  { label: "Eventos", icon: FiActivity },
  { label: "Órdenes", icon: FiFileText },
  { label: "Accesos", icon: FiActivity },
  { label: "Roles", icon: FiSliders },
  { label: "Configuración", icon: FiSettings },
  { label: "Auditoría", icon: FiBarChart2 }
];

const globalMetrics = [
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

const quickModules = [
  "Usuarios",
  "Partners",
  "Eventos",
  "Órdenes",
  "Accesos",
  "Roles",
  "Configuración",
  "Auditoría"
];

function AdminAvatar() {
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

export default function AdminHomePage() {
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
                  placeholder="Buscar usuarios, partners o eventos"
                  className="w-full rounded-full border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-white/25"
                />
              </div>

              <div className="ml-auto flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold text-white">Jesús Romero</p>
                  <p className="text-xs text-zinc-400">Administrador</p>
                </div>
                <AdminAvatar />
              </div>
            </div>
          </header>

          <div className="flex-1 px-5 py-6 sm:px-6 lg:overflow-y-auto lg:px-8 lg:py-8">
            <div className="space-y-8">
              <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-2">
                  <p className="text-[0.8rem] tracking-[0.14em] text-zinc-500">CENTRO DE CONTROL</p>
                  <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Visión global del sistema.</h1>
                  <p className="max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                    Supervisa usuarios, partners, actividad operativa y decisiones críticas desde un solo lugar.
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[0.9rem] font-semibold text-white shadow-[0_18px_45px_rgba(130,89,208,0.35)] transition hover:brightness-110"
                  style={{ background: colors.accent }}
                >
                  Revisar incidencias
                  <FiChevronRight className="text-sm" />
                </button>
              </section>

              <section className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
                {globalMetrics.map((metric) => (
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
                    <button type="button" className="text-sm font-medium text-zinc-300 transition hover:text-white">
                      Ver actividad
                    </button>
                  </div>

                  <div className="mt-6 space-y-4">
                    {adminAlerts.map((alert) => (
                      <div key={alert.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-base font-semibold text-white">{alert.title}</p>
                            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{alert.detail}</p>
                          </div>
                          <span className="inline-flex rounded-full border border-white/10 px-3 py-1 text-[0.72rem] tracking-[0.08em] text-zinc-200">
                            {alert.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] sm:p-8">
                  <p className="text-sm font-medium text-zinc-400">Módulos ADMIN</p>
                  <h2 className="mt-1 text-2xl font-semibold text-white">Áreas de control</h2>

                  <div className="mt-6 grid gap-3">
                    {quickModules.map((module) => (
                      <button
                        key={module}
                        type="button"
                        className="flex cursor-pointer items-center justify-between rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm text-zinc-300 transition hover:border-white/20 hover:text-white"
                      >
                        <span>{module}</span>
                        <FiChevronRight className="text-sm text-zinc-500" />
                      </button>
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
