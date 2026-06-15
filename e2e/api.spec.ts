import { expect, test } from "@playwright/test";

test.describe("Icons E2E", () => {
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
});
