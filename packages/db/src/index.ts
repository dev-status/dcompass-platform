import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"]
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export type DbClient = PrismaClient;

export async function checkDbConnection() {
  await prisma.$queryRaw`SELECT 1`;
  return { ok: true };
}

export async function closeDbConnection() {
  await prisma.$disconnect();
}
