import "server-only";
import * as simpleIcons from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import iconsData from "simple-icons/icons.json";
import type { IconData } from "simple-icons/icons.json";
import { slugToVariableName } from "simple-icons/sdk";

import type { IconRecord } from "./types";

/** In-memory registry: official slug → metadata, plus a sorted slug list. */
type Registry = {
  bySlug: Map<string, IconRecord>;
  allSlugs: string[];
};

/** Lazy singleton, built on first access. */
let registry: Registry | null = null;

/** Build the registry from simple-icons/icons.json (SVG strings come from package exports). */
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

function getRegistry(): Registry {
  if (!registry) {
    registry = buildRegistry();
  }
  return registry;
}

/** Type guard for simple-icons package exports. */
function isSimpleIcon(value: unknown): value is SimpleIcon {
  return (
    typeof value === "object" &&
    value !== null &&
    "svg" in value &&
    typeof (value as SimpleIcon).svg === "string"
  );
}

/** Return SVG markup for an official slug via simple-icons (e.g. siJavascript). */
export function getIconSvg(slug: string): string | undefined {
  const key = slugToVariableName(slug) as keyof typeof simpleIcons;
  const icon = simpleIcons[key];
  return isSimpleIcon(icon) ? icon.svg : undefined;
}

/** Return all official slugs (sorted). */
export function getAllSlugs(): string[] {
  return getRegistry().allSlugs;
}

/** Return metadata for an official slug, or undefined if unknown. Slug must be lowercase. */
export function getIconBySlug(slug: string): IconRecord | undefined {
  return getRegistry().bySlug.get(slug);
}

/** Match input against an official simple-icons slug (case-insensitive). */
export function resolveSlug(name: string): string | undefined {
  const key = name.trim().toLowerCase();
  if (!key) return undefined;

  const { bySlug } = getRegistry();
  return bySlug.has(key) ? key : undefined;
}
