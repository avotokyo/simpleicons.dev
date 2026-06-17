"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { QUICK_START_MARKDOWN } from "@/lib/docs";
import { parseMarkdownImage } from "@/lib/markdown-image";

const codeSurfaceClassName = "overflow-x-auto rounded-md bg-muted p-4 font-mono text-sm";

const FALLBACK_PREVIEW = parseMarkdownImage(QUICK_START_MARKDOWN)!;

export function QuickStart() {
  const [markdown, setMarkdown] = useState(QUICK_START_MARKDOWN);
  const preview = useMemo(() => parseMarkdownImage(markdown), [markdown]);

  return (
    <div className="space-y-4">
      <textarea
        value={markdown}
        onChange={(event) => setMarkdown(event.target.value)}
        aria-label="Markdown badge example"
        spellCheck={false}
        rows={2}
        className={`${codeSurfaceClassName} focus-visible:ring-primary/30 w-full resize-y border-0 focus-visible:ring-2 focus-visible:outline-none`}
        translate="no"
      />
      <figure>
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
