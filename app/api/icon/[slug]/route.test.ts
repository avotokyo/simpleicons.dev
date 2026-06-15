import { describe, expect, it } from "vite-plus/test";

import { GET } from "./route";

describe("GET /api/icon/[slug]", () => {
  it("returns 200 svg for known slug", async () => {
    const req = new Request("http://localhost/api/icon/javascript");
    const res = await GET(req, { params: Promise.resolve({ slug: "javascript" }) });
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("image/svg+xml");
    expect(await res.text()).toContain("<svg");
  });

  it("resolves slug aliases", async () => {
    const req = new Request("http://localhost/api/icon/JavaScript");
    const res = await GET(req, { params: Promise.resolve({ slug: "JavaScript" }) });
    expect(res.status).toBe(200);
  });

  it("returns 400 for unknown slug", async () => {
    const req = new Request("http://localhost/api/icon/not-a-real-icon-xyz");
    const res = await GET(req, { params: Promise.resolve({ slug: "not-a-real-icon-xyz" }) });
    expect(res.status).toBe(400);
    expect(await res.text()).toContain("Unknown icon");
  });
});
