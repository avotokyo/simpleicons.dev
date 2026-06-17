import "server-only";
import { DEFAULT_THEME } from "./constants";
import { getIconBySlug, getIconSvg } from "./registry";
import type { RenderOptions, Theme } from "./types";

/** Display size of one icon in the combined output (px). */
const ONE_ICON = 48;
/** Cell size in the composition grid (internal coordinates). */
const CELL_SIZE = 300;
/** Cell padding; drawable area per cell is CELL_SIZE - CELL_PADDING (256px). */
const CELL_PADDING = 44;
/** Single-icon card size (rounded rectangle background). */
const CARD_SIZE = 256;
/** Scale from cell coordinates to output SVG coordinates (ONE_ICON / drawable area). */
const SCALE = ONE_ICON / (CELL_SIZE - CELL_PADDING);

/** Default card background colors per theme. */
const THEME_BACKGROUNDS: Record<Theme, string> = {
  dark: "#242938",
  light: "#F4F2ED",
};

/** Normalize a hex color and ensure a leading `#`. Invalid values throw. */
function normalizeHex(color: string): string {
  const hex = color.replace(/^#/, "");
  if (!/^[0-9a-fA-F]{3,8}$/.test(hex)) {
    throw new Error(`Invalid color: ${color}`);
  }
  return `#${hex}`;
}

/** Extract inner markup from a full SVG string. */
function extractSvgInner(svg: string): string {
  const match = svg.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
  return match ? match[1].trim() : svg;
}

/** Set `fill` on self-closing path elements. When force=false, keep an existing fill. */
function applyPathFill(inner: string, fill: string, force = false): string {
  return inner.replace(/<path\b([^>]*)\/>/gi, (_tag, attrs: string) => {
    if (!force && /\sfill="/i.test(attrs)) {
      return `<path${attrs}/>`;
    }
    const withoutFill = attrs.replace(/\sfill="[^"]*"/gi, "");
    return `<path${withoutFill} fill="${fill}"/>`;
  });
}

/** Override all path fills with a custom icon color (force=true). */
function applyIconColor(inner: string, iconColor?: string): string {
  if (!iconColor) return inner;
  return applyPathFill(inner, normalizeHex(iconColor), true);
}

/** Apply brand default color from icons.json when paths have no fill. */
function applyDefaultIconFill(inner: string, hex: string): string {
  return applyPathFill(inner, normalizeHex(hex));
}

/** Load and colorize icon path markup. Throws if metadata or SVG is missing (500 at HTTP layer). */
function buildIconInner(slug: string, options: RenderOptions = {}): string {
  const icon = getIconBySlug(slug);
  if (!icon) {
    throw new Error(`Unknown icon: ${slug}`);
  }

  const svg = getIconSvg(slug);
  if (!svg) {
    throw new Error(`Missing SVG for icon: ${slug}`);
  }

  const raw = extractSvgInner(svg);
  return options.iconColor
    ? applyIconColor(raw, options.iconColor)
    : applyDefaultIconFill(raw, icon.hex);
}

/**
 * Build card inner markup for multi-icon composition. Not a public HTTP endpoint — used internally
 * by generateCombinedSvg.
 */
function buildCardContent(slug: string, options: RenderOptions = {}): string {
  const inner = buildIconInner(slug, options);

  if (options.viewbox === "auto") {
    const drawable = CELL_SIZE - CELL_PADDING;
    const scale = drawable / 24;
    const offset = (CELL_SIZE - 24 * scale) / 2;
    return `<g transform="translate(${offset}, ${offset}) scale(${scale})">${inner}</g>`;
  }

  const theme = options.theme ?? DEFAULT_THEME;
  const background = options.color ? normalizeHex(options.color) : THEME_BACKGROUNDS[theme];
  const iconScale = (CARD_SIZE - 64) / 24;
  const iconOffset = (CARD_SIZE - 24 * iconScale) / 2;

  return `<rect width="${CARD_SIZE}" height="${CARD_SIZE}" rx="60" fill="${background}"/>
<g transform="translate(${iconOffset}, ${iconOffset}) scale(${iconScale})">
${inner}
</g>`;
}

/**
 * Render one icon as a card SVG, or raw 24×24 when viewbox=auto. Library/test helper — not exposed
 * as an HTTP route.
 */
export function renderIconCard(slug: string, options: RenderOptions = {}): string {
  if (options.viewbox === "auto") {
    const inner = buildIconInner(slug, options);
    return `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  }

  const content = buildCardContent(slug, options);
  return `<svg width="${CARD_SIZE}" height="${CARD_SIZE}" viewBox="0 0 ${CARD_SIZE} ${CARD_SIZE}" fill="none" xmlns="http://www.w3.org/2000/svg">
${content}
</svg>`;
}

/**
 * Compose multiple icon cards into one SVG grid. When viewbox=auto and only one slug is requested,
 * delegates to renderIconCard for a standalone 24×24 SVG.
 */
export function generateCombinedSvg(
  slugs: string[],
  perLine: number,
  options: RenderOptions = {},
): string {
  if (options.viewbox === "auto" && slugs.length === 1) {
    return renderIconCard(slugs[0], options);
  }

  const iconSvgList = slugs.map((slug) => buildCardContent(slug, options));

  const length = Math.min(perLine * CELL_SIZE, slugs.length * CELL_SIZE) - CELL_PADDING;
  const height = Math.ceil(iconSvgList.length / perLine) * CELL_SIZE - CELL_PADDING;
  const scaledHeight = height * SCALE;
  const scaledWidth = length * SCALE;

  const iconsMarkup = iconSvgList
    .map(
      (icon, index) => `
        <g transform="translate(${(index % perLine) * CELL_SIZE}, ${Math.floor(index / perLine) * CELL_SIZE})">
          ${icon}
        </g>`,
    )
    .join(" ");

  return `<svg width="${scaledWidth}" height="${scaledHeight}" viewBox="0 0 ${length} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">${iconsMarkup}
  </svg>`;
}
