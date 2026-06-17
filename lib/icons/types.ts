/** Icon license; type "custom" indicates a non-SPDX license. */
export type License = { type: string; url: string } | { type: "custom"; url: string };

/** Card background theme. */
export type Theme = "dark" | "light";

/** Icon metadata from simple-icons/icons.json (SVG fetched separately via registry). */
export type IconRecord = {
  slug: string;
  title: string;
  hex: string;
  source: string;
  guidelines?: string;
  license?: License;
};

/**
 * SVG render options for GET /icons. viewbox=auto: single icon → 24×24; multiple → grid without
 * cards.
 */
export type RenderOptions = {
  /** Card background theme; defaults to dark. */
  theme?: Theme;
  /** Custom card background hex color (e.g. F7DF1E). */
  color?: string;
  /** Override icon path fill color (hex). */
  iconColor?: string;
  /** Single icon: raw 24×24 SVG. Multiple icons: grid layout without card backgrounds. */
  viewbox?: "auto";
};
