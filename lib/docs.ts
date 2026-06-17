/** Single source of truth for site and usage documentation. */

export const SITE_URL = "https://simpleicons.dev";

export const SITE_DESCRIPTION =
  "SVG icon API powered by Simple Icons. Combine brand icons into a single SVG for GitHub READMEs, resumes, and other Markdown documents.";

export const NPM_PACKAGE_NOTE =
  "The npm package is a version marker for the deployed service, not a programmatic SDK.";

/** Default Quick Start Markdown embed (production URL). */
export const QUICK_START_MARKDOWN = `![My Skills](${SITE_URL}/icons?icons=javascript,html5,css,react,nodedotjs&theme=light)`;

export const navItems = [
  { href: "#quick-start", label: "Quick Start" },
  { href: "#examples", label: "Examples" },
] as const;

export const usageExamples = [
  {
    id: "light",
    title: "Light theme (shown above)",
    markdown: `![My Skills](${SITE_URL}/icons?icons=javascript,html5,css,react,nodedotjs&theme=light)`,
  },
  {
    id: "dark",
    title: "Dark theme",
    markdown: `![My Skills](${SITE_URL}/icons?icons=javascript,html5,css,react,nodedotjs&theme=dark)`,
  },
  {
    id: "perline",
    title: "Two icons per row",
    markdown: `![My Skills](${SITE_URL}/icons?icons=javascript,react&perline=2)`,
  },
  {
    id: "viewbox",
    title: "Single icon without card background",
    markdown: `![JavaScript](${SITE_URL}/icons?icons=javascript&viewbox=auto)`,
  },
] as const;
