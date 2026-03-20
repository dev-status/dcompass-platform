import { FirebaseApp, FirebaseOptions, getApp, getApps, initializeApp } from "firebase/app";
import {
  type Auth,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User
} from "firebase/auth";
import { z } from "zod";

export const firebaseEnvSchema = z.object({
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1)
});

export type FirebaseEnv = z.infer<typeof firebaseEnvSchema>;

export interface LoginWithEmailInput {
  email: string;
  password: string;
}

export interface SignUpWithEmailInput extends LoginWithEmailInput {
  fullName: string;
}

export interface SessionResponse {
  user: {
    id: string;
    firebaseUid: string | null;
    email: string;
    emailVerified: boolean;
    fullName: string;
    phone: string | null;
    avatarUrl: string | null;
    lastLoginAt: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

export function buildFirebaseOptions(env: Partial<FirebaseEnv>): FirebaseOptions {
  const sanitized = firebaseEnvSchema.parse(env);

  return {
    apiKey: sanitized.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: sanitized.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: sanitized.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: sanitized.NEXT_PUBLIC_FIREBASE_APP_ID,
    storageBucket: `${sanitized.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`
  };
}

export function ensureFirebaseApp(env: Partial<FirebaseEnv>): FirebaseApp {
  const apps = getApps();
  if (apps.length > 0) {
    return getApp();
  }

  return initializeApp(buildFirebaseOptions(env));
}

export function getFirebaseAuth(app: FirebaseApp): Auth {
  return getAuth(app);
}

export function getFirebaseClientAuth(env: Partial<FirebaseEnv>): Auth {
  return getFirebaseAuth(ensureFirebaseApp(env));
}

export async function signUpWithEmail(env: Partial<FirebaseEnv>, input: LoginWithEmailInput) {
  const auth = getFirebaseClientAuth(env);
  return createUserWithEmailAndPassword(auth, input.email.trim(), input.password);
}

export async function loginWithEmail(env: Partial<FirebaseEnv>, input: LoginWithEmailInput) {
  const auth = getFirebaseClientAuth(env);
  return signInWithEmailAndPassword(auth, input.email.trim(), input.password);
}

export async function logoutClient(env: Partial<FirebaseEnv>) {
  const auth = getFirebaseClientAuth(env);
  await signOut(auth);
}

export function subscribeToAuthState(env: Partial<FirebaseEnv>, callback: (user: User | null) => void) {
  const auth = getFirebaseClientAuth(env);
  return onAuthStateChanged(auth, callback);
}
