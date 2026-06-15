import { expect, test } from "@playwright/test";

test.describe("API E2E", () => {
  test("GET /icons returns svg+xml", async ({ request }) => {
    const res = await request.get("/icons?icons=javascript,react");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("image/svg+xml");
    const body = await res.text();
    expect(body).toContain("<svg");
  });

  test("GET /icons returns 400 for missing icons", async ({ request }) => {
    const res = await request.get("/icons");
    expect(res.status()).toBe(400);
  });

  test("GET /api/icon/{slug} returns svg+xml", async ({ request }) => {
    const res = await request.get("/api/icon/javascript");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("image/svg+xml");
  });

  test("GET /api/icon/{slug} returns 400 for unknown slug", async ({ request }) => {
    const res = await request.get("/api/icon/not-a-real-icon-xyz");
    expect(res.status()).toBe(400);
  });

  test("GET /api/icons returns slug array", async ({ request }) => {
    const res = await request.get("/api/icons");
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toContain("javascript");
  });

  test("GET /api/icons?format=full returns metadata", async ({ request }) => {
    const res = await request.get("/api/icons?format=full");
    expect(res.status()).toBe(200);
    const body = await res.json();
    const js = body.find((i: { slug: string }) => i.slug === "javascript");
    expect(js).toBeDefined();
    expect(js.title).toBeTruthy();
  });

  test("GET /api/icons/search returns results", async ({ request }) => {
    const res = await request.get("/api/icons/search?q=react");
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.some((i: { slug: string }) => i.slug === "react")).toBe(true);
  });

  test("GET /api/icons/search returns empty for empty q", async ({ request }) => {
    const res = await request.get("/api/icons/search");
    expect(res.status()).toBe(200);
    expect(await res.json()).toEqual([]);
  });

  test("GET /api/svgs returns json map", async ({ request }) => {
    const res = await request.get("/api/svgs?slugs=javascript,react");
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.javascript).toContain("<svg");
    expect(body.react).toContain("<svg");
  });

  test("GET /api/svgs returns 400 without slugs or all", async ({ request }) => {
    const res = await request.get("/api/svgs");
    expect(res.status()).toBe(400);
  });
});
