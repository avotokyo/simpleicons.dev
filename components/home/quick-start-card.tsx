"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QUICK_START_MARKDOWN } from "@/lib/docs";
import { codeSurfaceClassName } from "@/lib/styles";
import { cn } from "@/lib/utils";

const MARKDOWN_IMAGE_RE = /^!\[([^\]]*)\]\(([^)]+)\)$/;

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

export function QuickStartCard() {
  const [markdown, setMarkdown] = useState(QUICK_START_MARKDOWN);
  const preview = useMemo(() => parseMarkdownImage(markdown), [markdown]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Markdown badge</CardTitle>
        <CardDescription>Embed a linked icon strip in your README.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <textarea
          value={markdown}
          onChange={(event) => setMarkdown(event.target.value)}
          aria-label="Markdown badge example"
          spellCheck={false}
          rows={2}
          className={cn(
            codeSurfaceClassName,
            "w-full resize-y",
            "border-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
          )}
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
      </CardContent>
    </Card>
  );
}
