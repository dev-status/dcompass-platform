import { PartnersHomeShell } from "@/components/partners-shell";
import { requireSession } from "@/lib/auth/session";

export default async function PartnerPage() {
  const session = await requireSession("partner");

  return <PartnersHomeShell fullName={session.user.fullName} email={session.user.email} canAccessAdmin={session.roles.includes("admin")} />;
}
