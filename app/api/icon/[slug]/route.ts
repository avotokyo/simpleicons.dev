import { renderIconCard } from "@/lib/icons/render";
import { isResolveError, parseRenderOptions, resolveSlugParam } from "@/lib/icons/resolve";
import { errorResponse, renderErrorResponse, svgResponse } from "@/lib/icons/responses";

/** GET /api/icon/{slug} — 单个图标 SVG 端点。 支持 slug 别名解析及通用渲染参数。 */
export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resolved = resolveSlugParam(slug);

  if (isResolveError(resolved)) {
    return errorResponse(resolved);
  }

  const { searchParams } = new URL(request.url);
  const options = parseRenderOptions(searchParams);

  if (isResolveError(options)) {
    return errorResponse(options);
  }

  try {
    const svg = renderIconCard(resolved, options);
    return svgResponse(svg);
  } catch (error) {
    return renderErrorResponse(error);
  }
}
