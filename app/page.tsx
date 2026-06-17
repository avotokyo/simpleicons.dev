import Link from "next/link";
import type { ReactNode } from "react";

import { QuickStart } from "@/components/quick-start";
import {
  apiEndpoints,
  curlExamples,
  errorMessages,
  iconsParameters,
  NPM_PACKAGE_NOTE,
  navItems,
  renderParameters,
  responseDocs,
  SITE_DESCRIPTION,
  slugBehaviorNote,
} from "@/lib/docs";

const linkClassName = "underline-offset-4 hover:underline";
const codeSurfaceClassName = "overflow-x-auto rounded-md bg-muted p-4 font-mono text-sm";

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-primary ${linkClassName}`}>
      {children}
    </a>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="text-xl font-semibold text-balance">{children}</h2>;
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className={codeSurfaceClassName}>
      <code translate="no">{children}</code>
    </pre>
  );
}

function Badge({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "secondary" | "outline";
}) {
  const className =
    variant === "secondary"
      ? "rounded-full bg-muted px-2 py-0.5 text-xs font-medium"
      : variant === "outline"
        ? "rounded-full border border-border px-2 py-0.5 text-xs font-medium"
        : "rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-white";

  return <span className={className}>{children}</span>;
}

type DocTableColumn<T> = {
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
};

function DocTable<T>({
  columns,
  rows,
  rowKey,
}: {
  columns: DocTableColumn<T>[];
  rows: readonly T[];
  rowKey: (row: T) => string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-border border-b">
            {columns.map((column) => (
              <th key={column.header} className="px-3 py-2 text-left font-medium">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)} className="border-border border-b">
              {columns.map((column) => (
                <td key={column.header} className={`px-3 py-2 ${column.className ?? ""}`}>
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Home() {
  return (
    <main id="main-content" className="mx-auto max-w-3xl space-y-8 p-6">
      <nav aria-label="On this page">
        <ul className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className={`hover:text-foreground ${linkClassName}`}>
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
        <p className="text-muted-foreground">{SITE_DESCRIPTION}</p>
        <p className="text-muted-foreground text-sm">
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
          as identifiers. {NPM_PACKAGE_NOTE}
        </p>
      </header>

      <hr className="border-border" />

      <section id="quick-start" className="space-y-4">
        <SectionHeading>Quick Start</SectionHeading>
        <QuickStart />
      </section>

      <section id="api" className="space-y-4">
        <SectionHeading>API</SectionHeading>
        <DocTable
          rows={apiEndpoints}
          rowKey={(endpoint) => endpoint.path}
          columns={[
            {
              header: "Method",
              cell: (endpoint) => <Badge variant="secondary">{endpoint.method}</Badge>,
            },
            {
              header: "Endpoint",
              cell: (endpoint) => (
                <Link
                  href={endpoint.href}
                  className={`font-mono text-sm ${linkClassName}`}
                  translate="no">
                  {endpoint.path}
                </Link>
              ),
            },
            {
              header: "Description",
              className: "text-muted-foreground whitespace-normal",
              cell: (endpoint) => endpoint.description,
            },
          ]}
        />

        <h3 className="text-lg font-medium">
          <code translate="no">GET /icons</code> parameters
        </h3>
        <DocTable
          rows={iconsParameters}
          rowKey={(parameter) => parameter.name}
          columns={[
            {
              header: "Parameter",
              cell: (parameter) => (
                <code className="text-sm" translate="no">
                  {parameter.name}
                </code>
              ),
            },
            {
              header: "Required",
              cell: (parameter) =>
                parameter.required ? (
                  <Badge variant="default">Yes</Badge>
                ) : (
                  <Badge variant="outline">No</Badge>
                ),
            },
            {
              header: "Description",
              className: "text-muted-foreground whitespace-normal",
              cell: (parameter) => parameter.description,
            },
          ]}
        />
      </section>

      <section id="responses" className="space-y-4">
        <SectionHeading>Responses</SectionHeading>
        <DocTable
          rows={responseDocs}
          rowKey={(response) => response.status}
          columns={[
            {
              header: "Status",
              cell: (response) => (
                <code className="text-sm" translate="no">
                  {response.status}
                </code>
              ),
            },
            {
              header: "Description",
              className: "text-muted-foreground whitespace-normal",
              cell: (response) => response.description,
            },
          ]}
        />
        <p className="text-muted-foreground text-sm">Common validation messages:</p>
        <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
          {errorMessages.map((message) => (
            <li key={message}>
              <code className="text-sm" translate="no">
                {message}
              </code>
            </li>
          ))}
        </ul>
      </section>

      <section id="render-parameters" className="space-y-4">
        <SectionHeading>Render Parameters</SectionHeading>
        <p className="text-muted-foreground text-sm">Applies to `/icons`:</p>
        <DocTable
          rows={renderParameters}
          rowKey={(parameter) => parameter.name}
          columns={[
            {
              header: "Parameter",
              cell: (parameter) => (
                <code className="text-sm" translate="no">
                  {parameter.name}
                </code>
              ),
            },
            {
              header: "Description",
              className: "text-muted-foreground whitespace-normal",
              cell: (parameter) => parameter.description,
            },
          ]}
        />
      </section>

      <section id="examples" className="space-y-4">
        <SectionHeading>Examples</SectionHeading>
        <div className="space-y-3">
          {curlExamples.map((example) => (
            <CodeBlock key={example}>{example}</CodeBlock>
          ))}
        </div>
      </section>

      <section id="slugs" className="space-y-4">
        <SectionHeading>Slugs</SectionHeading>
        <p className="text-muted-foreground">
          Find official slugs at{" "}
          <ExternalLink href="https://simpleicons.org">simpleicons.org</ExternalLink> or in{" "}
          <ExternalLink href="https://github.com/simple-icons/simple-icons/blob/master/slugs.md">
            slugs.md
          </ExternalLink>
          . {slugBehaviorNote} Unknown slugs return{" "}
          <code className="text-sm" translate="no">
            400
          </code>
          .
        </p>
      </section>
    </main>
  );
}
