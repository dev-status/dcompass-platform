"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import { getCurrentSessionFromFirebaseUserIdToken, loginAndSync, logout, signUpAndSync, watchFirebaseAuthState } from "@/lib/auth";

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
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingState, setLoadingState] = useState<AuthLoadingState>("restoring");

  useEffect(() => {
    const unsubscribe = watchFirebaseAuthState(async (nextFirebaseUser) => {
      setLoading(true);
      setLoadingState("restoring");
      setFirebaseUser(nextFirebaseUser);

      if (!nextFirebaseUser) {
        setAppUser(null);
        setLoading(false);
        setLoadingState("idle");
        return;
      }

      try {
        const idToken = await nextFirebaseUser.getIdToken();
        const session = await getCurrentSessionFromFirebaseUserIdToken(idToken);
        setAppUser(session.user);
      } catch (error) {
        console.error("Failed to restore auth session", error);
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
        setLoading(true);
        setLoadingState("login");
        try {
          const session = await loginAndSync(input);
          setAppUser(session.user);
        } finally {
          setLoading(false);
          setLoadingState("idle");
        }
      },
      signup: async (input) => {
        setLoading(true);
        setLoadingState("signup");
        try {
          const session = await signUpAndSync(input);
          setAppUser(session.user);
        } finally {
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
          setAppUser(null);
        } finally {
          setLoading(false);
          setLoadingState("idle");
        }
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
