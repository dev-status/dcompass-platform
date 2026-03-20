import axios from "axios";
import { http } from "@/lib/http";
import type { SessionResponse } from "@dcompass/auth/client";

interface CreateAuthSessionInput {
  idToken: string;
  fullName?: string;
}

export async function createAuthSession(input: CreateAuthSessionInput): Promise<SessionResponse> {
  try {
    const response = await http.post<SessionResponse>("/auth/session", input);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<{ error?: string }>(error)) {
      throw new Error(error.response?.data?.error ?? "No se pudo sincronizar la sesión.");
    }

    throw error;
  }
}

export async function getCurrentAuthSession(idToken: string): Promise<SessionResponse> {
  try {
    const response = await http.get<SessionResponse>("/auth/session", {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError<{ error?: string }>(error)) {
      throw new Error(error.response?.data?.error ?? "No se pudo obtener la sesión actual.");
    }

    throw error;
  }
}
