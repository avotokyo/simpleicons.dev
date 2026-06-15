import "server-only";

import * as simpleIcons from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import iconsData from "simple-icons/icons.json";
import { slugToVariableName } from "simple-icons/sdk";

import type { IconRecord } from "./types";

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

type Registry = {
  bySlug: Map<string, IconRecord>;
  aliasToSlug: Map<string, string>;
  allSlugs: string[];
};

let registry: Registry | null = null;

function normalizeAlias(alias: string): string {
  return alias.toLowerCase().replace(/[^a-z0-9]/g, "");
}

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

function getRegistry(): Registry {
  if (!registry) {
    registry = buildRegistry();
  }
  return registry;
}

function isSimpleIcon(value: unknown): value is SimpleIcon {
  return (
    typeof value === "object" &&
    value !== null &&
    "svg" in value &&
    typeof (value as SimpleIcon).svg === "string"
  );
}

export function getIconSvg(slug: string): string | undefined {
  const key = slugToVariableName(slug) as keyof typeof simpleIcons;
  const icon = simpleIcons[key];
  return isSimpleIcon(icon) ? icon.svg : undefined;
}

export function getAllSlugs(): string[] {
  return getRegistry().allSlugs;
}

export function getAllIcons(): IconRecord[] {
  const { bySlug, allSlugs } = getRegistry();
  return allSlugs.map((slug) => bySlug.get(slug)!);
}

export function getIconBySlug(slug: string): IconRecord | undefined {
  return getRegistry().bySlug.get(slug);
}

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
