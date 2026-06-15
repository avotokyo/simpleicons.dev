import "server-only";

import { ICONS_PER_LINE } from "./render";
import { getAllSlugs, resolveSlug } from "./registry";
import type { RenderOptions, Theme } from "./types";

/** `/icons` 端点解析后的请求参数 */
export type IconsRequestParams = {
  slugs: string[];
  perLine: number;
  renderOptions: RenderOptions;
};

/** 批量 SVG 端点解析后的请求参数 */
export type SvgsRequestParams = {
  slugs: string[];
  renderOptions: RenderOptions;
};

/** 搜索端点解析后的请求参数 */
export type SearchRequestParams = {
  query: string;
  limit: number;
};

/**
 * 参数校验失败时的错误结构。
 * 使用联合类型而非 throw，便于路由层统一处理 400 响应。
 */
export type ResolveError = {
  status: number;
  message: string;
};

/** 搜索默认返回数量上限 */
const DEFAULT_SEARCH_LIMIT = 50;
/** 搜索最大返回数量 */
const MAX_SEARCH_LIMIT = 100;

/**
 * 解析 theme 查询参数。
 * 合法值：dark | light；未传则返回 undefined（由调用方决定默认值）。
 */
function parseTheme(value: string | null): Theme | undefined | ResolveError {
  if (!value) return undefined;
  if (value === "dark" || value === "light") return value;
  return {
    status: 400,
    message: 'Theme must be either "light" or "dark"',
  };
}

/**
 * 解析 perline 查询参数。
 * 合法范围：1–50，未传则使用 ICONS_PER_LINE 默认值。
 */
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

/**
 * 解析 icons 查询参数为名称列表。
 * 支持逗号分隔的 slug 列表，或特殊值 "all" 返回全部 slug。
 */
function parseIconNames(iconParam: string | null): string[] | ResolveError {
  if (!iconParam) {
    return { status: 400, message: "Missing icons parameter" };
  }

  if (iconParam === "all") {
    return getAllSlugs();
  }

  const names = iconParam
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean);
  if (names.length === 0) {
    return { status: 400, message: "Missing icons parameter" };
  }

  return names;
}

/**
 * 将用户输入的名称列表解析为官方 slug 列表。
 * 任一名称无法解析时立即返回 400 错误。
 */
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

/** 判断值是否为 ResolveError，用于类型收窄 */
export function isResolveError(value: unknown): value is ResolveError {
  return typeof value === "object" && value !== null && "status" in value && "message" in value;
}

/**
 * 解析 SVG 渲染相关的通用查询参数。
 * 适用于所有返回 SVG 的端点（theme、color、iconColor、viewbox）。
 */
export function parseRenderOptions(searchParams: URLSearchParams): RenderOptions | ResolveError {
  const themeResult = parseTheme(searchParams.get("theme"));
  if (isResolveError(themeResult)) return themeResult;

  const color = searchParams.get("color") ?? undefined;
  const iconColor = searchParams.get("iconColor") ?? undefined;
  const viewboxParam = searchParams.get("viewbox");
  const viewbox = viewboxParam === "auto" ? ("auto" as const) : undefined;

  return {
    theme: themeResult ?? "dark",
    color: color ?? undefined,
    iconColor: iconColor ?? undefined,
    viewbox,
  };
}

/**
 * 解析 `/icons` 端点的完整请求参数。
 * 组合 icons/perline 与通用渲染参数。
 */
export function parseIconsRequest(
  searchParams: URLSearchParams,
): IconsRequestParams | ResolveError {
  const iconParam = searchParams.get("icons");

  const iconNames = parseIconNames(iconParam);
  if (isResolveError(iconNames)) return iconNames;

  const renderOptions = parseRenderOptions(searchParams);
  if (isResolveError(renderOptions)) return renderOptions;

  const perLineResult = parsePerLine(searchParams.get("perline"));
  if (isResolveError(perLineResult)) return perLineResult;

  const slugsResult = iconParam === "all" ? iconNames : resolveIconSlugs(iconNames as string[]);
  if (isResolveError(slugsResult)) return slugsResult;

  return {
    slugs: slugsResult,
    perLine: perLineResult,
    renderOptions,
  };
}

/**
 * 解析 `/api/svgs` 端点的请求参数。
 * 支持 ?slugs=a,b,c 或 ?all=1 获取全部图标。
 */
export function parseSvgsRequest(searchParams: URLSearchParams): SvgsRequestParams | ResolveError {
  const renderOptions = parseRenderOptions(searchParams);
  if (isResolveError(renderOptions)) return renderOptions;

  const all = searchParams.get("all");
  const slugsParam = searchParams.get("slugs");

  if (all === "1") {
    return { slugs: getAllSlugs(), renderOptions };
  }

  if (slugsParam) {
    const names = slugsParam
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean);
    const slugsResult = resolveIconSlugs(names);
    if (isResolveError(slugsResult)) return slugsResult;
    return { slugs: slugsResult, renderOptions };
  }

  return {
    status: 400,
    message: "Specify ?slugs=javascript,react or ?all=1",
  };
}

/**
 * 解析 `/api/icons/search` 端点的请求参数。
 * limit 默认 50，最大 100；无效值回退到默认值。
 */
export function parseSearchRequest(
  searchParams: URLSearchParams,
): SearchRequestParams | ResolveError {
  const query = searchParams.get("q") ?? "";
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Number.parseInt(limitParam, 10) : DEFAULT_SEARCH_LIMIT;
  const safeLimit =
    Number.isNaN(limit) || limit < 1 ? DEFAULT_SEARCH_LIMIT : Math.min(limit, MAX_SEARCH_LIMIT);

  return { query, limit: safeLimit };
}

/**
 * 解析动态路由中的 slug 参数。
 * 支持别名解析，未知 slug 返回 400。
 */
export function resolveSlugParam(slug: string): string | ResolveError {
  const resolved = resolveSlug(slug);
  if (!resolved) {
    return { status: 400, message: `Unknown icon: ${slug}` };
  }
  return resolved;
}
