import {
  type FirebaseEnv,
  loginWithEmail,
  logoutClient,
  signUpWithEmail,
  subscribeToAuthState,
  type LoginWithEmailInput,
  type SignUpWithEmailInput,
  type SessionResponse
} from "@dcompass/auth/client";

const firebaseEnv: Partial<FirebaseEnv> = {
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

async function syncCurrentSession(idToken: string): Promise<SessionResponse> {
  const response = await fetch("/api/auth/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ idToken })
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(payload?.error ?? "No se pudo sincronizar la sesión.");
  }

  return (await response.json()) as SessionResponse;
}

export async function signUpAndSync(input: SignUpWithEmailInput): Promise<SessionResponse> {
  const credential = await signUpWithEmail(firebaseEnv, input);
  const idToken = await credential.user.getIdToken();
  return syncCurrentSession(idToken);
}

export async function loginAndSync(input: LoginWithEmailInput): Promise<SessionResponse> {
  const credential = await loginWithEmail(firebaseEnv, input);
  const idToken = await credential.user.getIdToken();
  return syncCurrentSession(idToken);
}

export async function logout(): Promise<void> {
  await logoutClient(firebaseEnv);
}

export async function syncSessionFromFirebaseUserIdToken(idToken: string): Promise<SessionResponse> {
  return syncCurrentSession(idToken);
}

export function watchFirebaseAuthState(callback: Parameters<typeof subscribeToAuthState>[1]) {
  return subscribeToAuthState(firebaseEnv, callback);
}
