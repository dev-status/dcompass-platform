import { z } from "zod";

const appEnvSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().default("DCompass"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development")
});

export type AppEnv = z.infer<typeof appEnvSchema>;

export function getAppConfig(env: Partial<NodeJS.ProcessEnv> = process.env): AppEnv {
  return appEnvSchema.parse(env);
}

export const APP_FEATURE_FLAGS = {
  analytics: false,
  experimentalScanner: true
};
