import Image from "next/image";
import type { ReactNode } from "react";

import logo from "@/app/logo.png";
import { MarkdownExample } from "@/components/markdown-example";
import { QuickStart } from "@/components/quick-start";
import {
  API_ENDPOINT,
  apiParams,
  NPM_PACKAGE_NOTE,
  QUICK_START_INTRO,
  QUICK_START_TITLE,
  navItems,
  showcaseExample,
  SITE_DESCRIPTION,
  usageExamples,
} from "@/lib/docs";

const linkClassName = "underline-offset-4 hover:underline";

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

function ParamTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-border border-b text-left">
            <th className="pr-4 pb-2 font-medium">Parameter</th>
            <th className="pr-4 pb-2 font-medium">Required</th>
            <th className="pr-4 pb-2 font-medium">Default</th>
            <th className="pb-2 font-medium">Description</th>
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          {apiParams.map((param) => (
            <tr key={param.name} className="border-border border-b">
              <td className="py-2 pr-4 align-top">
                <code className="text-foreground" translate="no">
                  {param.name}
                </code>
              </td>
              <td className="py-2 pr-4 align-top">{param.required ? "Yes" : "No"}</td>
              <td className="py-2 pr-4 align-top">
                <code className="text-foreground" translate="no">
                  {param.default}
                </code>
              </td>
              <td className="py-2 align-top">{param.description}</td>
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
        <h1 className="flex items-center gap-3 text-3xl font-semibold text-balance">
          <Image src={logo} alt="" width={40} height={40} className="size-10 shrink-0" priority />
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
        <SectionHeading>{QUICK_START_TITLE}</SectionHeading>
        <p className="text-muted-foreground">{QUICK_START_INTRO}</p>
        <QuickStart />
        <p className="text-muted-foreground text-sm">
          Replace the{" "}
          <code className="text-sm" translate="no">
            icons
          </code>{" "}
          value with a comma-separated list of slugs from{" "}
          <ExternalLink href="https://simpleicons.org">simpleicons.org</ExternalLink>.
        </p>
      </section>

      <section id="examples" className="space-y-6">
        <SectionHeading>Examples</SectionHeading>
        {usageExamples.map((example) => (
          <MarkdownExample key={example.id} title={example.title} markdown={example.markdown} />
        ))}
      </section>

      <section id="showcase" className="space-y-4">
        <SectionHeading>Showcase</SectionHeading>
        <p className="text-muted-foreground">
          Real-world usage in a GitHub profile README — skills badges rendered via Markdown image
          embeds.
        </p>
        <figure className="space-y-2">
          <figcaption className="text-muted-foreground text-sm">{showcaseExample.title}</figcaption>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={showcaseExample.imageUrl}
            alt={showcaseExample.alt}
            width={800}
            height={400}
            className="border-border max-w-full rounded-md border"
          />
        </figure>
      </section>

      <section id="api-reference" className="space-y-4">
        <SectionHeading>API Reference</SectionHeading>
        <p className="text-muted-foreground">
          <code className="text-foreground text-sm" translate="no">
            GET {API_ENDPOINT}
          </code>{" "}
          returns a combined SVG for Markdown embeds.
        </p>
        <ParamTable />
        <p className="text-muted-foreground text-sm">
          Icon slugs are listed at{" "}
          <ExternalLink href="https://simpleicons.org">simpleicons.org</ExternalLink> and in the
          official{" "}
          <ExternalLink href="https://github.com/simple-icons/simple-icons/blob/master/slugs.md">
            slugs reference
          </ExternalLink>
          .
        </p>
      </section>
    </main>
  );
}
