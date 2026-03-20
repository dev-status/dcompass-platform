import { UserStatus, type Prisma, type User } from "@prisma/client";
import { prisma } from "./index";

export interface SyncFirebaseUserInput {
  firebaseUid: string;
  email: string;
  emailVerified: boolean;
  fullName: string;
  phone?: string | null;
  avatarUrl?: string | null;
}

export async function syncFirebaseUser(input: SyncFirebaseUserInput): Promise<User> {
  const normalizedEmail = input.email.trim().toLowerCase();

  return prisma.user.upsert({
    where: { email: normalizedEmail },
    update: {
      firebaseUid: input.firebaseUid,
      emailVerified: input.emailVerified,
      fullName: input.fullName,
      phone: input.phone ?? null,
      avatarUrl: input.avatarUrl ?? null,
      lastLoginAt: new Date(),
      status: UserStatus.active
    },
    create: {
      firebaseUid: input.firebaseUid,
      email: normalizedEmail,
      emailVerified: input.emailVerified,
      fullName: input.fullName,
      phone: input.phone ?? null,
      avatarUrl: input.avatarUrl ?? null,
      lastLoginAt: new Date(),
      status: UserStatus.active
    }
  });
}

export async function getCurrentUserByFirebaseUid(firebaseUid: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { firebaseUid }
  });
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const normalizedEmail = email.trim().toLowerCase();

  return prisma.user.findUnique({
    where: { email: normalizedEmail }
  });
}

export async function getAuthenticatedUser(params: {
  firebaseUid: string;
  email?: string | null;
}): Promise<User | null> {
  const byFirebaseUid = await getCurrentUserByFirebaseUid(params.firebaseUid);

  if (byFirebaseUid) {
    return byFirebaseUid;
  }

  if (params.email?.trim()) {
    return findUserByEmail(params.email);
  }

  return null;
}

export async function listUsers(args?: Prisma.UserFindManyArgs): Promise<User[]> {
  return prisma.user.findMany(args);
}
