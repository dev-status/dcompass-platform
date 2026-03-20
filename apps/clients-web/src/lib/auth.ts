import { FirebaseError } from "firebase/app";
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

function mapFirebaseAuthError(error: unknown) {
  if (!(error instanceof FirebaseError)) {
    return error instanceof Error ? error : new Error("Ocurrió un error inesperado. Intenta de nuevo.");
  }

  const messagesByCode: Record<string, string> = {
    "auth/email-already-in-use": "Ese correo ya está registrado. Intenta iniciar sesión.",
    "auth/invalid-email": "El correo no es válido. Revísalo e intenta de nuevo.",
    "auth/user-not-found": "No encontramos una cuenta con ese correo.",
    "auth/wrong-password": "La contraseña no es correcta.",
    "auth/invalid-credential": "Las credenciales no son válidas. Revisa tu correo y contraseña.",
    "auth/weak-password": "La contraseña es demasiado débil. Usa una más segura.",
    "auth/too-many-requests": "Hiciste demasiados intentos. Espera un momento e intenta de nuevo.",
    "auth/network-request-failed": "No pudimos conectarnos. Revisa tu conexión e intenta de nuevo.",
    "auth/user-disabled": "Esta cuenta fue deshabilitada. Contacta a soporte si lo necesitas."
  };

  return new Error(messagesByCode[error.code] ?? "No pudimos procesar el acceso. Intenta de nuevo.");
}

export async function signUpAndSync(input: SignUpWithEmailInput): Promise<SessionResponse> {
  try {
    const credential = await signUpWithEmail(firebaseEnv, {
      email: input.email,
      password: input.password
    });
    const idToken = await credential.user.getIdToken();
    return createAuthSession({
      idToken,
      fullName: input.fullName
    });
  } catch (error) {
    throw mapFirebaseAuthError(error);
  }
}

export async function loginAndSync(input: LoginWithEmailInput): Promise<SessionResponse> {
  try {
    const credential = await loginWithEmail(firebaseEnv, input);
    const idToken = await credential.user.getIdToken();
    return createAuthSession({ idToken });
  } catch (error) {
    throw mapFirebaseAuthError(error);
  }
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
