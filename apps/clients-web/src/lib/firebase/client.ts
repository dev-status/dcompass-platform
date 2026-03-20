import { getFirebaseClientAuth, ensureFirebaseApp } from "@dcompass/auth/client";
import { getStorage } from "firebase/storage";
import { firebaseEnv } from "./config";

export const firebaseApp = ensureFirebaseApp(firebaseEnv);
export const firebaseAuth = getFirebaseClientAuth(firebaseEnv);
export const firebaseStorage = getStorage(firebaseApp);
