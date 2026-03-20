"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import { getCurrentSessionFromFirebaseUserIdToken, loginAndSync, logout, signUpAndSync, watchFirebaseAuthState } from "@/lib/auth";
import { AuthSessionNotFoundError } from "@/lib/auth-api";

export interface AppUser {
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
}

interface LoginInput {
  email: string;
  password: string;
}

interface SignupInput extends LoginInput {
  fullName: string;
}

export type AuthLoadingState = "idle" | "restoring" | "login" | "signup" | "logout";

interface AuthContextValue {
  firebaseUser: FirebaseUser | null;
  appUser: AppUser | null;
  loading: boolean;
  loadingState: AuthLoadingState;
  login: (input: LoginInput) => Promise<void>;
  signup: (input: SignupInput) => Promise<void>;
  logout: () => Promise<void>;
  setAppUser: (user: AppUser | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [appUser, internalSetAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingState, setLoadingState] = useState<AuthLoadingState>("restoring");
  const authBootstrapInFlightRef = useRef(false);

  useEffect(() => {
    const unsubscribe = watchFirebaseAuthState(async (nextFirebaseUser) => {
      setFirebaseUser(nextFirebaseUser);

      if (authBootstrapInFlightRef.current) {
        return;
      }

      setLoading(true);
      setLoadingState("restoring");

      if (!nextFirebaseUser) {
        internalSetAppUser(null);
        setLoading(false);
        setLoadingState("idle");
        return;
      }

      try {
        const idToken = await nextFirebaseUser.getIdToken();
        const session = await getCurrentSessionFromFirebaseUserIdToken(idToken);
        internalSetAppUser(session.user);
      } catch (error) {
        if (error instanceof AuthSessionNotFoundError) {
          internalSetAppUser(null);
        } else {
          console.error("Failed to restore auth session", error);
        }
      } finally {
        setLoading(false);
        setLoadingState("idle");
      }
    });

    return unsubscribe;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      firebaseUser,
      appUser,
      loading,
      loadingState,
      login: async (input) => {
        authBootstrapInFlightRef.current = true;
        setLoading(true);
        setLoadingState("login");
        try {
          const session = await loginAndSync(input);
          internalSetAppUser(session.user);
        } finally {
          authBootstrapInFlightRef.current = false;
          setLoading(false);
          setLoadingState("idle");
        }
      },
      signup: async (input) => {
        authBootstrapInFlightRef.current = true;
        setLoading(true);
        setLoadingState("signup");
        try {
          const session = await signUpAndSync(input);
          internalSetAppUser(session.user);
        } finally {
          authBootstrapInFlightRef.current = false;
          setLoading(false);
          setLoadingState("idle");
        }
      },
      logout: async () => {
        setLoading(true);
        setLoadingState("logout");
        try {
          await logout();
          setFirebaseUser(null);
          internalSetAppUser(null);
        } finally {
          setLoading(false);
          setLoadingState("idle");
        }
      },
      setAppUser: (user) => {
        internalSetAppUser(user);
      }
    }),
    [appUser, firebaseUser, loading, loadingState]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
