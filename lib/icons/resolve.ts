import "server-only";
import { getAllSlugs, resolveSlug } from "./registry";
import { ICONS_PER_LINE } from "./render";
import type { RenderOptions, Theme } from "./types";

/** `/icons` 端点解析后的请求参数 */
export type IconsRequestParams = {
  slugs: string[];
  perLine: number;
  renderOptions: RenderOptions;
};

/** 参数校验失败时的错误结构。 使用联合类型而非 throw，便于路由层统一处理 400 响应。 */
export type ResolveError = {
  status: number;
  message: string;
};

/** 解析 theme 查询参数。 合法值：dark | light；未传则返回 undefined（由调用方决定默认值）。 */
function parseTheme(value: string | null): Theme | undefined | ResolveError {
  if (!value) return undefined;
  if (value === "dark" || value === "light") return value;
  return {
    status: 400,
    message: 'Theme must be either "light" or "dark"',
  };
}

/** 解析 perline 查询参数。 合法范围：1–50，未传则使用 ICONS_PER_LINE 默认值。 */
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

/** 解析 icons 查询参数为名称列表。 支持逗号分隔的 slug 列表，或特殊值 "all" 返回全部 slug。 */
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

/** 将用户输入的名称列表解析为官方 slug 列表。 任一名称无法解析时立即返回 400 错误。 */
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

/** 解析 SVG 渲染相关的通用查询参数。 适用于所有返回 SVG 的端点（theme、color、iconColor、viewbox）。 */
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

/** 解析 `/icons` 端点的完整请求参数。 组合 icons/perline 与通用渲染参数。 */
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
