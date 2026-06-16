/** Single source of truth for site and API documentation. Keep README.md in sync manually. */

import { MAX_ICONS } from "./icons/constants";

export const SITE_NAME = "simpleicons.dev";
export const SITE_URL = "https://simpleicons.dev";

export const SITE_DESCRIPTION =
  "SVG icon API powered by Simple Icons. Combine brand icons into a single SVG for GitHub READMEs, resumes, and other Markdown documents.";

export const NPM_PACKAGE_NOTE =
  "The npm package is a version marker for the deployed service, not a programmatic SDK.";

/** Default Quick Start Markdown embed (production URL). */
export const QUICK_START_MARKDOWN = `![My Skills](${SITE_URL}/icons?icons=javascript,html5,css,react,nodedotjs&theme=light)`;

export const navItems = [
  { href: "#quick-start", label: "Quick Start" },
  { href: "#api", label: "API" },
  { href: "#responses", label: "Responses" },
  { href: "#render-parameters", label: "Render Parameters" },
  { href: "#examples", label: "Examples" },
  { href: "#slugs", label: "Slugs" },
] as const;

export const apiEndpoints = [
  {
    method: "GET",
    path: "/icons",
    href: "/icons?icons=javascript,html5,css,react,nodedotjs&theme=light",
    description: "Combined multi-icon SVG",
  },
] as const;

export const iconsParameters = [
  {
    name: "icons",
    required: true,
    description: `Comma-separated official slugs (case-insensitive, trimmed), \`all\`, or up to ${MAX_ICONS} icons`,
  },
  {
    name: "perline",
    required: false,
    description: "Icons per row, 1–50 (default 15)",
  },
] as const;

export const renderParameters = [
  { name: "theme", description: "dark (default) or light" },
  { name: "color", description: "Card background (hex, e.g. F7DF1E)" },
  { name: "iconColor", description: "Icon fill color (hex)" },
  { name: "viewbox", description: "auto for raw 24×24 SVG without card" },
] as const;

export const responseDocs = [
  {
    status: "200",
    description: "Success — body is an SVG string with Content-Type image/svg+xml",
  },
  {
    status: "400",
    description: "Validation error — plain-text message describing the problem",
  },
  {
    status: "500",
    description: "Render error — plain-text message (e.g. invalid hex color)",
  },
] as const;

export const errorMessages = [
  "Missing icons parameter",
  'Theme must be either "light" or "dark"',
  "Icons per line must be a number between 1 and 50",
  "Unknown icon: …",
  `Too many icons requested (max ${MAX_ICONS})`,
] as const;

export const iconsAllWarning =
  "`icons=all` expands every official slug (3000+). Requests are capped at 100 icons; use explicit slug lists for large sets.";

export const slugBehaviorNote =
  "Only official slugs are accepted. Matching is case-insensitive and comma-separated values are trimmed.";

export const curlExamples = [
  `curl "${SITE_URL}/icons?icons=javascript,html5,css,react,nodedotjs&theme=light"`,
  `curl "${SITE_URL}/icons?icons=javascript,react&perline=2"`,
  `curl "${SITE_URL}/icons?icons=javascript&viewbox=auto"`,
] as const;
