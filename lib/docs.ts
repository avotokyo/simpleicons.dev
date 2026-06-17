/** Single source of truth for site and usage documentation. */

import { DEFAULT_THEME, ICONS_PER_LINE, MAX_ICONS } from "@/lib/icons/constants";

export const SITE_URL = "https://simpleicons.dev";

export const SITE_DESCRIPTION = "Showcase your skills on your GitHub README or resumé with ease.";

export const NPM_PACKAGE_NOTE =
  "The npm package is a version marker for the deployed service, not a programmatic SDK.";

export const QUICK_START_TITLE = "Quick Start";
export const QUICK_START_INTRO = "Paste this into your Markdown:";

/** Default Quick Start Markdown embed (production URL). */
export const QUICK_START_MARKDOWN = `![My Skills](${SITE_URL}/icons?icons=javascript,html5,css,react,nodedotjs&theme=light)`;

export const API_ENDPOINT = `${SITE_URL}/icons`;

export const navItems = [
  { href: "#quick-start", label: QUICK_START_TITLE },
  { href: "#examples", label: "Examples" },
  { href: "#showcase", label: "Showcase" },
  { href: "#api-reference", label: "API Reference" },
] as const;

export const showcaseExample = {
  title: "牛油果在东京学习",
  imageUrl:
    "https://img12.360buyimg.com/imagetools/jfs/t1/451709/14/16188/91434/6a32bd8bF0d5ae711/03e67b222e11b0bb.png",
  alt: "GitHub README skills section using simpleicons.dev badges",
} as const;

export const apiParams = [
  {
    name: "icons",
    required: true,
    default: "—",
    description: `Comma-separated slug list (max ${MAX_ICONS} icons). Find slugs at simpleicons.org.`,
  },
  {
    name: "theme",
    required: false,
    default: DEFAULT_THEME,
    description: 'Card background theme: "light" or "dark".',
  },
  {
    name: "perline",
    required: false,
    default: String(ICONS_PER_LINE),
    description: "Icons per row in the combined grid (1–50).",
  },
  {
    name: "viewbox",
    required: false,
    default: "—",
    description:
      'Set to "auto" for a raw 24×24 single icon, or a grid without card backgrounds for multiple icons.',
  },
  {
    name: "color",
    required: false,
    default: "—",
    description: "Custom card background hex color (e.g. F7DF1E, no # prefix).",
  },
  {
    name: "iconColor",
    required: false,
    default: "—",
    description: "Override icon path fill color (hex, no # prefix).",
  },
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
  {
    id: "color",
    title: "Custom background color",
    markdown: `![My Skills](${SITE_URL}/icons?icons=javascript&color=F7DF1E)`,
  },
  {
    id: "iconColor",
    title: "Custom icon color",
    markdown: `![My Skills](${SITE_URL}/icons?icons=javascript&iconColor=FF0000)`,
  },
] as const;
