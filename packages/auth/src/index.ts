export type {
  FirebaseEnv,
  LoginWithEmailInput,
  SessionResponse,
  SignUpWithEmailInput
} from "./client";

export {
  buildFirebaseOptions,
  ensureFirebaseApp,
  getFirebaseAuth,
  getFirebaseClientAuth,
  loginWithEmail,
  logoutClient,
  signUpWithEmail,
  subscribeToAuthState
} from "./client";

export type { FirebaseAdminEnv } from "./server";
export { ensureFirebaseAdminApp, getFirebaseAdminAuth, verifyFirebaseIdToken } from "./server";
