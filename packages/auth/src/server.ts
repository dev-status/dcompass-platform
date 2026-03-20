import { cert, getApps, initializeApp, type App as FirebaseAdminApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { z } from "zod";

export const firebaseAdminEnvSchema = z.object({
  FIREBASE_ADMIN_PROJECT_ID: z.string().min(1),
  FIREBASE_ADMIN_CLIENT_EMAIL: z.string().min(1),
  FIREBASE_ADMIN_PRIVATE_KEY: z.string().min(1)
});

export type FirebaseAdminEnv = z.infer<typeof firebaseAdminEnvSchema>;

function normalizePrivateKey(privateKey: string) {
  return privateKey.replace(/\\n/g, "\n");
}

export function ensureFirebaseAdminApp(env: Partial<FirebaseAdminEnv>): FirebaseAdminApp {
  const apps = getApps();
  if (apps.length > 0) {
    return apps[0]!;
  }

  const sanitized = firebaseAdminEnvSchema.parse(env);

  return initializeApp({
    credential: cert({
      projectId: sanitized.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: sanitized.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: normalizePrivateKey(sanitized.FIREBASE_ADMIN_PRIVATE_KEY)
    })
  });
}

export function getFirebaseAdminAuth(env: Partial<FirebaseAdminEnv>) {
  return getAuth(ensureFirebaseAdminApp(env));
}

export async function verifyFirebaseIdToken(env: Partial<FirebaseAdminEnv>, idToken: string) {
  const adminAuth = getFirebaseAdminAuth(env);
  return adminAuth.verifyIdToken(idToken);
}
