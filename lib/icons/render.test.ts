import { describe, expect, it } from "vitest";

import {
  generateCombinedSvg,
  renderIconCard,
  renderSvgsMap,
} from "./render";

describe("render", () => {
  describe("renderIconCard", () => {
    it("renders dark theme card with rect background", () => {
      const svg = renderIconCard("javascript");
      expect(svg).toContain("<rect");
      expect(svg).toContain('fill="#242938"');
      expect(svg).toContain("<path");
    });

    it("renders light theme card", () => {
      const svg = renderIconCard("javascript", { theme: "light" });
      expect(svg).toContain('fill="#F4F2ED"');
    });

    it("renders auto viewbox as 24x24 svg", () => {
      const svg = renderIconCard("javascript", { viewbox: "auto" });
      expect(svg).toContain('viewBox="0 0 24 24"');
      expect(svg).not.toContain("<rect");
    });

    it("applies custom background color", () => {
      const svg = renderIconCard("javascript", { color: "F7DF1E" });
      expect(svg).toContain('fill="#F7DF1E"');
    });

    it("applies custom icon color", () => {
      const svg = renderIconCard("javascript", { iconColor: "FF0000" });
      expect(svg).toContain('fill="#FF0000"');
    });

    it("throws for unknown slug", () => {
      expect(() => renderIconCard("not-a-real-icon-xyz")).toThrow("Unknown icon");
    });

    it("throws for invalid hex color", () => {
      expect(() => renderIconCard("javascript", { color: "not-a-color" })).toThrow(
        "Invalid color",
      );
    });
  });

  describe("generateCombinedSvg", () => {
    it("combines multiple icons with g transforms", () => {
      const svg = generateCombinedSvg(["javascript", "react"], 2);
      expect(svg).toContain("<svg");
      expect(svg.match(/<g transform=/g)?.length).toBe(2);
    });

    it("respects perLine layout", () => {
      const svg = generateCombinedSvg(["javascript", "react", "css"], 1);
      expect(svg).toContain('translate(0, 0)');
      expect(svg).toContain('translate(0, 300)');
      expect(svg).toContain('translate(0, 600)');
    });
  });

  describe("renderSvgsMap", () => {
    it("returns slug keys mapped to svg strings", () => {
      const map = renderSvgsMap(["javascript", "react"]);
      expect(Object.keys(map)).toEqual(["javascript", "react"]);
      expect(map.javascript).toContain("<svg");
      expect(map.react).toContain("<svg");
    });
  });
});
