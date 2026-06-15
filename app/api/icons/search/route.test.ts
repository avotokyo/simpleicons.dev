import { describe, expect, it } from "vite-plus/test";

import { GET } from "./route";

describe("GET /api/icons/search", () => {
  it("returns empty array for empty query", async () => {
    const req = new Request("http://localhost/api/icons/search");
    const res = await GET(req);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual([]);
  });

  it("returns matching icons", async () => {
    const req = new Request("http://localhost/api/icons/search?q=react");
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.length).toBeGreaterThan(0);
    expect(body.some((i: { slug: string }) => i.slug === "react")).toBe(true);
  });
});
