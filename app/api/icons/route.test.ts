import { describe, expect, it } from "vite-plus/test";

import { GET } from "./route";

describe("GET /api/icons", () => {
  it("returns slug array by default", async () => {
    const req = new Request("http://localhost/api/icons");
    const res = await GET(req);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("application/json;charset=UTF-8");
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body).toContain("javascript");
    expect(body).toContain("react");
  });

  it("returns full metadata with format=full", async () => {
    const req = new Request("http://localhost/api/icons?format=full");
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    const js = body.find((i: { slug: string }) => i.slug === "javascript");
    expect(js).toBeDefined();
    expect(js.title).toBeTruthy();
    expect(js.hex).toBeTruthy();
  });
});
