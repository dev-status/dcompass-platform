export type DbClient = {
  query: (statement: string) => Promise<unknown>;
  close: () => Promise<void>;
};

export function createDbClient(): DbClient {
  return {
    query: async (statement: string) => {
      console.warn(
        "[dcompass/db] Prisma client not yet initialized. Queryed", statement,
        "(placeholder result)"
      );
      return [];
    },
    close: async () => {
      console.warn("[dcompass/db] closing placeholder client");
    }
  };
}

export const DB_PLACEHOLDER_NOTE =
  "Switch this file to import PrismaClient from @prisma/client and run `pnpm db:generate` once the schema is stabilized.";
