import { describe, expect, it } from "vite-plus/test";

import {
  isResolveError,
  parseIconsRequest,
  parseRenderOptions,
  parseSearchRequest,
  parseSvgsRequest,
  resolveSlugParam,
} from "./resolve";

function params(input: Record<string, string>): URLSearchParams {
  return new URLSearchParams(input);
}

describe("resolve", () => {
  describe("isResolveError", () => {
    it("returns true for ResolveError objects", () => {
      expect(isResolveError({ status: 400, message: "bad" })).toBe(true);
    });

    it("returns false for non-errors", () => {
      expect(isResolveError({ slugs: [] })).toBe(false);
      expect(isResolveError(null)).toBe(false);
    });
  });

  describe("parseRenderOptions", () => {
    it("returns default dark theme", () => {
      const result = parseRenderOptions(params({}));
      expect(isResolveError(result)).toBe(false);
      if (!isResolveError(result)) {
        expect(result.theme).toBe("dark");
      }
    });

    it("accepts light theme", () => {
      const result = parseRenderOptions(params({ theme: "light" }));
      expect(isResolveError(result)).toBe(false);
      if (!isResolveError(result)) {
        expect(result.theme).toBe("light");
      }
    });

    it("rejects invalid theme", () => {
      const result = parseRenderOptions(params({ theme: "blue" }));
      expect(isResolveError(result)).toBe(true);
      if (isResolveError(result)) {
        expect(result.status).toBe(400);
      }
    });

    it("parses color and iconColor", () => {
      const result = parseRenderOptions(
        params({ color: "F7DF1E", iconColor: "FF0000", viewbox: "auto" }),
      );
      expect(isResolveError(result)).toBe(false);
      if (!isResolveError(result)) {
        expect(result.color).toBe("F7DF1E");
        expect(result.iconColor).toBe("FF0000");
        expect(result.viewbox).toBe("auto");
      }
    });
  });

  describe("parseIconsRequest", () => {
    it("returns 400 when icons is missing", () => {
      const result = parseIconsRequest(params({}));
      expect(isResolveError(result)).toBe(true);
      if (isResolveError(result)) {
        expect(result.message).toContain("Missing icons");
      }
    });

    it("parses comma-separated icons", () => {
      const result = parseIconsRequest(params({ icons: "javascript,react" }));
      expect(isResolveError(result)).toBe(false);
      if (!isResolveError(result)) {
        expect(result.slugs).toEqual(["javascript", "react"]);
      }
    });

    it("supports icons=all", () => {
      const result = parseIconsRequest(params({ icons: "all" }));
      expect(isResolveError(result)).toBe(false);
      if (!isResolveError(result)) {
        expect(result.slugs.length).toBeGreaterThan(100);
      }
    });

    it("rejects invalid perline", () => {
      const result = parseIconsRequest(params({ icons: "javascript", perline: "99" }));
      expect(isResolveError(result)).toBe(true);
    });

    it("rejects unknown icon", () => {
      const result = parseIconsRequest(params({ icons: "not-a-real-icon-xyz" }));
      expect(isResolveError(result)).toBe(true);
      if (isResolveError(result)) {
        expect(result.message).toContain("Unknown icon");
      }
    });
  });

  describe("parseSvgsRequest", () => {
    it("returns 400 when neither slugs nor all is provided", () => {
      const result = parseSvgsRequest(params({}));
      expect(isResolveError(result)).toBe(true);
    });

    it("parses slugs parameter", () => {
      const result = parseSvgsRequest(params({ slugs: "javascript,react" }));
      expect(isResolveError(result)).toBe(false);
      if (!isResolveError(result)) {
        expect(result.slugs).toEqual(["javascript", "react"]);
      }
    });

    it("supports all=1", () => {
      const result = parseSvgsRequest(params({ all: "1" }));
      expect(isResolveError(result)).toBe(false);
      if (!isResolveError(result)) {
        expect(result.slugs.length).toBeGreaterThan(100);
      }
    });

    it("rejects unknown slug in slugs list", () => {
      const result = parseSvgsRequest(params({ slugs: "not-a-real-icon-xyz" }));
      expect(isResolveError(result)).toBe(true);
    });
  });

  describe("parseSearchRequest", () => {
    it("defaults limit to 50", () => {
      const result = parseSearchRequest(params({ q: "react" }));
      expect(result.limit).toBe(50);
      expect(result.query).toBe("react");
    });

    it("caps limit at 100", () => {
      const result = parseSearchRequest(params({ q: "react", limit: "200" }));
      expect(result.limit).toBe(100);
    });

    it("falls back to 50 for invalid limit", () => {
      expect(parseSearchRequest(params({ q: "react", limit: "0" })).limit).toBe(50);
      expect(parseSearchRequest(params({ q: "react", limit: "-5" })).limit).toBe(50);
      expect(parseSearchRequest(params({ q: "react", limit: "abc" })).limit).toBe(50);
    });
  });

  describe("resolveSlugParam", () => {
    it("resolves known slug", () => {
      const result = resolveSlugParam("javascript");
      expect(isResolveError(result)).toBe(false);
      if (!isResolveError(result)) {
        expect(result).toBe("javascript");
      }
    });

    it("returns 400 for unknown slug", () => {
      const result = resolveSlugParam("not-a-real-icon-xyz");
      expect(isResolveError(result)).toBe(true);
      if (isResolveError(result)) {
        expect(result.status).toBe(400);
      }
    });
  });
});
