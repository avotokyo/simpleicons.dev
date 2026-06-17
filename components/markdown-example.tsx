import Link from "next/link";

import { parseMarkdownImage } from "@/lib/markdown-image";

const codeSurfaceClassName = "overflow-x-auto rounded-md bg-muted p-4 font-mono text-sm";

export function MarkdownExample({ title, markdown }: { title?: string; markdown: string }) {
  const preview = parseMarkdownImage(markdown);

  return (
    <div className="space-y-3">
      {title ? <h3 className="font-medium">{title}</h3> : null}
      <pre className={codeSurfaceClassName}>
        <code translate="no">{markdown}</code>
      </pre>
      {preview ? (
        <figure>
          <Link href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview.src}
              alt={preview.alt}
              width={560}
              height={35}
              className="max-w-full"
            />
          </Link>
        </figure>
      ) : null}
    </div>
  );
}
