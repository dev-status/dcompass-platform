import { z } from "zod";
import { verifyFirebaseIdToken, type FirebaseAdminEnv } from "@dcompass/auth/server";
import { getAuthenticatedUser, updateUserProfileByFirebaseUid } from "@dcompass/db";
import { createRouteHandler } from "@/lib/server/create-route-handler";
import { HttpError } from "@/lib/server/http-errors";

export const runtime = "nodejs";

const firebaseAdminEnv: Partial<FirebaseAdminEnv> = {
  FIREBASE_ADMIN_PROJECT_ID: process.env.FIREBASE_ADMIN_PROJECT_ID,
  FIREBASE_ADMIN_CLIENT_EMAIL: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  FIREBASE_ADMIN_PRIVATE_KEY: process.env.FIREBASE_ADMIN_PRIVATE_KEY
};

const updateProfileSchema = z
  .object({
    fullName: z.string().trim().min(2).max(120).optional(),
    avatarUrl: z.string().trim().url().nullable().optional()
  })
  .refine((value) => typeof value.fullName !== "undefined" || typeof value.avatarUrl !== "undefined", {
    message: "Debes enviar al menos un campo para actualizar."
  });

function serializeUser(user: Awaited<ReturnType<typeof updateUserProfileByFirebaseUid>>) {
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

export const PUT = createRouteHandler({
  bodySchema: updateProfileSchema,
  requireJson: true,
  requireRequestedWith: true,
  rateLimit: {
    windowMs: 60_000,
    maxRequests: 20
  },
  handler: async ({ request, body }) => {
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

    const updatedUser = await updateUserProfileByFirebaseUid(decodedToken.uid, {
      fullName: body.fullName,
      avatarUrl: body.avatarUrl
    });

    return {
      user: serializeUser(updatedUser)
    };
  }
});
