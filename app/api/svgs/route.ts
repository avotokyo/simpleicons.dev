import { renderSvgsMap } from "@/lib/icons/render";
import { getAllSlugs } from "@/lib/icons/registry";
import {
  isResolveError,
  parseRenderOptions,
  resolveSlugParam,
} from "@/lib/icons/resolve";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const options = parseRenderOptions(searchParams);

  if (isResolveError(options)) {
    return new Response(options.message, { status: options.status });
  }

  const all = searchParams.get("all");
  const slugsParam = searchParams.get("slugs");

  let slugs: string[] = [];

  if (all === "1") {
    slugs = getAllSlugs();
  } else if (slugsParam) {
    const names = slugsParam.split(",").map((n) => n.trim()).filter(Boolean);
    for (const name of names) {
      const resolved = resolveSlugParam(name);
      if (isResolveError(resolved)) {
        return new Response(resolved.message, { status: resolved.status });
      }
      slugs.push(resolved);
    }
  } else {
    return new Response("Specify ?slugs=javascript,react or ?all=1", {
      status: 400,
    });
  }

  try {
    const svgs = renderSvgsMap(slugs, options);
    return Response.json(svgs, {
      headers: { "content-type": "application/json;charset=UTF-8" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal error";
    return new Response(message, { status: 500 });
  }
}
