import { describe, expect, it } from "vite-plus/test";

import { getAllSlugs, getIconBySlug, resolveSlug } from "./registry";

describe("registry", () => {
  describe("resolveSlug", () => {
    it("resolves exact slug", () => {
      expect(resolveSlug("javascript")).toBe("javascript");
    });

    it("resolves case-insensitive slug", () => {
      expect(resolveSlug("JavaScript")).toBe("javascript");
    });

    it("does not resolve brand title as slug", () => {
      const node = getIconBySlug("nodedotjs");
      expect(node).toBeDefined();
      expect(resolveSlug(node!.title)).toBeUndefined();
    });

    it("does not resolve unofficial slug forms", () => {
      expect(resolveSlug(".NET")).toBeUndefined();
      expect(resolveSlug("C++")).toBeUndefined();
      expect(resolveSlug("Alpine.js")).toBeUndefined();
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
});
