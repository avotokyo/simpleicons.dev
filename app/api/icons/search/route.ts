import { searchIcons } from "@/lib/icons/registry";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";

  if (!query.trim()) {
    return Response.json([], {
      headers: { "content-type": "application/json;charset=UTF-8" },
    });
  }

  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Number.parseInt(limitParam, 10) : 50;
  const safeLimit = Number.isNaN(limit) || limit < 1 ? 50 : Math.min(limit, 100);

  const results = searchIcons(query, safeLimit);

  return Response.json(results, {
    headers: { "content-type": "application/json;charset=UTF-8" },
  });
}
