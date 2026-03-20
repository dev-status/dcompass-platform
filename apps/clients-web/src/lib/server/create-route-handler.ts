import { NextResponse } from "next/server";
import { type ZodType } from "zod";
import { isHttpError } from "./http-errors";
import { enforceRateLimit, type RateLimitConfig } from "./rate-limit";
import { getClientKey, parseJsonBody, requireJsonRequest, requireRequestedWith } from "./request-guards";

interface CreateRouteHandlerOptions<TBody> {
  bodySchema?: ZodType<TBody>;
  requireJson?: boolean;
  requireRequestedWith?: boolean;
  rateLimit?: Omit<RateLimitConfig, "key">;
  handler: (context: {
    request: Request;
    body: TBody;
    clientKey: string;
  }) => Promise<Response | NextResponse | unknown>;
}

export function createRouteHandler<TBody = undefined>(options: CreateRouteHandlerOptions<TBody>) {
  return async function routeHandler(request: Request) {
    try {
      if (options.requireJson) {
        requireJsonRequest(request);
      }

      if (options.requireRequestedWith) {
        requireRequestedWith(request);
      }

      const clientKey = getClientKey(request);

      if (options.rateLimit) {
        enforceRateLimit({
          ...options.rateLimit,
          key: clientKey
        });
      }

      const body = options.bodySchema
        ? await parseJsonBody(request, options.bodySchema)
        : (undefined as TBody);

      const result = await options.handler({
        request,
        body,
        clientKey
      });

      if (result instanceof Response) {
        return result;
      }

      return NextResponse.json(result);
    } catch (error) {
      if (isHttpError(error)) {
        return NextResponse.json({ error: error.message }, { status: error.status });
      }

      const message = error instanceof Error ? error.message : "Error interno del servidor.";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  };
}
