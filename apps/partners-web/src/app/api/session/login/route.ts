import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { SESSION_COOKIE_NAME, resolveSessionFromToken } from "@/lib/auth/session";

const bodySchema = z.object({
  idToken: z.string().min(1)
});

export async function POST(request: Request) {
  try {
    const body = bodySchema.parse(await request.json());
    const session = await resolveSessionFromToken(body.idToken);

    if (!session) {
      return NextResponse.json(
        {
          ok: false,
          error: "No pudimos validar tu sesión o tu usuario no tiene roles permitidos."
        },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, body.idToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8
    });

    return NextResponse.json({
      ok: true,
      redirectTo: session.primaryRole === "admin" ? "/admin" : "/partner",
      roles: session.roles
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Solicitud inválida.";

    return NextResponse.json(
      {
        ok: false,
        error: message
      },
      { status: 400 }
    );
  }
}
