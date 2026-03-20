import {
  loginWithEmail,
  logoutClient,
  signUpWithEmail,
  subscribeToAuthState,
  type LoginWithEmailInput,
  type SignUpWithEmailInput,
  type SessionResponse
} from "@dcompass/auth/client";
import { createAuthSession, getCurrentAuthSession } from "@/lib/auth-api";
import { firebaseEnv } from "@/lib/firebase/config";

export async function signUpAndSync(input: SignUpWithEmailInput): Promise<SessionResponse> {
  const credential = await signUpWithEmail(firebaseEnv, {
    email: input.email,
    password: input.password
  });
  const idToken = await credential.user.getIdToken();
  return createAuthSession({
    idToken,
    fullName: input.fullName
  });
}

export async function loginAndSync(input: LoginWithEmailInput): Promise<SessionResponse> {
  const credential = await loginWithEmail(firebaseEnv, input);
  const idToken = await credential.user.getIdToken();
  return createAuthSession({ idToken });
}

export async function logout(): Promise<void> {
  await logoutClient(firebaseEnv);
}

export async function getCurrentSessionFromFirebaseUserIdToken(idToken: string): Promise<SessionResponse> {
  return getCurrentAuthSession(idToken);
}

export function watchFirebaseAuthState(callback: Parameters<typeof subscribeToAuthState>[1]) {
  return subscribeToAuthState(firebaseEnv, callback);
}
