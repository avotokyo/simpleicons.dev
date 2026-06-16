import { expect, test } from "@playwright/test";

test.describe("Icons E2E smoke", () => {
  test("GET /icons returns cached svg+xml", async ({ request }) => {
    const res = await request.get("/icons?icons=javascript,react");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("image/svg+xml");
    expect(res.headers()["cache-control"]).toContain("public");
    const body = await res.text();
    expect(body).toContain("<svg");
  });
});
