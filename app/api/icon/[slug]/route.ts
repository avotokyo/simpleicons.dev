import { renderIconCard } from "@/lib/icons/render";
import { isResolveError, parseRenderOptions, resolveSlugParam } from "@/lib/icons/resolve";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resolved = resolveSlugParam(slug);

  if (isResolveError(resolved)) {
    return new Response(resolved.message, { status: resolved.status });
  }

  const { searchParams } = new URL(request.url);
  const options = parseRenderOptions(searchParams);

  if (isResolveError(options)) {
    return new Response(options.message, { status: options.status });
  }

  try {
    const svg = renderIconCard(resolved, options);
    return new Response(svg, {
      headers: { "Content-Type": "image/svg+xml" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal error";
    return new Response(message, { status: 500 });
  }
}
