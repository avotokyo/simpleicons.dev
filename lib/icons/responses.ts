import "server-only";
import type { ResolveError } from "./resolve";

/** JSON 响应的 Content-Type，所有 JSON 端点统一使用 */
const JSON_CONTENT_TYPE = "application/json;charset=UTF-8";

/** 返回 JSON 响应，统一设置 charset 头。 */
export function jsonResponse(data: unknown): Response {
  return Response.json(data, {
    headers: { "content-type": JSON_CONTENT_TYPE },
  });
}

/** 返回 SVG 图片响应。 */
export function svgResponse(svg: string): Response {
  return new Response(svg, {
    headers: { "Content-Type": "image/svg+xml" },
  });
}

/** 将参数校验错误（ResolveError）转为 HTTP 响应。 */
export function errorResponse(error: ResolveError): Response {
  return new Response(error.message, { status: error.status });
}

/** 将渲染阶段的异常转为 500 响应。 若 error 为 Error 实例则使用其 message，否则返回通用错误信息。 */
export function renderErrorResponse(error: unknown): Response {
  const message = error instanceof Error ? error.message : "Internal error";
  return new Response(message, { status: 500 });
}
