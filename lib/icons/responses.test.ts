import { describe, expect, it } from "vite-plus/test";

import { errorResponse, renderErrorResponse, svgResponse } from "./responses";

describe("responses", () => {
  it("svgResponse sets image/svg+xml content-type and cache headers", async () => {
    const res = svgResponse("<svg></svg>");
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("image/svg+xml");
    expect(res.headers.get("Cache-Control")).toBe("public, max-age=86400, s-maxage=604800");
    expect(await res.text()).toBe("<svg></svg>");
  });

  it("errorResponse uses status and message", async () => {
    const res = errorResponse({ status: 400, message: "Bad request" });
    expect(res.status).toBe(400);
    expect(await res.text()).toBe("Bad request");
  });

  it("renderErrorResponse uses Error message", async () => {
    const res = renderErrorResponse(new Error("Render failed"));
    expect(res.status).toBe(500);
    expect(await res.text()).toBe("Render failed");
  });

  it("renderErrorResponse uses generic message for non-Error", async () => {
    const res = renderErrorResponse("oops");
    expect(res.status).toBe(500);
    expect(await res.text()).toBe("Internal error");
  });
});
