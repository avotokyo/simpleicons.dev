import Image from "next/image";
import type { ReactNode } from "react";

import logo from "@/app/logo.png";
import { MarkdownExample } from "@/components/markdown-example";
import { QuickStart } from "@/components/quick-start";
import { NPM_PACKAGE_NOTE, navItems, SITE_DESCRIPTION, usageExamples } from "@/lib/docs";

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
        <SectionHeading>Quick Start</SectionHeading>
        <p className="text-muted-foreground">Paste this into your Markdown:</p>
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
    </main>
  );
}
