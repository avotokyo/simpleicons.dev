import "server-only";
import { getIconBySlug, getIconSvg } from "./registry";
import type { RenderOptions, Theme } from "./types";

/** 多图标拼接时默认每行图标数量 */
export const ICONS_PER_LINE = 15;

/** 拼接输出中单个图标的显示尺寸（px） */
const ONE_ICON = 48;
/** 拼接网格中每个单元格的尺寸 */
const CELL_SIZE = 300;
/** 单元格内边距，用于计算有效绘制区域 */
const CELL_PADDING = 44;
/** 单图标卡片尺寸（圆角矩形背景） */
const CARD_SIZE = 256;
/** 从单元格坐标系到输出 SVG 坐标系的缩放比 */
const SCALE = ONE_ICON / (CELL_SIZE - CELL_PADDING);

/** 各主题的默认卡片背景色 */
const THEME_BACKGROUNDS: Record<Theme, string> = {
  dark: "#242938",
  light: "#F4F2ED",
};

/** 规范化 hex 颜色值，确保以 # 开头。 支持 3–8 位 hex，无效格式抛出 Error。 勿用 simple-icons/sdk 的 normalizeColor：后者无校验、去 #、转大写，语义不同。 */
function normalizeHex(color: string): string {
  const hex = color.replace(/^#/, "");
  if (!/^[0-9a-fA-F]{3,8}$/.test(hex)) {
    throw new Error(`Invalid color: ${color}`);
  }
  return `#${hex}`;
}

/** 从完整 SVG 字符串中提取 <svg> 标签内的内容 */
function extractSvgInner(svg: string): string {
  const match = svg.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
  return match ? match[1].trim() : svg;
}

/** 为 path 元素设置 fill 属性。 force=false 时保留已有 fill；force=true 时强制覆盖。 */
function applyPathFill(inner: string, fill: string, force = false): string {
  return inner.replace(/<path\b([^>]*)\/>/gi, (_tag, attrs: string) => {
    if (!force && /\sfill="/i.test(attrs)) {
      return `<path${attrs}/>`;
    }
    const withoutFill = attrs.replace(/\sfill="[^"]*"/gi, "");
    return `<path${withoutFill} fill="${fill}"/>`;
  });
}

/** 应用用户指定的 iconColor，强制覆盖 path 的 fill */
function applyIconColor(inner: string, iconColor?: string): string {
  if (!iconColor) return inner;
  return applyPathFill(inner, normalizeHex(iconColor), true);
}

/** 为无 fill 的 path 应用品牌默认色（来自 icons.json 的 hex 字段） */
function applyDefaultIconFill(inner: string, hex: string): string {
  return applyPathFill(inner, normalizeHex(hex));
}

/** 渲染单个图标的 SVG 卡片。 viewbox=auto 时返回原始 24×24 SVG；否则返回带圆角背景的 256×256 卡片。 */
export function renderIconCard(slug: string, options: RenderOptions = {}): string {
  const icon = getIconBySlug(slug);
  if (!icon) {
    throw new Error(`Unknown icon: ${slug}`);
  }

  const theme = options.theme ?? "dark";
  const svg = getIconSvg(slug);
  if (!svg) {
    throw new Error(`Missing SVG for icon: ${slug}`);
  }
  let inner = extractSvgInner(svg);
  inner = options.iconColor
    ? applyIconColor(inner, options.iconColor)
    : applyDefaultIconFill(inner, icon.hex);

  if (options.viewbox === "auto") {
    return `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  }

  const background = options.color ? normalizeHex(options.color) : THEME_BACKGROUNDS[theme];

  const iconScale = (CARD_SIZE - 64) / 24;
  const iconOffset = (CARD_SIZE - 24 * iconScale) / 2;

  return `<svg width="${CARD_SIZE}" height="${CARD_SIZE}" viewBox="0 0 ${CARD_SIZE} ${CARD_SIZE}" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="${CARD_SIZE}" height="${CARD_SIZE}" rx="60" fill="${background}"/>
<g transform="translate(${iconOffset}, ${iconOffset}) scale(${iconScale})">
${inner}
</g>
</svg>`;
}

/** 渲染图标卡片并仅返回内部 path 内容。 用于多图标拼接，避免嵌套完整 <svg> 标签。 */
export function renderIconCardInner(slug: string, options: RenderOptions = {}): string {
  const full = renderIconCard(slug, options);
  return extractSvgInner(full);
}

/** 将多个图标拼接为一张 SVG。 按 perLine 分列排列，整体缩放至 ONE_ICON 高度的行。 */
export function generateCombinedSvg(
  slugs: string[],
  perLine: number,
  options: RenderOptions = {},
): string {
  const iconSvgList = slugs.map((slug) => renderIconCardInner(slug, options));

  const length = Math.min(perLine * CELL_SIZE, slugs.length * CELL_SIZE) - CELL_PADDING;
  const height = Math.ceil(iconSvgList.length / perLine) * CELL_SIZE - CELL_PADDING;
  const scaledHeight = height * SCALE;
  const scaledWidth = length * SCALE;

  const iconsMarkup = iconSvgList
    .map(
      (icon, index) => `
        <g transform="translate(${(index % perLine) * CELL_SIZE}, ${Math.floor(index / perLine) * CELL_SIZE})">
          ${icon}
        </g>`,
    )
    .join(" ");

  return `<svg width="${scaledWidth}" height="${scaledHeight}" viewBox="0 0 ${length} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">${iconsMarkup}
  </svg>`;
}
