import { getFirebaseClientAuth } from "@dcompass/auth/client";
import { firebaseEnv } from "./config";

export const firebaseAuth = getFirebaseClientAuth(firebaseEnv);
