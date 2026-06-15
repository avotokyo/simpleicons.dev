import "server-only";

import { readFileSync } from "node:fs";

import { getIconBySlug, getIconSvgPath } from "./registry";
import type { RenderOptions, Theme } from "./types";

export const ICONS_PER_LINE = 15;
export const ONE_ICON = 48;
const CELL_SIZE = 300;
const CELL_PADDING = 44;
const CARD_SIZE = 256;
export const SCALE = ONE_ICON / (CELL_SIZE - CELL_PADDING);

const THEME_BACKGROUNDS: Record<Theme, string> = {
  dark: "#242938",
  light: "#F4F2ED",
};

function normalizeHex(color: string): string {
  const hex = color.replace(/^#/, "");
  if (!/^[0-9a-fA-F]{3,8}$/.test(hex)) {
    throw new Error(`Invalid color: ${color}`);
  }
  return `#${hex}`;
}

function extractSvgInner(svg: string): string {
  const match = svg.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
  return match ? match[1].trim() : svg;
}

function applyIconColor(inner: string, iconColor?: string): string {
  if (!iconColor) return inner;
  const fill = normalizeHex(iconColor);
  return inner.replace(/<path\b([^>]*?)>/gi, (_tag, attrs: string) => {
    const withoutFill = attrs.replace(/\sfill="[^"]*"/gi, "");
    return `<path${withoutFill} fill="${fill}">`;
  });
}

function applyDefaultIconFill(inner: string, hex: string): string {
  const fill = normalizeHex(hex);
  return inner.replace(/<path\b([^>]*?)>/gi, (tag, attrs: string) => {
    if (/\sfill="/i.test(attrs)) return tag;
    return `<path${attrs} fill="${fill}">`;
  });
}

function readIconSvg(slug: string): string {
  return readFileSync(getIconSvgPath(slug), "utf8");
}

export function renderIconCard(
  slug: string,
  options: RenderOptions = {},
): string {
  const icon = getIconBySlug(slug);
  if (!icon) {
    throw new Error(`Unknown icon: ${slug}`);
  }

  const theme = options.theme ?? "dark";
  const svg = readIconSvg(slug);
  let inner = extractSvgInner(svg);
  inner = options.iconColor
    ? applyIconColor(inner, options.iconColor)
    : applyDefaultIconFill(inner, icon.hex);

  if (options.viewbox === "auto") {
    return `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  }

  const background = options.color
    ? normalizeHex(options.color)
    : THEME_BACKGROUNDS[theme];

  const iconScale = (CARD_SIZE - 64) / 24;
  const iconOffset = (CARD_SIZE - 24 * iconScale) / 2;

  return `<svg width="${CARD_SIZE}" height="${CARD_SIZE}" viewBox="0 0 ${CARD_SIZE} ${CARD_SIZE}" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="${CARD_SIZE}" height="${CARD_SIZE}" rx="60" fill="${background}"/>
<g transform="translate(${iconOffset}, ${iconOffset}) scale(${iconScale})">
${inner}
</g>
</svg>`;
}

export function renderIconCardInner(
  slug: string,
  options: RenderOptions = {},
): string {
  const full = renderIconCard(slug, options);
  return extractSvgInner(full);
}

export function generateCombinedSvg(
  slugs: string[],
  perLine: number,
  options: RenderOptions = {},
): string {
  const iconSvgList = slugs.map((slug) => renderIconCardInner(slug, options));

  const length =
    Math.min(perLine * CELL_SIZE, slugs.length * CELL_SIZE) - CELL_PADDING;
  const height =
    Math.ceil(iconSvgList.length / perLine) * CELL_SIZE - CELL_PADDING;
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

export function renderSvgsMap(
  slugs: string[],
  options: RenderOptions = {},
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const slug of slugs) {
    result[slug] = renderIconCard(slug, options);
  }
  return result;
}
