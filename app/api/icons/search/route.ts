import { searchIcons } from "@/lib/icons/registry";
import { parseSearchRequest } from "@/lib/icons/resolve";
import { jsonResponse } from "@/lib/icons/responses";

/**
 * GET /api/icons/search — 图标搜索端点。
 * 按 slug 或 title 模糊匹配，空查询返回空数组。
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { query, limit } = parseSearchRequest(searchParams);

  if (!query.trim()) {
    return jsonResponse([]);
  }

  return jsonResponse(searchIcons(query, limit));
}
