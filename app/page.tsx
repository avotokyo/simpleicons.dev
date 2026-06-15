import Link from "next/link";
import type { ReactNode } from "react";

import { CodeBlock } from "@/components/home/code-block";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const navItems = [
  { href: "#quick-start", label: "Quick Start" },
  { href: "#api", label: "API" },
  { href: "#render-parameters", label: "Render Parameters" },
  { href: "#examples", label: "Examples" },
  { href: "#slugs", label: "Slugs" },
] as const;

const apiEndpoints = [
  {
    method: "GET",
    path: "/icons",
    href: "/icons?icons=javascript,html5,css,react",
    description: "Combined multi-icon SVG",
  },
] as const;

const renderParameters = [
  { name: "theme", description: "dark (default) or light" },
  { name: "color", description: "Card background (hex, e.g. F7DF1E)" },
  { name: "iconColor", description: "Icon fill color (hex)" },
  { name: "viewbox", description: "auto for raw 24×24 SVG without card" },
] as const;

const iconsParameters = [
  { name: "icons", required: true, description: "Comma-separated slugs, or all" },
  {
    name: "perline",
    required: false,
    description: "Icons per row, 1–50 (default 15)",
  },
] as const;

const quickStartMarkdown = `[![My Skills](https://simpleicons.dev/icons?icons=javascript,html5,css,react,nodedotjs)](https://simpleicons.dev)`;

const quickStartImageMarkdown = `![My Skills](https://simpleicons.dev/icons?icons=nodedotjs,vuedotjs,nextdotjs&theme=light&perline=3)`;

const curlExamples = [
  'curl "https://simpleicons.dev/icons?icons=javascript,html5,css,react"',
] as const;

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline-offset-4 hover:underline"
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <main id="main-content" className="mx-auto max-w-3xl space-y-8 p-6">
      <nav aria-label="On this page">
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="underline-offset-4 hover:text-foreground hover:underline"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <header className="space-y-4">
        <h1 className="text-3xl font-semibold text-balance">
          <span translate="no">simpleicons.dev</span>
        </h1>
        <p className="text-muted-foreground">
          SVG icon API powered by{" "}
          <ExternalLink href="https://simpleicons.org">Simple Icons</ExternalLink>
          . Combine brand icons into a single SVG for GitHub READMEs, resumes,
          and other Markdown documents.
        </p>
        <p className="text-sm text-muted-foreground">
          Icon data from{" "}
          <ExternalLink href="https://www.npmjs.com/package/simple-icons">
            <code className="text-foreground" translate="no">
              simple-icons
            </code>
          </ExternalLink>
          . Use official{" "}
          <ExternalLink href="https://github.com/simple-icons/simple-icons/blob/master/slugs.md">
            slugs
          </ExternalLink>{" "}
          as identifiers.
        </p>
      </header>

      <Separator />

      <section id="quick-start" className="space-y-4">
        <h2 className="text-xl font-semibold text-balance">Quick Start</h2>
        <Card>
          <CardHeader>
            <CardTitle>Markdown badge</CardTitle>
            <CardDescription>
              Embed a linked icon strip in your README.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock>{quickStartMarkdown}</CodeBlock>
            <figure className="space-y-2">
              <Link href="/">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icons?icons=javascript,html5,css,react,nodedotjs"
                  alt="JavaScript, HTML5, CSS, React, and Node.js icons"
                  width={560}
                  height={35}
                  className="max-w-full"
                />
              </Link>
              <figcaption className="text-sm text-muted-foreground">
                Live preview
              </figcaption>
            </figure>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Markdown image</CardTitle>
            <CardDescription>
              Use theme and perline to customize the layout.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock>{quickStartImageMarkdown}</CodeBlock>
          </CardContent>
        </Card>
      </section>

      <section id="api" className="space-y-4">
        <h2 className="text-xl font-semibold text-balance">API</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Method</TableHead>
              <TableHead>Endpoint</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apiEndpoints.map((endpoint) => (
              <TableRow key={endpoint.path}>
                <TableCell>
                  <Badge variant="secondary">{endpoint.method}</Badge>
                </TableCell>
                <TableCell>
                  <Link
                    href={endpoint.href}
                    className="font-mono text-sm underline-offset-4 hover:underline"
                    translate="no"
                  >
                    {endpoint.path}
                  </Link>
                </TableCell>
                <TableCell className="whitespace-normal text-muted-foreground">
                  {endpoint.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <h3 className="text-lg font-medium">
          <code translate="no">GET /icons</code> parameters
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Parameter</TableHead>
              <TableHead>Required</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {iconsParameters.map((parameter) => (
              <TableRow key={parameter.name}>
                <TableCell>
                  <code className="text-sm" translate="no">
                    {parameter.name}
                  </code>
                </TableCell>
                <TableCell>
                  {parameter.required ? (
                    <Badge variant="default">Yes</Badge>
                  ) : (
                    <Badge variant="outline">No</Badge>
                  )}
                </TableCell>
                <TableCell className="whitespace-normal text-muted-foreground">
                  {parameter.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <section id="render-parameters" className="space-y-4">
        <h2 className="text-xl font-semibold text-balance">Render Parameters</h2>
        <p className="text-sm text-muted-foreground">Applies to `/icons`:</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Parameter</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {renderParameters.map((parameter) => (
              <TableRow key={parameter.name}>
                <TableCell>
                  <code className="text-sm" translate="no">
                    {parameter.name}
                  </code>
                </TableCell>
                <TableCell className="whitespace-normal text-muted-foreground">
                  {parameter.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <section id="examples" className="space-y-4">
        <h2 className="text-xl font-semibold text-balance">Examples</h2>
        <div className="space-y-3">
          {curlExamples.map((example) => (
            <CodeBlock key={example}>{example}</CodeBlock>
          ))}
        </div>
      </section>

      <section id="slugs" className="space-y-4">
        <h2 className="text-xl font-semibold text-balance">Slugs</h2>
        <p className="text-muted-foreground">
          Find slugs at{" "}
          <ExternalLink href="https://simpleicons.org">simpleicons.org</ExternalLink>
          . Aliases (
          <code className="text-sm" translate="no">
            aliases.old
          </code>
          ,{" "}
          <code className="text-sm" translate="no">
            aliases.aka
          </code>
          ,{" "}
          <code className="text-sm" translate="no">
            aliases.loc
          </code>
          ) are supported. Unknown slugs return{" "}
          <code className="text-sm" translate="no">
            400
          </code>
          .
        </p>
      </section>
    </main>
  );
}
