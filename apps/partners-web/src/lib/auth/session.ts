import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserRole, type UserRoleAssignment } from "@prisma/client";
import { verifyFirebaseIdToken } from "@dcompass/auth/server";
import { getAuthenticatedUser, prisma } from "@dcompass/db";

export const SESSION_COOKIE_NAME = "dcompass_partners_session";

export type AppRole = Extract<UserRole, "partner" | "admin">;

export interface AuthenticatedSession {
  token: string;
  user: {
    id: string;
    firebaseUid: string;
    email: string;
    fullName: string;
  };
  roles: AppRole[];
  primaryRole: AppRole;
}

function getFirebaseAdminEnv() {
  return {
    FIREBASE_ADMIN_PROJECT_ID: process.env.FIREBASE_ADMIN_PROJECT_ID,
    FIREBASE_ADMIN_CLIENT_EMAIL: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    FIREBASE_ADMIN_PRIVATE_KEY: process.env.FIREBASE_ADMIN_PRIVATE_KEY
  };
}

function isAllowedRole(role: UserRole): role is AppRole {
  return role === UserRole.partner || role === UserRole.admin;
}

export async function resolveSessionFromToken(token: string): Promise<AuthenticatedSession | null> {
  try {
    const decoded = await verifyFirebaseIdToken(getFirebaseAdminEnv(), token);
    const user = await getAuthenticatedUser({
      firebaseUid: decoded.uid,
      email: decoded.email ?? null
    });

    if (!user || !user.firebaseUid) {
      return null;
    }

    const assignments = await prisma.userRoleAssignment.findMany({
      where: {
        userId: user.id,
        status: "active"
      },
      orderBy: {
        grantedAt: "asc"
      }
    });

    const roles = assignments.map((assignment: UserRoleAssignment) => assignment.role).filter(isAllowedRole);

    if (roles.length === 0) {
      return null;
    }

    const primaryRole = roles.includes(UserRole.admin) ? UserRole.admin : UserRole.partner;

    return {
      token,
      user: {
        id: user.id,
        firebaseUid: user.firebaseUid,
        email: user.email,
        fullName: user.fullName
      },
      roles,
      primaryRole
    };
  } catch {
    return null;
  }
}

export async function getCurrentSession(): Promise<AuthenticatedSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return resolveSessionFromToken(token);
}

export async function requireSession(requiredRole?: AppRole) {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/login");
  }

  if (requiredRole && !session.roles.includes(requiredRole)) {
    redirect(`/unauthorized?requiredRole=${requiredRole}`);
  }

  return session;
}
