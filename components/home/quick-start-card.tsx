"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const DEFAULT_MARKDOWN = `![My Skills](https://simpleicons.dev/icons?icons=javascript,html5,css,react,nodedotjs)`;

const MARKDOWN_IMAGE_RE = /^!\[([^\]]*)\]\(([^)]+)\)$/;

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

function parseMarkdownImage(markdown: string): { alt: string; src: string } | null {
  const match = markdown.trim().match(MARKDOWN_IMAGE_RE);
  if (!match) {
    return null;
  }

  const [, alt, url] = match;
  return { alt, src: toPreviewSrc(url) };
}

export function QuickStartCard() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const preview = useMemo(() => parseMarkdownImage(markdown), [markdown]);
  const fallbackPreview = useMemo(() => parseMarkdownImage(DEFAULT_MARKDOWN)!, []);

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
            "w-full resize-y rounded-md bg-muted p-4 font-mono text-sm",
            "border-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
          )}
          translate="no"
        />
        <figure className="space-y-2">
          <Link href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={preview?.src ?? fallbackPreview.src}
              src={preview?.src ?? fallbackPreview.src}
              alt={preview?.alt ?? fallbackPreview.alt}
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
