import "server-only";

import * as simpleIcons from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import iconsData from "simple-icons/icons.json";
import { slugToVariableName } from "simple-icons/sdk";

import type { IconRecord } from "./types";

/** icons.json 中单条图标的原始数据结构 */
type IconData = {
  title: string;
  slug: string;
  hex: string;
  source: string;
  guidelines?: string;
  license?: IconRecord["license"];
  aliases?: {
    aka?: string[];
    old?: string[];
    loc?: Record<string, string>;
  };
};

/**
 * 内存注册表结构。
 * bySlug: 官方 slug → 元数据
 * aliasToSlug: 别名（含规范化后的）→ 官方 slug
 * allSlugs: 排序后的全部 slug 列表
 */
type Registry = {
  bySlug: Map<string, IconRecord>;
  aliasToSlug: Map<string, string>;
  allSlugs: string[];
};

/** 懒加载单例，首次请求时构建 */
let registry: Registry | null = null;

/**
 * 将用户输入的别名规范化为查找键。
 * 规则：转小写并移除非字母数字字符（如 "Node.js" → "nodedotjs"）。
 */
function normalizeAlias(alias: string): string {
  return alias.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * 从 icons.json 构建内存注册表。
 * 索引 slug、title、old/aka/loc 别名，支持多种方式查找图标。
 */
function buildRegistry(): Registry {
  const raw = iconsData as IconData[];
  const bySlug = new Map<string, IconRecord>();
  const aliasToSlug = new Map<string, string>();

  for (const icon of raw) {
    const record: IconRecord = {
      title: icon.title,
      slug: icon.slug,
      hex: icon.hex,
      source: icon.source,
      guidelines: icon.guidelines,
      license: icon.license,
    };
    bySlug.set(icon.slug, record);
    aliasToSlug.set(icon.slug, icon.slug);
    aliasToSlug.set(normalizeAlias(icon.slug), icon.slug);
    aliasToSlug.set(normalizeAlias(icon.title), icon.slug);

    if (icon.aliases?.old) {
      for (const oldSlug of icon.aliases.old) {
        aliasToSlug.set(oldSlug, icon.slug);
        aliasToSlug.set(normalizeAlias(oldSlug), icon.slug);
      }
    }

    if (icon.aliases?.aka) {
      for (const aka of icon.aliases.aka) {
        aliasToSlug.set(normalizeAlias(aka), icon.slug);
      }
    }

    if (icon.aliases?.loc) {
      for (const localized of Object.values(icon.aliases.loc)) {
        aliasToSlug.set(normalizeAlias(localized), icon.slug);
      }
    }
  }

  const allSlugs = [...bySlug.keys()].sort();

  return { bySlug, aliasToSlug, allSlugs };
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

/**
 * 根据 slug 获取 SVG path 字符串。
 * 通过 slugToVariableName 将 slug 转为 simple-icons 包的导出名（如 siJavascript）。
 */
export function getIconSvg(slug: string): string | undefined {
  const key = slugToVariableName(slug) as keyof typeof simpleIcons;
  const icon = simpleIcons[key];
  return isSimpleIcon(icon) ? icon.svg : undefined;
}

/** 返回全部官方 slug 列表（已排序） */
export function getAllSlugs(): string[] {
  return getRegistry().allSlugs;
}

/** 返回全部图标元数据，顺序与 getAllSlugs 一致 */
export function getAllIcons(): IconRecord[] {
  const { bySlug, allSlugs } = getRegistry();
  return allSlugs.map((slug) => bySlug.get(slug)!);
}

/** 根据官方 slug 获取元数据，不存在时返回 undefined */
export function getIconBySlug(slug: string): IconRecord | undefined {
  return getRegistry().bySlug.get(slug);
}

/**
 * 将用户输入解析为官方 slug。
 * 依次尝试：精确 slug → 别名表 → 规范化别名。
 */
export function resolveSlug(name: string): string | undefined {
  const key = name.trim().toLowerCase();
  if (!key) return undefined;

  const { aliasToSlug, bySlug } = getRegistry();

  if (bySlug.has(key)) return key;

  const fromAlias = aliasToSlug.get(key);
  if (fromAlias && bySlug.has(fromAlias)) return fromAlias;

  const normalized = normalizeAlias(key);
  const fromNormalized = aliasToSlug.get(normalized);
  if (fromNormalized && bySlug.has(fromNormalized)) return fromNormalized;

  return undefined;
}

/**
 * 按 slug 或 title 模糊搜索图标。
 * 线性扫描，结果达到 limit 时提前终止。
 */
export function searchIcons(query: string, limit = 50): IconRecord[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: IconRecord[] = [];
  for (const icon of getAllIcons()) {
    if (icon.slug.includes(q) || icon.title.toLowerCase().includes(q)) {
      results.push(icon);
      if (results.length >= limit) break;
    }
  }
  return results;
}
