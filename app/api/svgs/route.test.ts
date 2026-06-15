import { describe, expect, it } from "vitest";

import { GET } from "./route";

describe("GET /api/svgs", () => {
  it("returns json map for slugs", async () => {
    const req = new Request("http://localhost/api/svgs?slugs=javascript,react");
    const res = await GET(req);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("application/json;charset=UTF-8");
    const body = await res.json();
    expect(body.javascript).toContain("<svg");
    expect(body.react).toContain("<svg");
  });

  it("returns 400 when slugs and all are missing", async () => {
    const req = new Request("http://localhost/api/svgs");
    const res = await GET(req);
    expect(res.status).toBe(400);
    expect(await res.text()).toContain("Specify");
  });

  it("returns 400 for unknown slug", async () => {
    const req = new Request("http://localhost/api/svgs?slugs=not-a-real-icon-xyz");
    const res = await GET(req);
    expect(res.status).toBe(400);
    expect(await res.text()).toContain("Unknown icon");
  });
});
