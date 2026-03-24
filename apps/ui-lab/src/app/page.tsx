import Link from "next/link";

const screens = [
  { href: "/ticket-selection", title: "Ticket selection", description: "Inicio del flujo de compra / selección de boletos" },
  { href: "/checkout", title: "Checkout", description: "Continuar compra para usuario ya autenticado" },
  { href: "/partners-login", title: "Partners login", description: "Propuesta desktop-first para la pantalla de acceso a partners-web" },
  { href: "/partners-home", title: "Partners home", description: "Propuesta de consola principal con sidebar colapsable, cabecera operativa y adaptación mobile" },
  { href: "/admin-login", title: "Admin login", description: "Propuesta desktop-first para el acceso al panel administrativo" },
  { href: "/admin-home", title: "Admin home", description: "Propuesta de consola de control global con módulos administrativos y alertas del sistema" }
];

export default function Page() {
  return (
    <main className="min-h-screen bg-[#020308] px-6 py-10 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-3">
          <p className="text-sm tracking-[0.12em] text-zinc-400">DCompass UI Lab</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Pantallas congeladas del lab</h1>
          <p className="max-w-2xl text-base leading-relaxed text-zinc-300">
            A partir de ahora cada pantalla aprobada vive en su propia ruta para no moverle el piso a Luca mientras implementa.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {screens.map((screen) => (
            <Link
              key={screen.href}
              href={screen.href}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              <p className="text-xl font-semibold text-white">{screen.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{screen.description}</p>
              <p className="mt-4 text-sm text-violet-300">{screen.href}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
