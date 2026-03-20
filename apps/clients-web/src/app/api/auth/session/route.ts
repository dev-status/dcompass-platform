import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyFirebaseIdToken, type FirebaseAdminEnv } from "@dcompass/auth/server";
import { syncFirebaseUser } from "@dcompass/db";

export const runtime = "nodejs";

const firebaseAdminEnv: Partial<FirebaseAdminEnv> = {
  FIREBASE_ADMIN_PROJECT_ID: process.env.FIREBASE_ADMIN_PROJECT_ID,
  FIREBASE_ADMIN_CLIENT_EMAIL: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  FIREBASE_ADMIN_PRIVATE_KEY: process.env.FIREBASE_ADMIN_PRIVATE_KEY
};

const requestSchema = z.object({
  idToken: z.string().min(1)
});

const SESSION_RATE_LIMIT_WINDOW_MS = 60_000;
const SESSION_RATE_LIMIT_MAX_REQUESTS = 20;

const globalForRateLimit = globalThis as typeof globalThis & {
  dcompassAuthSessionRateLimit?: Map<string, number[]>;
};

const rateLimitStore = globalForRateLimit.dcompassAuthSessionRateLimit ?? new Map<string, number[]>();
globalForRateLimit.dcompassAuthSessionRateLimit = rateLimitStore;

function buildFullName(decodedToken: {
  name?: string;
  email?: string;
}) {
  if (decodedToken.name?.trim()) {
    return decodedToken.name.trim();
  }

  if (decodedToken.email?.trim()) {
    return decodedToken.email.split("@")[0] ?? "Usuario DCompass";
  }

  return "Usuario DCompass";
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(clientKey: string) {
  const now = Date.now();
  const currentWindow = (rateLimitStore.get(clientKey) ?? []).filter(
    (timestamp) => now - timestamp < SESSION_RATE_LIMIT_WINDOW_MS
  );

  if (currentWindow.length >= SESSION_RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(clientKey, currentWindow);
    return true;
  }

  currentWindow.push(now);
  rateLimitStore.set(clientKey, currentWindow);
  return false;
}

function isSupportedContentType(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  return contentType.toLowerCase().includes("application/json");
}

function isAllowedRequestedWith(request: Request) {
  const requestedWith = request.headers.get("x-requested-with");
  return requestedWith === null || requestedWith === "XMLHttpRequest";
}

export async function POST(request: Request) {
  try {
    if (!isSupportedContentType(request)) {
      return NextResponse.json({ error: "Content-Type inválido." }, { status: 415 });
    }

    if (!isAllowedRequestedWith(request)) {
      return NextResponse.json({ error: "Encabezado de solicitud inválido." }, { status: 400 });
    }

    const clientKey = getClientKey(request);
    if (isRateLimited(clientKey)) {
      return NextResponse.json({ error: "Demasiadas solicitudes. Intenta de nuevo en un momento." }, { status: 429 });
    }

    const parsed = requestSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Body inválido." }, { status: 400 });
    }

    const decodedToken = await verifyFirebaseIdToken(firebaseAdminEnv, parsed.data.idToken);

    if (!decodedToken.uid || !decodedToken.email) {
      return NextResponse.json({ error: "Token de Firebase incompleto." }, { status: 400 });
    }

    const user = await syncFirebaseUser({
      firebaseUid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: Boolean(decodedToken.email_verified),
      fullName: buildFullName(decodedToken),
      phone: decodedToken.phone_number ?? null,
      avatarUrl: decodedToken.picture ?? null
    });

    return NextResponse.json({
      user: {
        ...user,
        lastLoginAt: user.lastLoginAt?.toISOString() ?? null,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo crear la sesión.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
