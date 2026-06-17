import { describe, expect, it } from "vite-plus/test";

import { GET } from "./route";

describe("GET /icons", () => {
  it("returns 200 svg for valid icons", async () => {
    const req = new Request("http://localhost/icons?icons=javascript,react");
    const res = await GET(req);
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("image/svg+xml");
    expect(res.headers.get("Cache-Control")).toContain("public");
    const body = await res.text();
    expect(body).toContain("<svg");
  });

  it("returns 400 when icons is missing", async () => {
    const req = new Request("http://localhost/icons");
    const res = await GET(req);
    expect(res.status).toBe(400);
    expect(await res.text()).toContain("Missing icons");
  });

  it("returns 400 for unknown icon", async () => {
    const req = new Request("http://localhost/icons?icons=not-a-real-icon-xyz");
    const res = await GET(req);
    expect(res.status).toBe(400);
    expect(await res.text()).toContain("Unknown icon");
  });

  it("returns 200 with 24x24 svg for single icon and viewbox=auto", async () => {
    const req = new Request("http://localhost/icons?icons=javascript&viewbox=auto");
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body).toContain('viewBox="0 0 24 24"');
    expect(body).not.toContain("<rect");
  });
});
