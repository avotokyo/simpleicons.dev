/** 图标许可证信息，type 为 custom 时表示非标准许可类型 */
export type License = { type: string; url: string } | { type: "custom"; url: string };

/** 卡片背景主题：dark 深色 / light 浅色 */
export type Theme = "dark" | "light";

/**
 * 图标元数据记录，来源于 simple-icons/icons.json。
 * 不含 SVG path，SVG 通过 registry.getIconSvg 单独获取。
 */
export type IconRecord = {
  slug: string;
  title: string;
  hex: string;
  source: string;
  guidelines?: string;
  license?: License;
};

/**
 * SVG 渲染选项，适用于所有返回 SVG 的端点。
 * viewbox=auto 时输出原始 24×24 SVG，不含圆角卡片背景。
 */
export type RenderOptions = {
  theme?: Theme;
  color?: string;
  iconColor?: string;
  viewbox?: "auto";
};
