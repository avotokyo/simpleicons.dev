import { describe, expect, it } from "vite-plus/test";

import { MAX_ICONS } from "./constants";
import { getAllSlugs } from "./registry";
import { isParseError, parseIconsRequest, parseRenderOptions } from "./resolve";

function params(input: Record<string, string>): URLSearchParams {
  return new URLSearchParams(input);
}

describe("resolve", () => {
  describe("isParseError", () => {
    it("returns true for failed parse results", () => {
      expect(isParseError({ ok: false, error: { status: 400, message: "bad" } })).toBe(true);
    });

    it("returns false for successful results", () => {
      expect(isParseError({ ok: true, data: { theme: "dark" } })).toBe(false);
    });
  });

  describe("parseRenderOptions", () => {
    it("returns default dark theme", () => {
      const result = parseRenderOptions(params({}));
      expect(isParseError(result)).toBe(false);
      if (!isParseError(result)) {
        expect(result.data.theme).toBe("dark");
      }
    });

    it("accepts light theme", () => {
      const result = parseRenderOptions(params({ theme: "light" }));
      expect(isParseError(result)).toBe(false);
      if (!isParseError(result)) {
        expect(result.data.theme).toBe("light");
      }
    });

    it("rejects invalid theme", () => {
      const result = parseRenderOptions(params({ theme: "blue" }));
      expect(isParseError(result)).toBe(true);
      if (isParseError(result)) {
        expect(result.error.status).toBe(400);
      }
    });

    it("parses color and iconColor", () => {
      const result = parseRenderOptions(
        params({ color: "F7DF1E", iconColor: "FF0000", viewbox: "auto" }),
      );
      expect(isParseError(result)).toBe(false);
      if (!isParseError(result)) {
        expect(result.data.color).toBe("F7DF1E");
        expect(result.data.iconColor).toBe("FF0000");
        expect(result.data.viewbox).toBe("auto");
      }
    });
  });

  describe("parseIconsRequest", () => {
    it("returns 400 when icons is missing", () => {
      const result = parseIconsRequest(params({}));
      expect(isParseError(result)).toBe(true);
      if (isParseError(result)) {
        expect(result.error.message).toContain("Missing icons");
      }
    });

    it("parses comma-separated icons", () => {
      const result = parseIconsRequest(params({ icons: "javascript,react" }));
      expect(isParseError(result)).toBe(false);
      if (!isParseError(result)) {
        expect(result.data.slugs).toEqual(["javascript", "react"]);
      }
    });

    it("trims and lowercases slug matching", () => {
      const result = parseIconsRequest(params({ icons: " JavaScript , REACT " }));
      expect(isParseError(result)).toBe(false);
      if (!isParseError(result)) {
        expect(result.data.slugs).toEqual(["javascript", "react"]);
      }
    });

    it("rejects icons=all as unknown slug", () => {
      const result = parseIconsRequest(params({ icons: "all" }));
      expect(isParseError(result)).toBe(true);
      if (isParseError(result)) {
        expect(result.error.message).toContain("Unknown icon");
      }
    });

    it("rejects too many explicit icons", () => {
      const slugs = getAllSlugs()
        .slice(0, MAX_ICONS + 1)
        .join(",");
      const result = parseIconsRequest(params({ icons: slugs }));
      expect(isParseError(result)).toBe(true);
      if (isParseError(result)) {
        expect(result.error.message).toContain(String(MAX_ICONS));
      }
    });

    it("rejects invalid perline", () => {
      const result = parseIconsRequest(params({ icons: "javascript", perline: "99" }));
      expect(isParseError(result)).toBe(true);
    });

    it("rejects unknown icon", () => {
      const result = parseIconsRequest(params({ icons: "not-a-real-icon-xyz" }));
      expect(isParseError(result)).toBe(true);
      if (isParseError(result)) {
        expect(result.error.message).toContain("Unknown icon");
      }
    });
  });
});
