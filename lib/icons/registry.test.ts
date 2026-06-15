import { describe, expect, it } from "vitest";

import { getAllSlugs, getIconBySlug, resolveSlug, searchIcons } from "./registry";

describe("registry", () => {
  describe("resolveSlug", () => {
    it("resolves exact slug", () => {
      expect(resolveSlug("javascript")).toBe("javascript");
    });

    it("resolves case-insensitive slug", () => {
      expect(resolveSlug("JavaScript")).toBe("javascript");
    });

    it("resolves title alias", () => {
      const node = getIconBySlug("nodedotjs");
      expect(node).toBeDefined();
      expect(resolveSlug(node!.title)).toBe("nodedotjs");
    });

    it("returns undefined for unknown slug", () => {
      expect(resolveSlug("not-a-real-icon-xyz")).toBeUndefined();
    });

    it("returns undefined for empty string", () => {
      expect(resolveSlug("")).toBeUndefined();
      expect(resolveSlug("   ")).toBeUndefined();
    });
  });

  describe("getIconBySlug", () => {
    it("returns metadata for known slug", () => {
      const icon = getIconBySlug("react");
      expect(icon).toBeDefined();
      expect(icon!.slug).toBe("react");
      expect(icon!.title).toBeTruthy();
      expect(icon!.hex).toMatch(/^[0-9A-Fa-f]+$/);
    });

    it("returns undefined for unknown slug", () => {
      expect(getIconBySlug("not-a-real-icon-xyz")).toBeUndefined();
    });
  });

  describe("getAllSlugs", () => {
    it("returns a non-empty sorted list", () => {
      const slugs = getAllSlugs();
      expect(slugs.length).toBeGreaterThan(100);
      expect(slugs).toContain("javascript");
      expect(slugs).toContain("react");
      const sorted = [...slugs].sort();
      expect(slugs).toEqual(sorted);
    });
  });

  describe("searchIcons", () => {
    it("finds icons by slug substring", () => {
      const results = searchIcons("react");
      expect(results.length).toBeGreaterThan(0);
      expect(results.some((i) => i.slug === "react")).toBe(true);
    });

    it("finds icons by title substring", () => {
      const results = searchIcons("node");
      expect(results.length).toBeGreaterThan(0);
      expect(results.some((i) => i.slug === "nodedotjs")).toBe(true);
    });

    it("returns empty array for empty query", () => {
      expect(searchIcons("")).toEqual([]);
      expect(searchIcons("   ")).toEqual([]);
    });

    it("respects limit", () => {
      const results = searchIcons("a", 3);
      expect(results.length).toBeLessThanOrEqual(3);
    });
  });
});
