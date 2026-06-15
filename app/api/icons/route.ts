import { getAllIcons, getAllSlugs, toIconMeta } from "@/lib/icons/registry";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format");

  if (format === "full") {
    const icons = getAllIcons().map(toIconMeta);
    return Response.json(icons, {
      headers: { "content-type": "application/json;charset=UTF-8" },
    });
  }

  return Response.json(getAllSlugs(), {
    headers: { "content-type": "application/json;charset=UTF-8" },
  });
}
