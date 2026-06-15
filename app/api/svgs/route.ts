import { renderSvgsMap } from "@/lib/icons/render";
import { isResolveError, parseSvgsRequest } from "@/lib/icons/resolve";
import { errorResponse, jsonResponse, renderErrorResponse } from "@/lib/icons/responses";

/**
 * GET /api/svgs — 批量 SVG 端点。
 * 返回 slug → SVG 字符串的 JSON 对象，支持 slugs 或 all=1。
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = parseSvgsRequest(searchParams);

  if (isResolveError(parsed)) {
    return errorResponse(parsed);
  }

  try {
    const svgs = renderSvgsMap(parsed.slugs, parsed.renderOptions);
    return jsonResponse(svgs);
  } catch (error) {
    return renderErrorResponse(error);
  }
}
