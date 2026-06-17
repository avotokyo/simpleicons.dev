"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { QUICK_START_MARKDOWN } from "@/lib/docs";

const MARKDOWN_IMAGE_RE = /^!\[([^\]]*)\]\(([^)]+)\)$/;
const codeSurfaceClassName = "overflow-x-auto rounded-md bg-muted p-4 font-mono text-sm";

/** Rewrite production hostnames to relative paths for local API preview. */
function toPreviewSrc(url: string): string {
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
function parseMarkdownImage(markdown: string): { alt: string; src: string } | null {
  const match = markdown.trim().match(MARKDOWN_IMAGE_RE);
  if (!match) {
    return null;
  }

  const [, alt, url] = match;
  return { alt, src: toPreviewSrc(url) };
}

const FALLBACK_PREVIEW = parseMarkdownImage(QUICK_START_MARKDOWN)!;

export function QuickStart() {
  const [markdown, setMarkdown] = useState(QUICK_START_MARKDOWN);
  const preview = useMemo(() => parseMarkdownImage(markdown), [markdown]);

  return (
    <div className="space-y-4 rounded-lg border border-border p-6">
      <div className="space-y-1">
        <h3 className="font-semibold">Markdown badge</h3>
        <p className="text-muted-foreground text-sm">Embed a linked icon strip in your README.</p>
      </div>
      <textarea
        value={markdown}
        onChange={(event) => setMarkdown(event.target.value)}
        aria-label="Markdown badge example"
        spellCheck={false}
        rows={2}
        className={`${codeSurfaceClassName} w-full resize-y border-0 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:outline-none`}
        translate="no"
      />
      <figure className="space-y-2">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={preview?.src ?? FALLBACK_PREVIEW.src}
            src={preview?.src ?? FALLBACK_PREVIEW.src}
            alt={preview?.alt ?? FALLBACK_PREVIEW.alt}
            width={560}
            height={35}
            className="max-w-full"
          />
        </Link>
      </figure>
    </div>
  );
}
