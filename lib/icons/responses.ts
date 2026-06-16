import "server-only";
import type { ResolveError } from "./resolve";

const SVG_CACHE_CONTROL = "public, max-age=86400, s-maxage=604800";

/** Return an SVG image response with cache headers. */
export function svgResponse(svg: string): Response {
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": SVG_CACHE_CONTROL,
    },
  });
}

/** Map a validation error to an HTTP response. */
export function errorResponse(error: ResolveError): Response {
  return new Response(error.message, { status: error.status });
}

/** Map a render-time exception to a 500 response. */
export function renderErrorResponse(error: unknown): Response {
  const message = error instanceof Error ? error.message : "Internal error";
  return new Response(message, { status: 500 });
}
