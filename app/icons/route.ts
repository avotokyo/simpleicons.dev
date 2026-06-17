import { generateCombinedSvg } from "@/lib/icons/render";
import { isParseError, parseIconsRequest, type ResolveError } from "@/lib/icons/resolve";

const SVG_CACHE_CONTROL = "public, max-age=86400, s-maxage=604800";

function svgResponse(svg: string): Response {
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": SVG_CACHE_CONTROL,
    },
  });
}

function errorResponse(error: ResolveError): Response {
  return new Response(error.message, { status: error.status });
}

function renderErrorResponse(error: unknown): Response {
  const message = error instanceof Error ? error.message : "Internal error";
  return new Response(message, { status: 500 });
}

/** GET /icons — combined multi-icon SVG for Markdown embeds. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = parseIconsRequest(searchParams);

  if (isParseError(parsed)) {
    return errorResponse(parsed.error);
  }

  try {
    const { slugs, perLine, renderOptions } = parsed.data;
    const svg = generateCombinedSvg(slugs, perLine, renderOptions);
    return svgResponse(svg);
  } catch (error) {
    return renderErrorResponse(error);
  }
}
