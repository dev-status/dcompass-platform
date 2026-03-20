import { z, type ZodType } from "zod";
import { HttpError } from "./http-errors";

export function requireJsonRequest(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.toLowerCase().includes("application/json")) {
    throw new HttpError(415, "Content-Type inválido.");
  }
}

export function requireRequestedWith(request: Request) {
  const requestedWith = request.headers.get("x-requested-with");

  if (requestedWith !== null && requestedWith !== "XMLHttpRequest") {
    throw new HttpError(400, "Encabezado de solicitud inválido.");
  }
}

export async function parseJsonBody<TSchema extends ZodType>(request: Request, schema: TSchema): Promise<z.infer<TSchema>> {
  const rawBody = await request.json().catch(() => {
    throw new HttpError(400, "Body inválido.");
  });

  const parsed = schema.safeParse(rawBody);

  if (!parsed.success) {
    throw new HttpError(400, "Body inválido.");
  }

  return parsed.data;
}

export function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}
