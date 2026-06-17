import "server-only";
import { z } from "zod";

import { DEFAULT_THEME, ICONS_PER_LINE, MAX_ICONS, TOO_MANY_ICONS_ERROR } from "./constants";
import { resolveSlug } from "./registry";
import type { RenderOptions } from "./types";

/** Parsed query parameters for GET /icons. */
export type IconsRequestParams = {
  slugs: string[];
  perLine: number;
  renderOptions: RenderOptions;
};

/** Validation failure returned instead of throwing. */
export type ResolveError = {
  status: number;
  message: string;
};

/** Discriminated union for parse results. */
export type ParseResult<T> = { ok: true; data: T } | { ok: false; error: ResolveError };

const THEME_ERROR = 'Theme must be either "light" or "dark"';
const PER_LINE_ERROR = "Icons per line must be a number between 1 and 50";
const MISSING_ICONS_ERROR = "Missing icons parameter";

const themeSchema = z.enum(["dark", "light"], { message: THEME_ERROR });

const renderOptionsSchema = z.object({
  theme: themeSchema.optional().default(DEFAULT_THEME),
  color: z.string().optional(),
  iconColor: z.string().optional(),
  viewbox: z.preprocess(
    (value) => (value === "auto" ? "auto" : undefined),
    z.literal("auto").optional(),
  ),
});

const perLineSchema = z.union([z.string(), z.undefined()]).transform((value, ctx) => {
  const perLine = value === undefined ? ICONS_PER_LINE : Number.parseInt(value, 10);
  if (Number.isNaN(perLine) || perLine < 1 || perLine > 50) {
    ctx.addIssue({ code: "custom", message: PER_LINE_ERROR });
    return z.NEVER;
  }
  return perLine;
});

const iconsParamSchema = z.string({ message: MISSING_ICONS_ERROR }).min(1, MISSING_ICONS_ERROR);

const officialSlugSchema = z.string().transform((name, ctx) => {
  const slug = resolveSlug(name);
  if (!slug) {
    ctx.addIssue({ code: "custom", message: `Unknown icon: ${name}` });
    return z.NEVER;
  }
  return slug;
});

/** Map the first Zod issue to a 400 ResolveError. */
function toResolveError(error: z.ZodError): ResolveError {
  return { status: 400, message: error.issues[0]?.message ?? "Invalid request" };
}

/** Read an optional query parameter, normalizing null to undefined. */
function optionalParam(searchParams: URLSearchParams, key: string): string | undefined {
  return searchParams.get(key) ?? undefined;
}

/** Parse comma-separated slugs, enforcing MAX_ICONS. */
function parseIconSlugList(iconParam: string): ParseResult<string[]> {
  const slugs = parseSlugNames(iconParam);
  if (isParseError(slugs)) {
    return slugs;
  }

  if (slugs.data.length > MAX_ICONS) {
    return { ok: false, error: { status: 400, message: TOO_MANY_ICONS_ERROR } };
  }

  return slugs;
}

/** Split, trim, and validate a comma-separated slug list. */
function parseSlugNames(iconParam: string): ParseResult<string[]> {
  const names = iconParam
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);

  if (names.length === 0) {
    return { ok: false, error: { status: 400, message: MISSING_ICONS_ERROR } };
  }

  const result = z.array(officialSlugSchema).safeParse(names);
  if (!result.success) {
    return { ok: false, error: toResolveError(result.error) };
  }

  return { ok: true, data: result.data };
}

/** Type guard for failed parse results. */
export function isParseError<T>(
  result: ParseResult<T>,
): result is { ok: false; error: ResolveError } {
  return !result.ok;
}

/** Parse shared SVG render query parameters. */
export function parseRenderOptions(searchParams: URLSearchParams): ParseResult<RenderOptions> {
  const result = renderOptionsSchema.safeParse({
    theme: optionalParam(searchParams, "theme"),
    color: optionalParam(searchParams, "color"),
    iconColor: optionalParam(searchParams, "iconColor"),
    viewbox: optionalParam(searchParams, "viewbox"),
  });

  if (!result.success) {
    return { ok: false, error: toResolveError(result.error) };
  }

  return { ok: true, data: result.data };
}

/** Parse and validate GET /icons query parameters. */
export function parseIconsRequest(searchParams: URLSearchParams): ParseResult<IconsRequestParams> {
  const iconsResult = iconsParamSchema.safeParse(searchParams.get("icons"));
  if (!iconsResult.success) {
    return { ok: false, error: toResolveError(iconsResult.error) };
  }

  const renderOptions = parseRenderOptions(searchParams);
  if (isParseError(renderOptions)) {
    return renderOptions;
  }

  const perLineResult = perLineSchema.safeParse(optionalParam(searchParams, "perline"));
  if (!perLineResult.success) {
    return { ok: false, error: toResolveError(perLineResult.error) };
  }

  const slugsResult = parseIconSlugList(iconsResult.data);
  if (isParseError(slugsResult)) {
    return slugsResult;
  }

  return {
    ok: true,
    data: {
      slugs: slugsResult.data,
      perLine: perLineResult.data,
      renderOptions: renderOptions.data,
    },
  };
}
