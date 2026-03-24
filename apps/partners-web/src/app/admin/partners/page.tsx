import { requireSession } from "@/lib/auth/session";
import AdminPartnersView from "./view";

export default async function AdminPartnersPage() {
  const session = await requireSession("admin");

  return <AdminPartnersView fullName={session.user.fullName} email={session.user.email} />;
}
