import { HttpError } from "./http-errors";

export interface RateLimitConfig {
  key: string;
  windowMs: number;
  maxRequests: number;
}

const globalForRateLimit = globalThis as typeof globalThis & {
  dcompassRateLimitStore?: Map<string, number[]>;
};

const rateLimitStore = globalForRateLimit.dcompassRateLimitStore ?? new Map<string, number[]>();
globalForRateLimit.dcompassRateLimitStore = rateLimitStore;

export function enforceRateLimit(config: RateLimitConfig) {
  const now = Date.now();
  const storeKey = `${config.key}:${config.windowMs}:${config.maxRequests}`;
  const currentWindow = (rateLimitStore.get(storeKey) ?? []).filter(
    (timestamp) => now - timestamp < config.windowMs
  );

  if (currentWindow.length >= config.maxRequests) {
    rateLimitStore.set(storeKey, currentWindow);
    throw new HttpError(429, "Demasiadas solicitudes. Intenta de nuevo en un momento.");
  }

  currentWindow.push(now);
  rateLimitStore.set(storeKey, currentWindow);
}
