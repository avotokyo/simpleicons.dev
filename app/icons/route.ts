import { generateCombinedSvg } from "@/lib/icons/render";
import { isParseError, parseIconsRequest } from "@/lib/icons/resolve";
import { errorResponse, renderErrorResponse, svgResponse } from "@/lib/icons/responses";

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
