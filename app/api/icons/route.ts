import { getAllIcons, getAllSlugs } from "@/lib/icons/registry";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format");

  if (format === "full") {
    return Response.json(getAllIcons(), {
      headers: { "content-type": "application/json;charset=UTF-8" },
    });
  }

  return Response.json(getAllSlugs(), {
    headers: { "content-type": "application/json;charset=UTF-8" },
  });
}
