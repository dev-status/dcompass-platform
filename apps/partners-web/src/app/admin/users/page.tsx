import { requireSession } from "@/lib/auth/session";
import AdminUsersView from "./view";

export default async function AdminUsersPage() {
  const session = await requireSession("admin");

  return <AdminUsersView fullName={session.user.fullName} email={session.user.email} />;
}
