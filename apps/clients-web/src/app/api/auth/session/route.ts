import { z } from "zod";
import { verifyFirebaseIdToken, type FirebaseAdminEnv } from "@dcompass/auth/server";
import { getAuthenticatedUser, syncFirebaseUser } from "@dcompass/db";
import { createRouteHandler } from "@/lib/server/create-route-handler";
import { HttpError } from "@/lib/server/http-errors";

export const runtime = "nodejs";

const firebaseAdminEnv: Partial<FirebaseAdminEnv> = {
  FIREBASE_ADMIN_PROJECT_ID: process.env.FIREBASE_ADMIN_PROJECT_ID,
  FIREBASE_ADMIN_CLIENT_EMAIL: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  FIREBASE_ADMIN_PRIVATE_KEY: process.env.FIREBASE_ADMIN_PRIVATE_KEY
};

const postRequestSchema = z.object({
  idToken: z.string().min(1),
  fullName: z.string().trim().min(1).optional()
});

function buildFullName(input: {
  fullName?: string;
  decodedName?: string;
  email?: string;
}) {
  if (input.fullName?.trim()) {
    return input.fullName.trim();
  }

  if (input.decodedName?.trim()) {
    return input.decodedName.trim();
  }

  if (input.email?.trim()) {
    return input.email.split("@")[0] ?? "Usuario DCompass";
  }

  return "Usuario DCompass";
}

function serializeUser(user: Awaited<ReturnType<typeof syncFirebaseUser>>) {
  return {
    ...user,
    lastLoginAt: user.lastLoginAt?.toISOString() ?? null,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString()
  };
}

function getBearerToken(request: Request) {
  const authorization = request.headers.get("authorization") ?? "";

  if (!authorization.startsWith("Bearer ")) {
    throw new HttpError(401, "Falta el bearer token.");
  }

  const token = authorization.slice("Bearer ".length).trim();

  if (!token) {
    throw new HttpError(401, "Bearer token inválido.");
  }

  return token;
}

export const POST = createRouteHandler({
  bodySchema: postRequestSchema,
  requireJson: true,
  requireRequestedWith: true,
  rateLimit: {
    windowMs: 60_000,
    maxRequests: 20
  },
  handler: async ({ body }) => {
    const decodedToken = await verifyFirebaseIdToken(firebaseAdminEnv, body.idToken);

    if (!decodedToken.uid || !decodedToken.email) {
      throw new HttpError(400, "Token de Firebase incompleto.");
    }

    const user = await syncFirebaseUser({
      firebaseUid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: Boolean(decodedToken.email_verified),
      fullName: buildFullName({
        fullName: body.fullName,
        decodedName: decodedToken.name,
        email: decodedToken.email
      }),
      phone: decodedToken.phone_number ?? null,
      avatarUrl: decodedToken.picture ?? null
    });

    return {
      user: serializeUser(user)
    };
  }
});

export const GET = createRouteHandler({
  requireRequestedWith: true,
  rateLimit: {
    windowMs: 60_000,
    maxRequests: 60
  },
  handler: async ({ request }) => {
    const idToken = getBearerToken(request);
    const decodedToken = await verifyFirebaseIdToken(firebaseAdminEnv, idToken);

    if (!decodedToken.uid) {
      throw new HttpError(400, "Token de Firebase incompleto.");
    }

    const user = await getAuthenticatedUser({
      firebaseUid: decodedToken.uid,
      email: decodedToken.email
    });

    if (!user) {
      throw new HttpError(404, "Usuario no encontrado.");
    }

    return {
      user: serializeUser(user)
    };
  }
});
