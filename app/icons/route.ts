import { generateCombinedSvg } from "@/lib/icons/render";
import { isResolveError, parseIconsRequest } from "@/lib/icons/resolve";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = parseIconsRequest(searchParams);

  if (isResolveError(parsed)) {
    return new Response(parsed.message, { status: parsed.status });
  }

  try {
    const svg = generateCombinedSvg(
      parsed.slugs,
      parsed.perLine,
      parsed.renderOptions,
    );

    return new Response(svg, {
      headers: { "Content-Type": "image/svg+xml" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal error";
    return new Response(message, { status: 500 });
  }
}
