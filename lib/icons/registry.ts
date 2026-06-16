import "server-only";
import * as simpleIcons from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import iconsData from "simple-icons/icons.json";
import type { IconData } from "simple-icons/icons.json";
import { slugToVariableName } from "simple-icons/sdk";

import type { IconRecord } from "./types";

/** 内存注册表：官方 slug → 元数据，及排序后的 slug 列表。 */
type Registry = {
  bySlug: Map<string, IconRecord>;
  allSlugs: string[];
};

/** 懒加载单例，首次请求时构建 */
let registry: Registry | null = null;

/** 从 icons.json 构建内存注册表。 */
function buildRegistry(): Registry {
  const raw = iconsData as IconData[];
  const bySlug = new Map<string, IconRecord>();

  for (const icon of raw) {
    bySlug.set(icon.slug, {
      title: icon.title,
      slug: icon.slug,
      hex: icon.hex,
      source: icon.source,
      guidelines: icon.guidelines,
      license: icon.license as IconRecord["license"],
    });
  }

  const allSlugs = [...bySlug.keys()].sort();

  return { bySlug, allSlugs };
}

/** 获取注册表单例，懒加载构建 */
function getRegistry(): Registry {
  if (!registry) {
    registry = buildRegistry();
  }
  return registry;
}

/** 类型守卫：判断 simple-icons 包导出对象是否为有效 SimpleIcon */
function isSimpleIcon(value: unknown): value is SimpleIcon {
  return (
    typeof value === "object" &&
    value !== null &&
    "svg" in value &&
    typeof (value as SimpleIcon).svg === "string"
  );
}

/** 根据 slug 获取 SVG path 字符串。 通过 slugToVariableName 将 slug 转为 simple-icons 包的导出名（如 siJavascript）。 */
export function getIconSvg(slug: string): string | undefined {
  const key = slugToVariableName(slug) as keyof typeof simpleIcons;
  const icon = simpleIcons[key];
  return isSimpleIcon(icon) ? icon.svg : undefined;
}

/** 返回全部官方 slug 列表（已排序） */
export function getAllSlugs(): string[] {
  return getRegistry().allSlugs;
}

/** 根据官方 slug 获取元数据，不存在时返回 undefined */
export function getIconBySlug(slug: string): IconRecord | undefined {
  return getRegistry().bySlug.get(slug);
}

/** 校验输入是否为 simple-icons 官方 slug（大小写不敏感）。 */
export function resolveSlug(name: string): string | undefined {
  const key = name.trim().toLowerCase();
  if (!key) return undefined;

  const { bySlug } = getRegistry();
  return bySlug.has(key) ? key : undefined;
}
