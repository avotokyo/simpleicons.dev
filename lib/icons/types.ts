/** Icon license; type "custom" indicates a non-SPDX license. */
export type License = { type: string; url: string } | { type: "custom"; url: string };

/** Card background theme. */
export type Theme = "dark" | "light";

/** Icon metadata from simple-icons/icons.json (SVG fetched separately via getIconSvg). */
export type IconRecord = {
  slug: string;
  title: string;
  hex: string;
  source: string;
  guidelines?: string;
  license?: License;
};

/** SVG render options for icon endpoints. viewbox=auto returns raw 24×24 without a card. */
export type RenderOptions = {
  theme?: Theme;
  color?: string;
  iconColor?: string;
  viewbox?: "auto";
};
