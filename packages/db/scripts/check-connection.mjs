import prismaPkg from "@prisma/client";

const { PrismaClient } = prismaPkg;
const prisma = new PrismaClient();

try {
  await prisma.$queryRaw`SELECT 1`;
  console.log("[dcompass/db] connection ok");
} catch (error) {
  console.error("[dcompass/db] connection failed");
  console.error(error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
