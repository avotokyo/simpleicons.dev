const MARKDOWN_IMAGE_RE = /^!\[([^\]]*)\]\(([^)]+)\)$/;

/** Rewrite production hostnames to relative paths for local API preview. */
export function toPreviewSrc(url: string): string {
  if (url.startsWith("/")) {
    return url;
  }

  try {
    const parsed = new URL(url);
    if (parsed.hostname === "simpleicons.dev" || parsed.hostname === "localhost") {
      return `${parsed.pathname}${parsed.search}`;
    }
  } catch {
    return url;
  }

  return url;
}

/** Parse a single-line Markdown image into alt text and preview URL. */
export function parseMarkdownImage(markdown: string): { alt: string; src: string } | null {
  const match = markdown.trim().match(MARKDOWN_IMAGE_RE);
  if (!match) {
    return null;
  }

  const [, alt, url] = match;
  return { alt, src: toPreviewSrc(url) };
}
