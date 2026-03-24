import { AdminHomeShell } from "@/components/partners-shell";
import { requireSession } from "@/lib/auth/session";

export default async function AdminPage() {
  const session = await requireSession("admin");

  return <AdminHomeShell fullName={session.user.fullName} email={session.user.email} canAccessPartner={session.roles.includes("partner")} />;
}
