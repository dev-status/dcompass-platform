import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { z } from "zod";

export const firebaseEnvSchema = z.object({
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().optional(),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().optional(),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().optional(),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().optional()
});

export type FirebaseEnv = z.infer<typeof firebaseEnvSchema>;

export function buildFirebaseOptions(env: Partial<FirebaseEnv>): FirebaseOptions {
  const sanitized = firebaseEnvSchema.parse(env);
  return {
    apiKey: sanitized.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
    authDomain: sanitized.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
    projectId: sanitized.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
    appId: sanitized.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
    storageBucket: sanitized.NEXT_PUBLIC_FIREBASE_PROJECT_ID
      ? `${sanitized.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`
      : ""
  };
}

let cachedApp: FirebaseApp | null = null;

export function ensureFirebaseApp(env: Partial<FirebaseEnv>): FirebaseApp {
  if (!cachedApp) {
    const options = buildFirebaseOptions(env);
    cachedApp = initializeApp(options);
  }
  return cachedApp;
}

export function getFirebaseAuth(app: FirebaseApp): Auth {
  return getAuth(app);
}
