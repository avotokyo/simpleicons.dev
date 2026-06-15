import { describe, expect, it } from "vitest";

import {
  errorResponse,
  jsonResponse,
  renderErrorResponse,
  svgResponse,
} from "./responses";

describe("responses", () => {
  it("jsonResponse sets content-type and body", async () => {
    const res = jsonResponse({ foo: "bar" });
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("application/json;charset=UTF-8");
    expect(await res.json()).toEqual({ foo: "bar" });
  });

  it("svgResponse sets image/svg+xml content-type", async () => {
    const res = svgResponse("<svg></svg>");
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("image/svg+xml");
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
