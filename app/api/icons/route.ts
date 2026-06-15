import { getAllIcons, getAllSlugs } from "@/lib/icons/registry";
import { jsonResponse } from "@/lib/icons/responses";

/** GET /api/icons — 图标列表端点。 默认返回 slug 数组；format=full 时返回完整元数据。 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format");

  if (format === "full") {
    return jsonResponse(getAllIcons());
  }

  return jsonResponse(getAllSlugs());
}
