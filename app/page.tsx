import Link from "next/link";
import type { ReactNode } from "react";

import { CodeBlock } from "@/components/home/code-block";
import { DocTable } from "@/components/home/doc-table";
import { QuickStartCard } from "@/components/home/quick-start-card";
import { SectionHeading } from "@/components/home/section-heading";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  apiEndpoints,
  curlExamples,
  errorMessages,
  iconsAllWarning,
  iconsParameters,
  navItems,
  renderParameters,
  responseDocs,
  SITE_DESCRIPTION,
  slugBehaviorNote,
} from "@/lib/docs";
import { linkClassName } from "@/lib/styles";

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
          as identifiers.
        </p>
      </header>

      <Separator />

      <section id="quick-start" className="space-y-4">
        <SectionHeading>Quick Start</SectionHeading>
        <QuickStartCard />
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
        <p className="text-muted-foreground text-sm">{iconsAllWarning}</p>
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
