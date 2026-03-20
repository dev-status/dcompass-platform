import axios from "axios";
import { http } from "@/lib/http";
import type { SessionResponse } from "@dcompass/auth/client";

export async function createAuthSession(idToken: string): Promise<SessionResponse> {
  try {
    const response = await http.post<SessionResponse>("/auth/session", { idToken });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<{ error?: string }>(error)) {
      throw new Error(error.response?.data?.error ?? "No se pudo sincronizar la sesión.");
    }

    throw error;
  }
}
