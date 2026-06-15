import { generateCombinedSvg } from "@/lib/icons/render";
import { isResolveError, parseIconsRequest } from "@/lib/icons/resolve";
import { errorResponse, renderErrorResponse, svgResponse } from "@/lib/icons/responses";

/**
 * GET /icons — 多图标拼接 SVG 端点。
 * 解析 icons/perline 等参数，生成可嵌入 Markdown 的拼接 SVG。
 */
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
