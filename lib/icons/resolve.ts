import "server-only";
import { z } from "zod";

import { getAllSlugs, resolveSlug } from "./registry";
import { ICONS_PER_LINE } from "./render";
import type { RenderOptions } from "./types";

/** `/icons` 端点解析后的请求参数 */
export type IconsRequestParams = {
  slugs: string[];
  perLine: number;
  renderOptions: RenderOptions;
};

/** 参数校验失败时的错误结构。 */
export type ResolveError = {
  status: number;
  message: string;
};

const THEME_ERROR = 'Theme must be either "light" or "dark"';
const PER_LINE_ERROR = "Icons per line must be a number between 1 and 50";
const MISSING_ICONS_ERROR = "Missing icons parameter";

const themeSchema = z.enum(["dark", "light"], { message: THEME_ERROR });

const renderOptionsSchema = z.object({
  theme: themeSchema.optional().default("dark"),
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

function toResolveError(error: z.ZodError): ResolveError {
  return { status: 400, message: error.issues[0]?.message ?? "Invalid request" };
}

function optionalParam(searchParams: URLSearchParams, key: string): string | undefined {
  return searchParams.get(key) ?? undefined;
}

function parseIconSlugList(iconParam: string): string[] | ResolveError {
  if (iconParam === "all") {
    return getAllSlugs();
  }

  const names = iconParam
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);

  if (names.length === 0) {
    return { status: 400, message: MISSING_ICONS_ERROR };
  }

  const slugs: string[] = [];
  for (const name of names) {
    const result = officialSlugSchema.safeParse(name);
    if (!result.success) {
      return toResolveError(result.error);
    }
    slugs.push(result.data);
  }

  return slugs;
}

/** 判断值是否为 ResolveError，用于类型收窄 */
export function isResolveError(value: unknown): value is ResolveError {
  return typeof value === "object" && value !== null && "status" in value && "message" in value;
}

/** 解析 SVG 渲染相关的通用查询参数。 */
export function parseRenderOptions(searchParams: URLSearchParams): RenderOptions | ResolveError {
  const result = renderOptionsSchema.safeParse({
    theme: optionalParam(searchParams, "theme"),
    color: optionalParam(searchParams, "color"),
    iconColor: optionalParam(searchParams, "iconColor"),
    viewbox: optionalParam(searchParams, "viewbox"),
  });

  if (!result.success) {
    return toResolveError(result.error);
  }

  return result.data;
}

/** 解析 `/icons` 端点的完整请求参数。 */
export function parseIconsRequest(
  searchParams: URLSearchParams,
): IconsRequestParams | ResolveError {
  const iconsResult = iconsParamSchema.safeParse(searchParams.get("icons"));
  if (!iconsResult.success) {
    return toResolveError(iconsResult.error);
  }

  const renderOptions = parseRenderOptions(searchParams);
  if (isResolveError(renderOptions)) {
    return renderOptions;
  }

  const perLineResult = perLineSchema.safeParse(optionalParam(searchParams, "perline"));
  if (!perLineResult.success) {
    return toResolveError(perLineResult.error);
  }

  const slugsResult = parseIconSlugList(iconsResult.data);
  if (isResolveError(slugsResult)) {
    return slugsResult;
  }

  return {
    slugs: slugsResult,
    perLine: perLineResult.data,
    renderOptions,
  };
}
