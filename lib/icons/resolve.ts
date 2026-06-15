import "server-only";

import { ICONS_PER_LINE } from "./render";
import { getAllSlugs, resolveSlug } from "./registry";
import type { RenderOptions, Theme } from "./types";

export type IconsRequestParams = {
  slugs: string[];
  perLine: number;
  renderOptions: RenderOptions;
};

export type ResolveError = {
  status: number;
  message: string;
};

function parseTheme(
  value: string | null,
): Theme | undefined | ResolveError {
  if (!value) return undefined;
  if (value === "dark" || value === "light") return value;
  return {
    status: 400,
    message: 'Theme must be either "light" or "dark"',
  };
}

function parsePerLine(value: string | null): number | ResolveError {
  const perLine = value ? Number.parseInt(value, 10) : ICONS_PER_LINE;
  if (Number.isNaN(perLine) || perLine < 1 || perLine > 50) {
    return {
      status: 400,
      message: "Icons per line must be a number between 1 and 50",
    };
  }
  return perLine;
}

function parseIconNames(
  iconParam: string | null,
): string[] | ResolveError {
  if (!iconParam) {
    return { status: 400, message: "Missing icons parameter" };
  }

  if (iconParam === "all") {
    return getAllSlugs();
  }

  const names = iconParam.split(",").map((n) => n.trim()).filter(Boolean);
  if (names.length === 0) {
    return { status: 400, message: "Missing icons parameter" };
  }

  return names;
}

function resolveIconSlugs(names: string[]): string[] | ResolveError {
  const slugs: string[] = [];

  for (const name of names) {
    const slug = resolveSlug(name);
    if (!slug) {
      return { status: 400, message: `Unknown icon: ${name}` };
    }
    slugs.push(slug);
  }

  return slugs;
}

export function isResolveError(
  value: unknown,
): value is ResolveError {
  return (
    typeof value === "object" &&
    value !== null &&
    "status" in value &&
    "message" in value
  );
}

export function parseIconsRequest(
  searchParams: URLSearchParams,
): IconsRequestParams | ResolveError {
  const iconParam = searchParams.get("icons");

  const iconNames = parseIconNames(iconParam);
  if (isResolveError(iconNames)) return iconNames;

  const themeResult = parseTheme(searchParams.get("theme"));
  if (isResolveError(themeResult)) return themeResult;

  const perLineResult = parsePerLine(searchParams.get("perline"));
  if (isResolveError(perLineResult)) return perLineResult;

  const slugsResult =
    iconParam === "all"
      ? iconNames
      : resolveIconSlugs(iconNames as string[]);
  if (isResolveError(slugsResult)) return slugsResult;

  const color = searchParams.get("color") ?? undefined;
  const iconColor = searchParams.get("iconColor") ?? undefined;
  const viewboxParam = searchParams.get("viewbox");
  const viewbox =
    viewboxParam === "auto" ? ("auto" as const) : undefined;

  const theme: Theme = themeResult ?? "dark";

  return {
    slugs: slugsResult,
    perLine: perLineResult,
    renderOptions: {
      theme,
      color: color ?? undefined,
      iconColor: iconColor ?? undefined,
      viewbox,
    },
  };
}

export function parseRenderOptions(
  searchParams: URLSearchParams,
): RenderOptions | ResolveError {
  const themeResult = parseTheme(searchParams.get("theme"));
  if (isResolveError(themeResult)) return themeResult;

  const color = searchParams.get("color") ?? undefined;
  const iconColor = searchParams.get("iconColor") ?? undefined;
  const viewboxParam = searchParams.get("viewbox");
  const viewbox =
    viewboxParam === "auto" ? ("auto" as const) : undefined;

  return {
    theme: themeResult ?? "dark",
    color: color ?? undefined,
    iconColor: iconColor ?? undefined,
    viewbox,
  };
}

export function resolveSlugParam(
  slug: string,
): string | ResolveError {
  const resolved = resolveSlug(slug);
  if (!resolved) {
    return { status: 400, message: `Unknown icon: ${slug}` };
  }
  return resolved;
}
