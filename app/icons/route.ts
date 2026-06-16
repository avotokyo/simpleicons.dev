import { generateCombinedSvg } from "@/lib/icons/render";
import { isResolveError, parseIconsRequest } from "@/lib/icons/resolve";
import { errorResponse, renderErrorResponse, svgResponse } from "@/lib/icons/responses";

/** GET /icons — combined multi-icon SVG for Markdown embeds. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = parseIconsRequest(searchParams);

  if (isResolveError(parsed)) {
    return errorResponse(parsed);
  }

  try {
    const svg = generateCombinedSvg(parsed.slugs, parsed.perLine, parsed.renderOptions);
    return svgResponse(svg);
  } catch (error) {
    return renderErrorResponse(error);
  }
}
