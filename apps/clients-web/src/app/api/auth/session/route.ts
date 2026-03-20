import { NextResponse } from "next/server";
import { verifyFirebaseIdToken, type FirebaseAdminEnv } from "@dcompass/auth/server";
import { syncFirebaseUser } from "@dcompass/db";

export const runtime = "nodejs";

const firebaseAdminEnv: Partial<FirebaseAdminEnv> = {
  FIREBASE_ADMIN_PROJECT_ID: process.env.FIREBASE_ADMIN_PROJECT_ID,
  FIREBASE_ADMIN_CLIENT_EMAIL: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  FIREBASE_ADMIN_PRIVATE_KEY: process.env.FIREBASE_ADMIN_PRIVATE_KEY
};

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

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { idToken?: string };

    if (!body.idToken) {
      return NextResponse.json({ error: "Falta el idToken." }, { status: 400 });
    }

    const decodedToken = await verifyFirebaseIdToken(firebaseAdminEnv, body.idToken);

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
